"use client";

import ProjectsItem from "@/app/ux/ProjectsItem";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type Locale = "es" | "cat" | "en";

type ProjectType = "web" | "javafx" | "mobile" | "ai" | "other";

type ProjectContent = {
  name: string;
  shortDescription: string;
  longDescription: string;
  chatbotSummary?: string;
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
  content: Record<Locale, ProjectContent>;
};

type Skill = {
  id: number;
  name: string;
};

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);

  const t = useTranslations("projects");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/publicPage/projects", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Error fetching projects");
        }

        const data: Project[] = await response.json();

        setProjects(
          data
            .filter((project) => project.isActive)
            .sort((a, b) => a.sortOrder - b.sortOrder),
        );
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await fetch("/api/publicPage/skills", {
          cache: "no-store",
        });

        if (response.ok) {
          const data: Skill[] = await response.json();
          setSkills(data);
        }
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchProjects();
    fetchSkills();
  }, []);

  const getSkillId = (skillName: string): number => {
    const skill = skills.find((s) => s.name === skillName);
    return skill ? skill.id : -1;
  };

  return (
    <>
      <section
        className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black"
        id="projects"
      >
        <h2 className="text-4xl font-bold">{t("title.web")}</h2>

        <ul className="flex flex-wrap gap-4 items-center justify-center">
          {projects.map((p) => {
            if (p.projectType === "web") {
              return (
                <ProjectsItem
                  key={p.id}
                  link={p.demoUrl}
                  name={p.content.cat.name}
                  description={p.content.cat.shortDescription}
                  html={p.skillIds.includes(getSkillId("HTML"))}
                  css={p.skillIds.includes(getSkillId("CSS"))}
                  js={p.skillIds.includes(getSkillId("JavaScript"))}
                  ts={p.skillIds.includes(getSkillId("TypeScript"))}
                  json={p.skillIds.includes(getSkillId("JSON"))}
                  react={p.skillIds.includes(getSkillId("React"))}
                  nextJs={p.skillIds.includes(getSkillId("Next.js"))}
                  tailwind={p.skillIds.includes(getSkillId("TailwindCSS"))}
                  java={p.skillIds.includes(getSkillId("Java"))}
                  javaFX={p.skillIds.includes(getSkillId("JavaFX"))}
                  git={p.skillIds.includes(getSkillId("Git"))}
                  expo={p.skillIds.includes(getSkillId("Expo"))}
                  bgImage={p.imageUrl || undefined}
                />
              );
            }
          })}
        </ul>
      </section>

      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full">
        <h2 className="text-4xl font-bold">{t("title.javafx")}</h2>

        <ul className="flex flex-wrap gap-4 items-center justify-center w-full">
          {projects.map((p) => {
            if (p.projectType === "javafx") {
              return (
                <ProjectsItem
                  key={p.id}
                  link={p.demoUrl}
                  name={p.content.cat.name}
                  description={p.content.cat.shortDescription}
                  html={p.skillIds.includes(getSkillId("HTML"))}
                  css={p.skillIds.includes(getSkillId("CSS"))}
                  js={p.skillIds.includes(getSkillId("JavaScript"))}
                  ts={p.skillIds.includes(getSkillId("TypeScript"))}
                  json={p.skillIds.includes(getSkillId("JSON"))}
                  react={p.skillIds.includes(getSkillId("React"))}
                  nextJs={p.skillIds.includes(getSkillId("Next.js"))}
                  tailwind={p.skillIds.includes(getSkillId("TailwindCSS"))}
                  java={p.skillIds.includes(getSkillId("Java"))}
                  javaFX={p.skillIds.includes(getSkillId("JavaFX"))}
                  git={p.skillIds.includes(getSkillId("Git"))}
                  expo={p.skillIds.includes(getSkillId("Expo"))}
                  bgImage={p.imageUrl || undefined}
                />
              );
            }
          })}
        </ul>
      </section>
    </>
  );
}
