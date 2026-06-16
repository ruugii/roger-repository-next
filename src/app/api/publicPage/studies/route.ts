import { db } from "@/lib/db";

type EducationPublicRow = {
  id: number;
  school_name: string;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  sort_order: number;
};

type EducationContentRow = {
  education_id: number;
  language_code: "es" | "cat" | "en";
  degree_name: string;
  description: string | null;
};

export async function GET() {
  try {
    const [educationRows] = await db.query(`
      SELECT
        id,
        school_name,
        start_date,
        end_date,
        is_current,
        sort_order
      FROM education
      WHERE is_active = 1
      ORDER BY sort_order ASC
    `);

    const [contentRows] = await db.query(`
      SELECT
        education_id,
        language_code,
        degree_name,
        description
      FROM education_content
    `);

    const educations = educationRows as EducationPublicRow[];
    const contents = contentRows as EducationContentRow[];

    const studies = educations.map((education) => {
      const es = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "es",
      );

      const cat = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "cat",
      );

      const en = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "en",
      );

      return {
        id: education.id,
        school: education.school_name,
        startYear: education.start_date
          ? new Date(education.start_date).getFullYear().toString()
          : "",
        endYear: education.end_date
          ? new Date(education.end_date).getFullYear().toString()
          : "",
        isCurrent: Boolean(education.is_current),
        sortOrder: education.sort_order,

        degree: {
          es: es?.degree_name ?? "",
          cat: cat?.degree_name ?? "",
          en: en?.degree_name ?? "",
        },

        description: {
          es: es?.description ?? "",
          cat: cat?.description ?? "",
          en: en?.description ?? "",
        },
      };
    });

    return Response.json(studies);
  } catch (error) {
    console.error("Error getting public studies:", error);

    return Response.json(
      { error: "Error getting public studies" },
      { status: 500 },
    );
  }
}