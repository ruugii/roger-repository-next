"use client";

import Header from "@/app/es/components/Header";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminRegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminToken, setAdminToken] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          adminToken,
        }),
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error ?? "No se ha podido crear el administrador.");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Error registering admin:", error);
      setError("No se ha podido crear el administrador.");
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

              <h1 className="text-4xl font-bold">Registrar admin</h1>

              <p className="text-lg text-gray-700">
                Crea un usuario administrador. La contraseña se guarda hasheada
                con scrypt.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-bold">
                  Nombre
                </label>

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                  placeholder="Administrador"
                  autoComplete="name"
                  required
                />
              </div>

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
                  placeholder="Mínimo 8 caracteres"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="adminToken" className="font-bold">
                  Token de registro admin
                </label>

                <input
                  id="adminToken"
                  type="password"
                  value={adminToken}
                  onChange={(event) => setAdminToken(event.target.value)}
                  className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                  placeholder="ADMIN_REGISTRATION_TOKEN"
                  autoComplete="off"
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
                {isSubmitting ? "Creando..." : "Crear admin"}
              </button>
            </form>

            <p className="text-gray-700">
              ¿Ya tienes usuario?{" "}
              <Link
                href="/admin/login"
                className="font-bold text-yellow-800 underline"
              >
                Ir al login
              </Link>
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
