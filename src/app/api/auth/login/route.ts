import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import {
  createSessionToken,
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
} from "@/lib/session";
import { NextResponse } from "next/server";

type UserRow = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
  role: "admin" | "user";
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const password = typeof body.password === "string" ? body.password : "";

    if (!email || !password) {
      return Response.json(
        { error: "Email y contraseña son obligatorios" },
        { status: 400 },
      );
    }

    const [rows] = await db.query(
      `
      SELECT id, name, email, password_hash, role
      FROM users
      WHERE email = ?
      LIMIT 1
      `,
      [email],
    );
    const [user] = rows as UserRow[];

    if (!user || !(await verifyPassword(password, user.password_hash))) {
      return Response.json(
        { error: "Credenciales inválidas" },
        { status: 401 },
      );
    }

    if (user.role !== "admin") {
      return Response.json(
        { error: "Tu usuario no tiene permisos de administrador" },
        { status: 403 },
      );
    }

    const token = await createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

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
    console.error("Error logging in:", error);

    return Response.json(
      { error: "Error iniciando sesión" },
      { status: 500 },
    );
  }
}
