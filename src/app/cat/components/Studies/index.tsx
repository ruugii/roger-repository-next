"use client";

import Timeline from "@/app/ux/Timeline";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type LocalizedText = {
  es: string;
  cat: string;
  en: string;
};

type Study = {
  id: number;
  school: string;
  startYear: string;
  endYear: string;
  isCurrent: boolean;
  sortOrder: number;
  degree: LocalizedText;
  description: LocalizedText;
};

type TimelineItem = {
  date: string;
  title: string;
  description: string;
};

export default function Studies() {
  const [studies, setStudies] = useState<Study[]>([]);

  const t = useTranslations("studies");

  useEffect(() => {
    const fetchStudies = async () => {
      try {
        const response = await fetch("/api/publicPage/studies", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Error fetching studies");
        }

        const data = await response.json();
        setStudies(data);
      } catch (error) {
        console.error("Error fetching studies:", error);
      }
    };

    fetchStudies();
  }, []);

  const timelineItems: TimelineItem[] = studies.map((study) => ({
    date: study.isCurrent
      ? `${study.startYear} - ${t("year.current")}`
      : study.endYear
        ? `${study.startYear} - ${study.endYear}`
        : study.startYear,
    title: study.school,
    description: study.degree.cat
  }));

  return (
    <section
      className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full"
      id="studies"
    >
      <h2 className="text-4xl font-bold">{t("title")}</h2>

      <Timeline items={timelineItems} />
    </section>
  );
}