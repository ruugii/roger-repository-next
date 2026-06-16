"use client";

import Timeline from "@/app/ux/Timeline";
import { useTranslations } from "next-intl";
import { ReactNode, useEffect, useState } from "react";

type LanguageCode = "es" | "cat" | "en";

type ExperienceContent = {
  positionTitle: string;
  description: string;
};

type ExperienceItem = {
  id: number;
  slug: string;
  companyName: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  modality: string;
  sortOrder: number;
  content: Record<LanguageCode, ExperienceContent>;
};

type TimelineItem = {
  date: string;
  title: string;
  description: ReactNode;
};

function getYear(date: string) {
  if (!date) return "";
  return new Date(date).getFullYear().toString();
}

function formatDescription(description: string) {
  if (!description) return "";

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: description,
      }}
    />
  );
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  const t = useTranslations("experience");

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const response = await fetch("/api/publicPage/experience", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Error fetching experience");
        }

        const data = await response.json();
        setExperiences(data);
      } catch (error) {
        console.error("Error fetching experience:", error);
      }
    };

    fetchExperience();
  }, []);

  const timelineItems: TimelineItem[] = experiences.map((experience) => {
    const content = experience.content.en;

    const startYear = getYear(experience.startDate);
    const endYear = getYear(experience.endDate);

    return {
      date: experience.isCurrent
        ? `${startYear} - ${t("year.current")}`
        : endYear
          ? `${startYear} - ${endYear}`
          : startYear,
      title: `${experience.companyName} - ${content.positionTitle}`,
      description: formatDescription(content.description),
    };
  });

  return (
    <section
      className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full"
      id="experience"
    >
      <h2 className="text-4xl font-bold">{t("title")}</h2>

      <Timeline items={timelineItems} />
    </section>
  );
}
