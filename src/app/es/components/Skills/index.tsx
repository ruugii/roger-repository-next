"use client";

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


export default function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSkills = async () => {
    try {
      setLoading(true);

      const response = await fetch("/api/publicPage/skills", {
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


  return (
    <section
      className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black"
      id="skills"
    >
      <h2 className="text-4xl font-bold">SKILLS</h2>
      {loading ? (
        <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
          Cargando skills...
        </div>
      ) : skills.length === 0 ? (
        <div className="bg-yellow-50 border-2 border-yellow-800 rounded-lg p-6">
          Todavía no hay skills creadas.
        </div>
      ) : (
        <ul className="flex flex-wrap gap-4 items-center justify-center">
          {skills.map((skill, index) => (
            <li
              className=" bg-yellow-800 h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg px-4 py-2"
              key={index + 1}
            >
              <h3 className="text-2xl font-bold">{skill.name}</h3>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
