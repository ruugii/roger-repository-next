"use client";

import Header from "@/app/[locale]/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

type SkillType =
  | "frontend"
  | "backend"
  | "database"
  | "cms"
  | "mobile"
  | "devops"
  | "language"
  | "other";

type SkillLevel = "basic" | "intermediate" | "advanced" | "expert" | "";

type Skill = {
  id: number;
  name: string;
  skillType: SkillType;
  level: SkillLevel;
  sortOrder: number;
  isActive: boolean;
};

const emptySkill: Skill = {
  id: 0,
  name: "",
  skillType: "other",
  level: "",
  sortOrder: 0,
  isActive: true,
};

const skillTypes: {
  value: SkillType;
  label: string;
}[] = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "database", label: "Base de datos" },
  { value: "cms", label: "CMS" },
  { value: "mobile", label: "Mobile" },
  { value: "devops", label: "DevOps" },
  { value: "language", label: "Lenguaje" },
  { value: "other", label: "Otro" },
];

const skillLevels: {
  value: SkillLevel;
  label: string;
}[] = [
  { value: "", label: "Sin nivel" },
  { value: "basic", label: "Básico" },
  { value: "intermediate", label: "Intermedio" },
  { value: "advanced", label: "Avanzado" },
  { value: "expert", label: "Experto" },
];

function getSkillTypeLabel(type: SkillType) {
  return skillTypes.find((skillType) => skillType.value === type)?.label ?? type;
}

function getSkillLevelLabel(level: SkillLevel) {
  return (
    skillLevels.find((skillLevel) => skillLevel.value === level)?.label ??
    "Sin nivel"
  );
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<Skill>(emptySkill);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadSkills = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/skills", {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Error fetching skills:", response.statusText);
        alert("No se han podido cargar las skills.");
        return;
      }

      const data: Skill[] = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Error fetching skills:", error);
      alert("No se han podido cargar las skills.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const handleChange = (
    field: keyof Skill,
    value: string | number | boolean
  ) => {
    setSelectedSkill((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setSelectedSkill(emptySkill);
    setEditingId(null);
  };

  const handleEdit = (skill: Skill) => {
    setSelectedSkill(skill);
    setEditingId(skill.id);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar esta skill?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/skills/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error deleting skill:", response.statusText);
        alert("No se ha podido eliminar la skill.");
        return;
      }

      setSkills((prev) => prev.filter((skill) => skill.id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      alert("No se ha podido eliminar la skill.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedSkill.name.trim()) {
      alert("El nombre de la skill es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `/api/admin/skills/${editingId}` : "/api/admin/skills",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedSkill),
        }
      );

      if (!response.ok) {
        console.error("Error saving skill:", response.statusText);
        alert("No se ha podido guardar la skill.");
        return;
      }

      await loadSkills();
      resetForm();
    } catch (error) {
      console.error("Error saving skill:", error);
      alert("No se ha podido guardar la skill.");
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

                <h1 className="text-4xl font-bold">Skills</h1>

                <p className="text-lg text-gray-700 max-w-3xl">
                  Añade, edita o elimina habilidades. Estas skills podrán usarse
                  en el portfolio, proyectos y chatbot.
                </p>
              </div>

              <Link
                href="/admin"
                className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors text-center"
              >
                Volver al panel
              </Link>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <h2 className="text-2xl font-bold">Listado de skills</h2>

                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors"
                  >
                    Añadir nueva
                  </button>
                </div>

                {loading ? (
                  <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                    Cargando skills...
                  </div>
                ) : skills.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                    Todavía no hay skills creadas.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-yellow-800 text-white text-left">
                          <th className="p-4">Nombre</th>
                          <th className="p-4">Tipo</th>
                          <th className="p-4">Nivel</th>
                          <th className="p-4">Orden</th>
                          <th className="p-4">Estado</th>
                          <th className="p-4">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {skills
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((skill) => {
                            const isSelected = editingId === skill.id;

                            return (
                              <tr
                                key={skill.id}
                                onClick={() => handleEdit(skill)}
                                className={`border-b border-gray-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-yellow-100"
                                    : "hover:bg-yellow-50"
                                }`}
                              >
                                <td className="p-4 font-bold">{skill.name}</td>

                                <td className="p-4">
                                  {getSkillTypeLabel(skill.skillType)}
                                </td>

                                <td className="p-4">
                                  {getSkillLevelLabel(skill.level)}
                                </td>

                                <td className="p-4">{skill.sortOrder}</td>

                                <td className="p-4">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                      skill.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {skill.isActive ? "Activo" : "Oculto"}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleEdit(skill);
                                      }}
                                      className="bg-yellow-800 text-white rounded-lg px-4 py-2 font-bold hover:bg-yellow-900 transition-colors"
                                    >
                                      Editar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(skill.id);
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
                      {editingId ? "Editar skill" : "Añadir skill"}
                    </h2>

                    <p className="text-gray-700">
                      Completa los datos de la habilidad.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="font-bold">
                      Nombre
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={selectedSkill.name}
                      onChange={(event) =>
                        handleChange("name", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: React"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="skillType" className="font-bold">
                      Tipo
                    </label>

                    <select
                      id="skillType"
                      value={selectedSkill.skillType}
                      onChange={(event) =>
                        handleChange(
                          "skillType",
                          event.target.value as SkillType
                        )
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                    >
                      {skillTypes.map((skillType) => (
                        <option key={skillType.value} value={skillType.value}>
                          {skillType.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="level" className="font-bold">
                      Nivel
                    </label>

                    <select
                      id="level"
                      value={selectedSkill.level}
                      onChange={(event) =>
                        handleChange("level", event.target.value as SkillLevel)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                    >
                      {skillLevels.map((skillLevel) => (
                        <option key={skillLevel.value} value={skillLevel.value}>
                          {skillLevel.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="sortOrder" className="font-bold">
                      Orden
                    </label>

                    <input
                      id="sortOrder"
                      type="number"
                      value={selectedSkill.sortOrder}
                      onChange={(event) =>
                        handleChange("sortOrder", Number(event.target.value))
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="1"
                    />
                  </div>

                  <label className="flex items-center gap-3 font-bold">
                    <input
                      type="checkbox"
                      checked={selectedSkill.isActive}
                      onChange={(event) =>
                        handleChange("isActive", event.target.checked)
                      }
                      className="h-5 w-5"
                    />
                    Visible
                  </label>

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
                        : "Crear skill"}
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