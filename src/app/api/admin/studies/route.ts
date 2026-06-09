import { db } from "@/lib/db";

type EducationRow = {
  id: number;
  school_name: string;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  sort_order: number;
  is_active: number;
};

type EducationContentRow = {
  education_id: number;
  language_code: "es" | "cat" | "en";
  degree_name: string;
};

export async function GET() {
  try {
    const [educationRows] = await db.query(`
      SELECT * FROM education ORDER BY sort_order ASC
    `);

    const [contentRows] = await db.query(`
      SELECT
        education_id,
        language_code,
        degree_name
      FROM education_content
    `);

    const educations = educationRows as EducationRow[];
    const contents = contentRows as EducationContentRow[];

    const studies = educations.map((education) => {
      const es = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "es"
      );

      const cat = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "cat"
      );

      const en = contents.find(
        (content) =>
          content.education_id === education.id &&
          content.language_code === "en"
      );

      return {
        id: education.id,
        school: education.school_name,
        degreeEs: es?.degree_name ?? "",
        degreeCat: cat?.degree_name ?? "",
        degreeEn: en?.degree_name ?? "",
        startYear: education.start_date
          ? new Date(education.start_date).getFullYear().toString()
          : "",
        endYear: education.end_date
          ? new Date(education.end_date).getFullYear().toString()
          : "",
        isCurrent: Boolean(education.is_current),
        sortOrder: education.sort_order,
        isActive: Boolean(education.is_active),
      };
    });

    return Response.json(studies);
  } catch (error) {
    console.error("Error getting studies:", error);

    return Response.json(
      { error: "Error getting studies" },
      { status: 500 }
    );
  }
}
