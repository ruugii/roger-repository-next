"use client";

import Header from "@/app/[locale]/components/Header";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type LanguageCode = "es" | "cat" | "en";
type Modality = "remote" | "hybrid" | "onsite" | "unknown";

type ExperienceContent = {
  positionTitle: string;
  description: string;
  chatbotSummary: string;
};

type Experience = {
  id: number;
  slug: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  modality: Modality;
  sortOrder: number;
  isActive: boolean;
  content: Record<LanguageCode, ExperienceContent>;
};

const languages: {
  code: LanguageCode;
  label: string;
}[] = [
  { code: "es", label: "Español" },
  { code: "cat", label: "Català" },
  { code: "en", label: "English" },
];

const modalities: {
  value: Modality;
  label: string;
}[] = [
  { value: "remote", label: "Remoto" },
  { value: "hybrid", label: "Híbrido" },
  { value: "onsite", label: "Presencial" },
  { value: "unknown", label: "Sin especificar" },
];

const emptyContent: ExperienceContent = {
  positionTitle: "",
  description: "",
  chatbotSummary: "",
};

const emptyExperience: Experience = {
  id: 0,
  slug: "",
  companyName: "",
  startDate: "",
  endDate: "",
  isCurrent: false,
  location: "",
  modality: "unknown",
  sortOrder: 0,
  isActive: true,
  content: {
    es: { ...emptyContent },
    cat: { ...emptyContent },
    en: { ...emptyContent },
  },
};

function getModalityLabel(modality: Modality) {
  return (
    modalities.find((item) => item.value === modality)?.label ??
    "Sin especificar"
  );
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience>(emptyExperience);
  const [selectedLanguage, setSelectedLanguage] =
    useState<LanguageCode>("es");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const selectedLanguageLabel = useMemo(() => {
    return languages.find((language) => language.code === selectedLanguage)
      ?.label;
  }, [selectedLanguage]);

  const loadExperiences = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/admin/experience", {
        cache: "no-store",
      });

      if (!response.ok) {
        alert("No se ha podido cargar la experiencia.");
        return;
      }

      const data: Experience[] = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error("Error fetching experience:", error);
      alert("No se ha podido cargar la experiencia.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const resetForm = () => {
    setSelectedExperience(emptyExperience);
    setSelectedLanguage("es");
    setEditingId(null);
  };

  const handleEdit = (experience: Experience) => {
    setSelectedExperience(experience);
    setSelectedLanguage("es");
    setEditingId(experience.id);
  };

  const handleBaseChange = (
    field: keyof Omit<Experience, "content">,
    value: string | number | boolean
  ) => {
    setSelectedExperience((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (
    field: keyof ExperienceContent,
    value: string
  ) => {
    setSelectedExperience((prev) => ({
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

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta experiencia?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/experience/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        alert("No se ha podido eliminar la experiencia.");
        return;
      }

      setExperiences((prev) =>
        prev.filter((experience) => experience.id !== id)
      );

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting experience:", error);
      alert("No se ha podido eliminar la experiencia.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedExperience.companyName.trim()) {
      alert("El nombre de la empresa es obligatorio.");
      return;
    }

    if (!selectedExperience.content.es.positionTitle.trim()) {
      alert("El cargo en español es obligatorio.");
      return;
    }

    try {
      setSaving(true);

      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing
          ? `/api/admin/experience/${editingId}`
          : "/api/admin/experience",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedExperience),
        }
      );

      if (!response.ok) {
        alert("No se ha podido guardar la experiencia.");
        return;
      }

      await loadExperiences();
      resetForm();
    } catch (error) {
      console.error("Error saving experience:", error);
      alert("No se ha podido guardar la experiencia.");
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

                <h1 className="text-4xl font-bold">Experiencia</h1>

                <p className="text-lg text-gray-700 max-w-3xl">
                  Añade, edita o elimina experiencias laborales. Puedes
                  modificar el cargo, descripción y resumen para chatbot en
                  español, catalán e inglés.
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
                  <h2 className="text-2xl font-bold">
                    Listado de experiencia
                  </h2>

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
                    Cargando experiencia...
                  </div>
                ) : experiences.length === 0 ? (
                  <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                    Todavía no hay experiencia creada.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse rounded-lg overflow-hidden">
                      <thead>
                        <tr className="bg-yellow-800 text-white text-left">
                          <th className="p-4">Empresa</th>
                          <th className="p-4">Cargo</th>
                          <th className="p-4">Fechas</th>
                          <th className="p-4">Modalidad</th>
                          <th className="p-4">Estado</th>
                          <th className="p-4">Acciones</th>
                        </tr>
                      </thead>

                      <tbody>
                        {experiences
                          .sort((a, b) => a.sortOrder - b.sortOrder)
                          .map((experience) => {
                            const isSelected = editingId === experience.id;

                            return (
                              <tr
                                key={experience.id}
                                onClick={() => handleEdit(experience)}
                                className={`border-b border-gray-200 cursor-pointer ${
                                  isSelected
                                    ? "bg-yellow-100"
                                    : "hover:bg-yellow-50"
                                }`}
                              >
                                <td className="p-4 font-bold">
                                  {experience.companyName}
                                </td>

                                <td className="p-4">
                                  {experience.content.es.positionTitle ||
                                    "Sin cargo"}
                                </td>

                                <td className="p-4">
                                  {experience.startDate || "Sin fecha"} -{" "}
                                  {experience.isCurrent
                                    ? "Actualidad"
                                    : experience.endDate || "Sin fecha"}
                                </td>

                                <td className="p-4">
                                  {getModalityLabel(experience.modality)}
                                </td>

                                <td className="p-4">
                                  <span
                                    className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                      experience.isActive
                                        ? "bg-green-100 text-green-800"
                                        : "bg-red-100 text-red-800"
                                    }`}
                                  >
                                    {experience.isActive
                                      ? "Activo"
                                      : "Oculto"}
                                  </span>
                                </td>

                                <td className="p-4">
                                  <div className="flex gap-2">
                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleEdit(experience);
                                      }}
                                      className="bg-yellow-800 text-white rounded-lg px-4 py-2 font-bold hover:bg-yellow-900 transition-colors"
                                    >
                                      Editar
                                    </button>

                                    <button
                                      type="button"
                                      onClick={(event) => {
                                        event.stopPropagation();
                                        handleDelete(experience.id);
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
                      {editingId ? "Editar experiencia" : "Añadir experiencia"}
                    </h2>

                    <p className="text-gray-700">
                      Los datos generales son comunes. El contenido cambia por
                      idioma.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="companyName" className="font-bold">
                      Empresa
                    </label>

                    <input
                      id="companyName"
                      type="text"
                      value={selectedExperience.companyName}
                      onChange={(event) =>
                        handleBaseChange("companyName", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: NTT DATA Europe & Latam"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="startDate" className="font-bold">
                        Fecha inicio
                      </label>

                      <input
                        id="startDate"
                        type="date"
                        value={selectedExperience.startDate}
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
                        value={selectedExperience.endDate}
                        onChange={(event) =>
                          handleBaseChange("endDate", event.target.value)
                        }
                        disabled={selectedExperience.isCurrent}
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white disabled:bg-gray-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedExperience.isCurrent}
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
                        checked={selectedExperience.isActive}
                        onChange={(event) =>
                          handleBaseChange("isActive", event.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      Visible
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="location" className="font-bold">
                      Ubicación
                    </label>

                    <input
                      id="location"
                      type="text"
                      value={selectedExperience.location}
                      onChange={(event) =>
                        handleBaseChange("location", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: Barcelona"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="modality" className="font-bold">
                      Modalidad
                    </label>

                    <select
                      id="modality"
                      value={selectedExperience.modality}
                      onChange={(event) =>
                        handleBaseChange(
                          "modality",
                          event.target.value as Modality
                        )
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                    >
                      {modalities.map((modality) => (
                        <option key={modality.value} value={modality.value}>
                          {modality.label}
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
                      value={selectedExperience.sortOrder}
                      onChange={(event) =>
                        handleBaseChange(
                          "sortOrder",
                          Number(event.target.value)
                        )
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
                          setSelectedLanguage(
                            event.target.value as LanguageCode
                          )
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
                        <label htmlFor="positionTitle" className="font-bold">
                          Cargo / puesto
                        </label>

                        <input
                          id="positionTitle"
                          type="text"
                          value={
                            selectedExperience.content[selectedLanguage]
                              .positionTitle
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "positionTitle",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                          placeholder="Ej: Junior Frontend Developer Engineer"
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="description" className="font-bold">
                          Descripción visible
                        </label>

                        <textarea
                          id="description"
                          value={
                            selectedExperience.content[selectedLanguage]
                              .description
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "description",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white min-h-32"
                          placeholder="Descripción que se mostrará en el portfolio."
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="chatbotSummary" className="font-bold">
                          Resumen para chatbot
                        </label>

                        <textarea
                          id="chatbotSummary"
                          value={
                            selectedExperience.content[selectedLanguage]
                              .chatbotSummary
                          }
                          onChange={(event) =>
                            handleContentChange(
                              "chatbotSummary",
                              event.target.value
                            )
                          }
                          className="rounded-lg border-2 border-yellow-800 p-3 bg-white min-h-28"
                          placeholder="Resumen optimizado para que el chatbot explique esta experiencia."
                        />
                      </div>
                    </div>
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
                        : "Crear experiencia"}
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