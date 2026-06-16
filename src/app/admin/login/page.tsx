"use client";

import Header from "@/app/es/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "No se ha podido iniciar sesión.");
        return;
      }

      const nextPath = new URLSearchParams(window.location.search).get("next");
      const destination =
        nextPath?.startsWith("/admin") && !nextPath.startsWith("//")
          ? nextPath
          : "/admin";

      router.push(destination);
      router.refresh();
    } catch (error) {
      console.error("Error logging in:", error);
      setError("No se ha podido iniciar sesión.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen min-w-full max-w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-yellow-500">
        <main className="flex flex-col gap-8 row-start-2 items-center w-full max-w-xl">
          <section className="flex flex-col gap-6 bg-white rounded-lg p-8 text-black w-full">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-800">
                Panel de administración
              </p>

              <h1 className="text-4xl font-bold">Iniciar sesión</h1>

              <p className="text-lg text-gray-700">
                Accede con un usuario con rol admin para modificar el portfolio.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-bold">
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                  placeholder="admin@example.com"
                  autoComplete="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="font-bold">
                  Contraseña
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                  placeholder="Tu contraseña"
                  autoComplete="current-password"
                  required
                />
              </div>

              {error ? (
                <p className="rounded-lg bg-red-100 p-3 font-bold text-red-800">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors disabled:opacity-60"
              >
                {isSubmitting ? "Entrando..." : "Entrar"}
              </button>
            </form>

            <p className="text-gray-700">
              ¿Necesitas crear el administrador?{" "}
              <Link
                href="/admin/register"
                className="font-bold text-yellow-800 underline"
              >
                Ir al registro
              </Link>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
