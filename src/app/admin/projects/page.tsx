"use client";

import Header from "@/app/[locale]/components/Header";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LanguageCode = "es" | "cat" | "en";
type ProjectType = "web" | "javafx" | "mobile" | "ai" | "other";

type Skill = {
  id: number;
  name: string;
};

type ProjectContent = {
  name: string;
  shortDescription: string;
  longDescription: string;
  chatbotSummary: string;
};

type Project = {
  id: number;
  slug: string;
  projectType: ProjectType;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  repositoryUrl: string;
  demoUrl: string;
  imageUrl: string;
  sortOrder: number;
  isActive: boolean;
  skillIds: number[];
  content: Record<LanguageCode, ProjectContent>;
};

const languages: {
  code: LanguageCode;
  label: string;
}[] = [
  { code: "es", label: "Español" },
  { code: "cat", label: "Català" },
  { code: "en", label: "English" },
];

const projectTypes: {
  value: ProjectType;
  label: string;
}[] = [
  { value: "web", label: "Web" },
  { value: "javafx", label: "JavaFX" },
  { value: "mobile", label: "Mobile" },
  { value: "ai", label: "IA" },
  { value: "other", label: "Otro" },
];

const emptyContent: ProjectContent = {
  name: "",
  shortDescription: "",
  longDescription: "",
  chatbotSummary: "",
};

const emptyProject: Project = {
  id: 0,
  slug: "",
  projectType: "web",
  startDate: "",
  endDate: "",
  isCurrent: false,
  repositoryUrl: "",
  demoUrl: "",
  imageUrl: "",
  sortOrder: 0,
  isActive: true,
  skillIds: [],
  content: {
    es: { ...emptyContent },
    cat: { ...emptyContent },
    en: { ...emptyContent },
  },
};

function getProjectTypeLabel(type: ProjectType) {
  return projectTypes.find((projectType) => projectType.value === type)?.label ?? type;
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project>(emptyProject);
  const [selectedLanguage, setSelectedLanguage] = useState<LanguageCode>("es");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectedLanguageLabel = useMemo(() => {
    return languages.find((language) => language.code === selectedLanguage)?.label;
  }, [selectedLanguage]);

  const loadProjects = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/projects", {
        cache: "no-store",
      });

      if (!response.ok) {
        alert("No se han podido cargar los proyectos.");
        return;
      }

      const data: Project[] = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      alert("No se han podido cargar los proyectos.");
    } finally {
      setLoading(false);
    }
  };

  const loadSkills = async () => {
    try {
      const response = await fetch("/api/admin/skills", {
        cache: "no-store",
      });

      if (!response.ok) return;

      const data = await response.json();

      setSkills(
        data.map((skill: { id: number; name: string }) => ({
          id: skill.id,
          name: skill.name,
        }))
      );
    } catch (error) {
      console.error("Error fetching skills:", error);
    }
  };

  useEffect(() => {
    loadProjects();
    loadSkills();
  }, []);

  const resetForm = () => {
    setSelectedProject(emptyProject);
    setSelectedLanguage("es");
    setEditingId(null);
  };

  const handleEdit = (project: Project) => {
    setSelectedProject(project);
    setSelectedLanguage("es");
    setEditingId(project.id);
  };

  const handleBaseChange = (
    field: keyof Omit<Project, "content" | "skillIds">,
    value: string | number | boolean
  ) => {
    setSelectedProject((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (
    field: keyof ProjectContent,
    value: string
  ) => {
    setSelectedProject((prev) => ({
      ...prev,
      content: {
        ...prev.content,
        [selectedLanguage]: {
          ...prev.content[selectedLanguage],
          [field]: value,
        },
      },
    }));
  };

  const handleSkillToggle = (skillId: number) => {
    setSelectedProject((prev) => {
      const alreadySelected = prev.skillIds.includes(skillId);

      return {
        ...prev,
        skillIds: alreadySelected
          ? prev.skillIds.filter((id) => id !== skillId)
          : [...prev.skillIds, skillId],
      };
    });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este proyecto?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("No se ha podido eliminar el proyecto.");
        return;
      }

      setProjects((prev) => prev.filter((project) => project.id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("No se ha podido eliminar el proyecto.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProject.content.es.name.trim()) {
      alert("El nombre del proyecto en español es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `/api/admin/projects/${editingId}` : "/api/admin/projects",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedProject),
        }
      );

      if (!response.ok) {
        alert("No se ha podido guardar el proyecto.");
        return;
      }

      await loadProjects();
      resetForm();
    } catch (error) {
      console.error("Error saving project:", error);
      alert("No se ha podido guardar el proyecto.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen min-w-full max-w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-yellow-500">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-7xl">
          <section className="flex flex-col gap-6 bg-white rounded-lg p-8 text-black w-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-sm font-bold uppercase tracking-widest text-yellow-800">
                  Panel de administración
                </p>

                <h1 className="text-4xl font-bold">Proyectos</h1>

                <p className="text-lg text-gray-700 max-w-3xl">
                  Añade, edita o elimina proyectos. Puedes modificar el contenido
                  en español, catalán e inglés y asociar skills.
                </p>
              </div>

              <Link
                href="/admin"
                className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors text-center"
              >
                Volver al panel
              </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_460px] gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-2xl font-bold">Listado de proyectos</h2>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors"
                  >
                    Añadir nuevo
                  </button>
                </div>

                {loading ? (
                  <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                    Cargando proyectos...
                  </div>
                ) : projects.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                    Todavía no hay proyectos creados.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-yellow-800 text-white text-left">
                          <th className="p-4">Nombre</th>
                          <th className="p-4">Tipo</th>
                          <th className="p-4">Fechas</th>
                          <th className="p-4">Estado</th>
                          <th className="p-4">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {projects
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((project) => {
                            const isSelected = editingId === project.id;

                            return (
                              <tr
                                key={project.id}
                                onClick={() => handleEdit(project)}
                                className={`border-b border-gray-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-yellow-100"
                                    : "hover:bg-yellow-50"
                                }`}
                              >
                                <td className="p-4 font-bold">
                                  {project.content.es.name || "Sin nombre"}
                                </td>

                                <td className="p-4">
                                  {getProjectTypeLabel(project.projectType)}
                                </td>

                                <td className="p-4">
                                  {project.startDate || "Sin fecha"} -{" "}
                                  {project.isCurrent
                                    ? "Actualidad"
                                    : project.endDate || "Sin fecha"}
                                </td>

                                <td className="p-4">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                      project.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {project.isActive ? "Activo" : "Oculto"}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleEdit(project);
                                      }}
                                      className="bg-yellow-800 text-white rounded-lg px-4 py-2 font-bold hover:bg-yellow-900 transition-colors"
                                    >
                                      Editar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(project.id);
                                      }}
                                      className="bg-red-600 text-white rounded-lg px-4 py-2 font-bold hover:bg-red-700 transition-colors"
                                    >
                                      Eliminar
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <aside className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar proyecto" : "Añadir proyecto"}
                    </h2>

                    <p className="text-gray-700">
                      Los datos generales son comunes. El contenido cambia por idioma.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="projectType" className="font-bold">
                      Tipo
                    </label>

                    <select
                      id="projectType"
                      value={selectedProject.projectType}
                      onChange={(event) =>
                        handleBaseChange(
                          "projectType",
                          event.target.value as ProjectType
                        )
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                    >
                      {projectTypes.map((projectType) => (
                        <option key={projectType.value} value={projectType.value}>
                          {projectType.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="startDate" className="font-bold">
                        Fecha inicio
                      </label>

                      <input
                        id="startDate"
                        type="date"
                        value={selectedProject.startDate}
                        onChange={(event) =>
                          handleBaseChange("startDate", event.target.value)
                        }
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="endDate" className="font-bold">
                        Fecha fin
                      </label>

                      <input
                        id="endDate"
                        type="date"
                        value={selectedProject.endDate}
                        onChange={(event) =>
                          handleBaseChange("endDate", event.target.value)
                        }
                        disabled={selectedProject.isCurrent}
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white disabled:bg-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedProject.isCurrent}
                        onChange={(event) =>
                          handleBaseChange("isCurrent", event.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      Actualidad
                    </label>

                    <label className="flex items-center gap-3 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedProject.isActive}
                        onChange={(event) =>
                          handleBaseChange("isActive", event.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      Visible
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="repositoryUrl" className="font-bold">
                      Repositorio
                    </label>

                    <input
                      id="repositoryUrl"
                      type="url"
                      value={selectedProject.repositoryUrl}
                      onChange={(event) =>
                        handleBaseChange("repositoryUrl", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="https://github.com/..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="demoUrl" className="font-bold">
                      Demo
                    </label>

                    <input
                      id="demoUrl"
                      type="url"
                      value={selectedProject.demoUrl}
                      onChange={(event) =>
                        handleBaseChange("demoUrl", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="https://..."
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="imageUrl" className="font-bold">
                      Imagen
                    </label>

                    <input
                      id="imageUrl"
                      type="text"
                      value={selectedProject.imageUrl}
                      onChange={(event) =>
                        handleBaseChange("imageUrl", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="/projects/castIA.png"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="sortOrder" className="font-bold">
                      Orden
                    </label>

                    <input
                      id="sortOrder"
                      type="number"
                      value={selectedProject.sortOrder}
                      onChange={(event) =>
                        handleBaseChange("sortOrder", Number(event.target.value))
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="1"
                    />
                  </div>

                  <div className="border-t-2 border-yellow-800 pt-5 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="language" className="font-bold">
                        Idioma que estás editando
                      </label>

                      <select
                        id="language"
                        value={selectedLanguage}
                        onChange={(event) =>
                          setSelectedLanguage(event.target.value as LanguageCode)
                        }
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      >
                        {languages.map((language) => (
                          <option key={language.code} value={language.code}>
                            {language.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="bg-white border-2 border-yellow-800 rounded-lg p-4 flex flex-col gap-4">
                      <h3 className="text-xl font-bold">
                        Contenido en {selectedLanguageLabel}
                      </h3>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-bold">
                          Nombre
                        </label>

                        <input
                          id="name"
                          type="text"
                          value={selectedProject.content[selectedLanguage].name}
                          onChange={(event) =>
                            handleContentChange("name", event.target.value)
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                          placeholder="Ej: castIA"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="shortDescription" className="font-bold">
                          Descripción corta
                        </label>

                        <textarea
                          id="shortDescription"
                          value={
                            selectedProject.content[selectedLanguage]
                              .shortDescription
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "shortDescription",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white min-h-24"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="longDescription" className="font-bold">
                          Descripción larga
                        </label>

                        <textarea
                          id="longDescription"
                          value={
                            selectedProject.content[selectedLanguage]
                              .longDescription
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "longDescription",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white min-h-28"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="chatbotSummary" className="font-bold">
                          Resumen para chatbot
                        </label>

                        <textarea
                          id="chatbotSummary"
                          value={
                            selectedProject.content[selectedLanguage]
                              .chatbotSummary
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "chatbotSummary",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white min-h-28"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t-2 border-yellow-800 pt-5 flex flex-col gap-3">
                    <h3 className="text-xl font-bold">Skills asociadas</h3>

                    {skills.length === 0 ? (
                      <p className="text-gray-700">No hay skills disponibles.</p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-auto">
                        {skills.map((skill) => (
                          <label
                            key={skill.id}
                            className="flex items-center gap-2 bg-white border border-yellow-800 rounded-lg p-2"
                          >
                            <input
                              type="checkbox"
                              checked={selectedProject.skillIds.includes(skill.id)}
                              onChange={() => handleSkillToggle(skill.id)}
                            />
                            {skill.name}
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={saving}
                      className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors disabled:bg-yellow-300"
                    >
                      {saving
                        ? "Guardando..."
                        : editingId
                        ? "Guardar cambios"
                        : "Crear proyecto"}
                    </button>

                    <button
                      type="button"
                      onClick={resetForm}
                      className="bg-white text-black border-2 border-yellow-800 rounded-lg px-5 py-3 font-bold hover:bg-yellow-100 transition-colors"
                    >
                      Limpiar
                    </button>
                  </div>
                </form>
              </aside>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}