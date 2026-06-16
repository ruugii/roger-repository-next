import { db } from "@/lib/db";
import { hashPassword } from "@/lib/password";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";
import { NextResponse } from "next/server";

type ExistingUserRow = {
  id: number;
};

function getAdminRegistrationToken() {
  return process.env.ADMIN_REGISTRATION_TOKEN?.trim() ?? "";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const adminToken =
      typeof body.adminToken === "string" ? body.adminToken.trim() : "";
    const expectedAdminToken = getAdminRegistrationToken();

    if (!expectedAdminToken) {
      return Response.json(
        { error: "ADMIN_REGISTRATION_TOKEN no está configurado" },
        { status: 500 },
      );
    }

    if (adminToken !== expectedAdminToken) {
      return Response.json(
        { error: "Token de registro admin inválido" },
        { status: 403 },
      );
    }

    if (!name || !email || !password) {
      return Response.json(
        { error: "Nombre, email y contraseña son obligatorios" },
        { status: 400 },
      );
    }

    if (password.length < 8) {
      return Response.json(
        { error: "La contraseña debe tener al menos 8 caracteres" },
        { status: 400 },
      );
    }

    const [existingRows] = await db.query(
      `
      SELECT id
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );
    const existingUsers = existingRows as ExistingUserRow[];

    if (existingUsers.length > 0) {
      return Response.json(
        { error: "Ya existe un usuario con este email" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(password);
    const [result] = await db.query(
      `
      INSERT INTO users (name, email, password_hash, role)
      VALUES (?, ?, ?, 'user')
      `,
      [name, email, passwordHash],
    );
    const userId = (result as { insertId: number }).insertId;
    const token = await createSessionToken({
      userId,
      email,
      role: "user",
    });
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: userId,
          name,
          email,
          role: "user",
        },
      },
      { status: 201 },
    );

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch (error) {
    console.error("Error registering admin:", error);

    return Response.json(
      { error: "Error registrando el administrador" },
      { status: 500 },
    );
  }
}
