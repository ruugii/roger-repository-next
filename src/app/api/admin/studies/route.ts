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

function buildSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

function yearToDate(year: string) {
  if (!year) return null;
  return `${year}-01-01`;
}

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

export async function POST(request: Request) {
  const connection = await db.getConnection();
  try {
    const body = await request.json();
    if (!body.school?.trim()) {
      return Response.json(
        { error: "El centro es obligatorio" },
        { status: 400 },
      );
    }
    if (!body.degreeEs?.trim()) {
      return Response.json(
        { error: "El grado en español es obligatorio" },
        { status: 400 },
      );
    }
    if (!body.startYear?.trim()) {
      return Response.json(
        { error: "El año de inicio es obligatorio" },
        { status: 400 },
      );
    }
    await connection.beginTransaction();
    const slug = `${buildSlug(body.school)}-${Date.now()}`;
    const [educationResult] = await connection.query(
      `
      INSERT INTO education (
        slug,
        school_name,
        start_date,
        end_date,
        is_current,
        sort_order,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        slug,
        body.school,
        yearToDate(body.startYear),
        body.isCurrent ? null : yearToDate(body.endYear),
        body.isCurrent ? 1 : 0,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
      ],
    );
    const educationId = (educationResult as { insertId: number }).insertId;
    await connection.query(
      `
      INSERT INTO education_content (
        education_id,
        language_code,
        degree_name,
        description,
        chatbot_summary
      )
      VALUES
        (?, 'es', ?, ?, ?),
        (?, 'cat', ?, ?, ?),
        (?, 'en', ?, ?, ?)
      `,
      [
        educationId,
        body.degreeEs ?? "",
        body.descriptionEs ?? "",
        body.chatbotSummaryEs ?? "",
        educationId,
        body.degreeCat ?? "",
        body.descriptionCat ?? "",
        body.chatbotSummaryCat ?? "",
        educationId,
        body.degreeEn ?? "",
        body.descriptionEn ?? "",
        body.chatbotSummaryEn ?? "",
      ],
    );
    await connection.commit();
    return Response.json(
      {
        success: true,
        id: educationId,
      },
      { status: 201 },
    );
  } catch (error) {
    await connection.rollback();
    console.error("Error creating study:", error);
    return Response.json({ error: "Error creating study" }, { status: 500 });
  } finally {
    connection.release();
  }
}
