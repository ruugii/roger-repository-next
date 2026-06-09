import Link from "next/link";
import Header from "../[locale]/components/Header";

const adminSections = [
  {
    title: "Estudios",
    description:
      "Gestiona centros, grados, fechas de inicio y fin, estado actual y contenido por idioma.",
    href: "/admin/studies",
    icon: "🎓",
  },
  {
    title: "Proyectos",
    description:
      "Añade, edita o desactiva proyectos. También podrás modificar nombres, descripciones, tecnologías y enlaces.",
    href: "/admin/projects",
    icon: "💻",
  },
  {
    title: "Skills",
    description:
      "Administra tus tecnologías, herramientas, frameworks y habilidades visibles para el portfolio y el chatbot.",
    href: "/admin/skills",
    icon: "⚙️",
  },
  {
    title: "Experiencia",
    description:
      "Gestiona empresas, trabajos, cargos, fechas, ubicación, modalidad y descripción por idioma.",
    href: "/admin/experience",
    icon: "💼",
  },
];

export default function AdminPage() {
  return (
    <>
      <Header />

      <div className="min-h-screen min-w-full max-w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-yellow-500">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-6xl">
          <section className="flex flex-col gap-6 bg-white rounded-lg p-8 text-black w-full">
            <div className="flex flex-col gap-2">
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-800">
                Panel de administración
              </p>

              <h1 className="text-4xl font-bold">
                ¿Qué quieres modificar?
              </h1>

              <p className="text-lg text-gray-700 max-w-3xl">
                Selecciona una sección para actualizar la información que se
                mostrará en tu portfolio y que después podrá consultar el
                chatbot.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              {adminSections.map((section) => (
                <li key={section.href}>
                  <Link
                    href={section.href}
                    className="group h-full min-h-64 bg-yellow-800 text-white rounded-lg p-6 flex flex-col justify-between gap-6 transition-transform hover:scale-[1.02] hover:bg-yellow-900 shadow-lg"
                  >
                    <div className="flex flex-col gap-4">
                      <span className="text-5xl" aria-hidden="true">
                        {section.icon}
                      </span>

                      <div className="flex flex-col gap-2">
                        <h2 className="text-2xl font-bold">
                          {section.title}
                        </h2>

                        <p className="text-white/90">
                          {section.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/30 pt-4">
                      <span className="font-bold">Modificar</span>

                      <span className="text-2xl transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </main>
      </div>
    </>
  );
}