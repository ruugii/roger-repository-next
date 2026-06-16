import {
  randomBytes,
  scrypt as scryptCallback,
  timingSafeEqual,
} from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);

const HASH_ALGORITHM = "scrypt";
const KEY_LENGTH = 64;
const SALT_LENGTH = 16;

export async function hashPassword(password: string) {
  const salt = randomBytes(SALT_LENGTH).toString("base64url");
  const derivedKey = (await scrypt(password, salt, KEY_LENGTH)) as Buffer;

  return `${HASH_ALGORITHM}$${salt}$${derivedKey.toString("base64url")}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [algorithm, salt, hash] = passwordHash.split("$");

  if (algorithm !== HASH_ALGORITHM || !salt || !hash) {
    return false;
  }

  const expectedHash = Buffer.from(hash, "base64url");
  const derivedKey = (await scrypt(
    password,
    salt,
    expectedHash.length,
  )) as Buffer;

  if (derivedKey.length !== expectedHash.length) {
    return false;
  }

  return timingSafeEqual(derivedKey, expectedHash);
}
