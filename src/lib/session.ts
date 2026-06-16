export const SESSION_COOKIE_NAME = "admin_session";
export const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

export type SessionRole = "admin" | "user";

export type SessionPayload = {
  userId: number;
  email: string;
  role: SessionRole;
  expiresAt: number;
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getSessionSecret() {
  return process.env.AUTH_SESSION_SECRET?.trim() ?? "";
}

function assertSessionSecret() {
  const secret = getSessionSecret();

  if (secret.length < 32) {
    throw new Error("AUTH_SESSION_SECRET must be at least 32 characters");
  }

  return secret;
}

function encodeBase64Url(value: string | Uint8Array) {
  const bytes = typeof value === "string" ? encoder.encode(value) : value;
  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(value: string) {
  try {
    const base64 = value
      .replace(/-/g, "+")
      .replace(/_/g, "/")
      .padEnd(Math.ceil(value.length / 4) * 4, "=");
    const binary = atob(base64);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));

    return decoder.decode(bytes);
  } catch {
    return null;
  }
}

async function sign(value: string, secret: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    {
      name: "HMAC",
      hash: "SHA-256",
    },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));

  return encodeBase64Url(new Uint8Array(signature));
}

function safeEqual(left: string, right: string) {
  if (left.length !== right.length) {
    return false;
  }

  let result = 0;

  for (let index = 0; index < left.length; index += 1) {
    result |= left.charCodeAt(index) ^ right.charCodeAt(index);
  }

  return result === 0;
}

function isSessionPayload(value: unknown): value is SessionPayload {
  if (!value || typeof value !== "object") {
    return false;
  }

  const session = value as Partial<SessionPayload>;

  return (
    typeof session.userId === "number" &&
    Number.isFinite(session.userId) &&
    typeof session.email === "string" &&
    (session.role === "admin" || session.role === "user") &&
    typeof session.expiresAt === "number" &&
    Number.isFinite(session.expiresAt)
  );
}

export async function createSessionToken(
  payload: Omit<SessionPayload, "expiresAt">,
  maxAgeSeconds = SESSION_MAX_AGE_SECONDS,
) {
  const secret = assertSessionSecret();
  const session: SessionPayload = {
    ...payload,
    expiresAt: Date.now() + maxAgeSeconds * 1000,
  };
  const encodedPayload = encodeBase64Url(JSON.stringify(session));
  const signature = await sign(encodedPayload, secret);

  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  const secret = getSessionSecret();

  if (!token || secret.length < 32) {
    return null;
  }

  const [payload, signature, ...extraParts] = token.split(".");

  if (!payload || !signature || extraParts.length > 0) {
    return null;
  }

  const expectedSignature = await sign(payload, secret);

  if (!safeEqual(signature, expectedSignature)) {
    return null;
  }

  const decodedPayload = decodeBase64Url(payload);

  if (!decodedPayload) {
    return null;
  }

  try {
    const session = JSON.parse(decodedPayload);

    if (!isSessionPayload(session) || session.expiresAt <= Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}
