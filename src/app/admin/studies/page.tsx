"use client";

import Header from "@/app/[locale]/components/Header";
import Link from "next/link";
import { useEffect, useState } from "react";

type Study = {
  id: number;
  school: string;
  degreeEs: string;
  degreeCat: string;
  degreeEn: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  sortOrder: number;
  isActive: boolean;
};

const emptyStudy: Study = {
  id: 0,
  school: "",
  degreeEs: "",
  degreeCat: "",
  degreeEn: "",
  startYear: "",
  endYear: "",
  isCurrent: false,
  sortOrder: 0,
  isActive: true,
};

export default function AdminStudiesPage() {
  const [studies, setStudies] = useState<Study[]>([]);

  useEffect(() => {
    async function fetchStudies() {
      const response = await fetch("/api/admin/studies", {
        cache: "no-store",
      });

      if (!response.ok) {
        console.error("Error fetching studies:", response.statusText);
        return;
      }

      const data: Study[] = await response.json();
      setStudies(data);
    }

    fetchStudies();
  }, []);

  const [selectedStudy, setSelectedStudy] = useState<Study>(emptyStudy);
  const [editingId, setEditingId] = useState<number | null>(null);

  const handleChange = (
    field: keyof Study,
    value: string | number | boolean,
  ) => {
    setSelectedStudy((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setSelectedStudy(emptyStudy);
    setEditingId(null);
  };

  const handleEdit = (study: Study) => {
    setSelectedStudy(study);
    setEditingId(study.id);
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("¿Seguro que quieres eliminar este estudio?");

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/admin/studies/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        console.error("Error deleting study:", response.statusText);
        alert("No se ha podido eliminar el estudio.");
        return;
      }

      setStudies((prev) => prev.filter((study) => study.id !== id));

      if (editingId === id) {
        resetForm();
      }
    } catch (error) {
      console.error("Error deleting study:", error);
      alert("No se ha podido eliminar el estudio.");
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedStudy.school.trim()) return;
    if (!selectedStudy.degreeEs.trim()) return;
    if (!selectedStudy.startYear.trim()) return;

    try {
      const isEditing = editingId !== null;

      const response = await fetch(
        isEditing ? `/api/admin/studies/${editingId}` : "/api/admin/studies",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedStudy),
        },
      );

      if (!response.ok) {
        console.error("Error saving study:", response.statusText);
        alert("No se ha podido guardar el estudio.");
        return;
      }

      const studiesResponse = await fetch("/api/admin/studies", {
        cache: "no-store",
      });

      const data: Study[] = await studiesResponse.json();
      setStudies(data);

      resetForm();
    } catch (error) {
      console.error("Error saving study:", error);
      alert("No se ha podido guardar el estudio.");
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

                <h1 className="text-4xl font-bold">Estudios</h1>

                <p className="text-lg text-gray-700 max-w-3xl">
                  Añade, edita o elimina estudios. Esta información podrá usarse
                  tanto en el portfolio como en el chatbot.
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
                <h2 className="text-2xl font-bold">Listado de estudios</h2>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-yellow-800 text-white text-left">
                        <th className="p-4">Centro</th>
                        <th className="p-4">Grado</th>
                        <th className="p-4">Fechas</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4">Acciones</th>
                      </tr>
                    </thead>

                    <tbody>
                      {studies
                        .sort((a, b) => a.sortOrder - b.sortOrder)
                        .map((study) => (
                          <tr
                            key={study.id}
                            className="border-b border-gray-200 hover:bg-yellow-50"
                          >
                            <td className="p-4 font-bold">{study.school}</td>

                            <td className="p-4">{study.degreeEs}</td>

                            <td className="p-4">
                              {study.startYear} -{" "}
                              {study.isCurrent
                                ? "Actualidad"
                                : study.endYear || "Sin fecha"}
                            </td>

                            <td className="p-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-sm font-bold ${
                                  study.isActive
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {study.isActive ? "Activo" : "Oculto"}
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="flex gap-2">
                                <button
                                  type="button"
                                  onClick={() => handleEdit(study)}
                                  className="bg-yellow-800 text-white rounded-lg px-4 py-2 font-bold hover:bg-yellow-900 transition-colors"
                                >
                                  Editar
                                </button>

                                <button
                                  type="button"
                                  onClick={() => handleDelete(study.id)}
                                  className="bg-red-600 text-white rounded-lg px-4 py-2 font-bold hover:bg-red-700 transition-colors"
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <aside className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {editingId ? "Editar estudio" : "Añadir estudio"}
                    </h2>

                    <p className="text-gray-700">
                      Completa los datos principales y las traducciones.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="school" className="font-bold">
                      Centro
                    </label>

                    <input
                      id="school"
                      type="text"
                      value={selectedStudy.school}
                      onChange={(event) =>
                        handleChange("school", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: La Salle Online"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="degreeEs" className="font-bold">
                      Grado en español
                    </label>

                    <input
                      id="degreeEs"
                      type="text"
                      value={selectedStudy.degreeEs}
                      onChange={(event) =>
                        handleChange("degreeEs", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: CFGS Desarrollo de Aplicaciones Web"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="degreeCat" className="font-bold">
                      Grado en catalán
                    </label>

                    <input
                      id="degreeCat"
                      type="text"
                      value={selectedStudy.degreeCat}
                      onChange={(event) =>
                        handleChange("degreeCat", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: CFGS Desenvolupament d'Aplicacions Web"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="degreeEn" className="font-bold">
                      Grado en inglés
                    </label>

                    <input
                      id="degreeEn"
                      type="text"
                      value={selectedStudy.degreeEn}
                      onChange={(event) =>
                        handleChange("degreeEn", event.target.value)
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="Ej: Web Application Development"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="startYear" className="font-bold">
                        Año inicio
                      </label>

                      <input
                        id="startYear"
                        type="text"
                        value={selectedStudy.startYear}
                        onChange={(event) =>
                          handleChange("startYear", event.target.value)
                        }
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                        placeholder="2024"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="endYear" className="font-bold">
                        Año fin
                      </label>

                      <input
                        id="endYear"
                        type="text"
                        value={selectedStudy.endYear}
                        onChange={(event) =>
                          handleChange("endYear", event.target.value)
                        }
                        disabled={selectedStudy.isCurrent}
                        className="rounded-lg border-2 border-yellow-800 p-3 bg-white disabled:bg-gray-200"
                        placeholder="2026"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <label className="flex items-center gap-3 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedStudy.isCurrent}
                        onChange={(event) =>
                          handleChange("isCurrent", event.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      Actualidad
                    </label>

                    <label className="flex items-center gap-3 font-bold">
                      <input
                        type="checkbox"
                        checked={selectedStudy.isActive}
                        onChange={(event) =>
                          handleChange("isActive", event.target.checked)
                        }
                        className="h-5 w-5"
                      />
                      Visible
                    </label>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="sortOrder" className="font-bold">
                      Orden
                    </label>

                    <input
                      id="sortOrder"
                      type="number"
                      value={selectedStudy.sortOrder}
                      onChange={(event) =>
                        handleChange("sortOrder", Number(event.target.value))
                      }
                      className="rounded-lg border-2 border-yellow-800 p-3 bg-white"
                      placeholder="1"
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-yellow-800 text-white rounded-lg px-5 py-3 font-bold hover:bg-yellow-900 transition-colors"
                    >
                      {editingId ? "Guardar cambios" : "Crear estudio"}
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
