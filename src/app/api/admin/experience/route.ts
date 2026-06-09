import { db } from "@/lib/db";

type LanguageCode = "es" | "cat" | "en";

type ExperienceRow = {
  id: number;
  slug: string;
  company_name: string;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  location: string | null;
  modality: string;
  sort_order: number;
  is_active: number;
};

type ExperienceContentRow = {
  experience_id: number;
  language_code: LanguageCode;
  position_title: string;
  description: string | null;
  chatbot_summary: string | null;
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

function dateForInput(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
}

function toDateOrNull(value: string) {
  if (!value) return null;
  return value;
}

export async function GET() {
  try {
    const [experienceRows] = await db.query(`
      SELECT
        id,
        slug,
        company_name,
        start_date,
        end_date,
        is_current,
        location,
        modality,
        sort_order,
        is_active
      FROM experience
      ORDER BY sort_order ASC, id ASC
    `);

    const [contentRows] = await db.query(`
      SELECT
        experience_id,
        language_code,
        position_title,
        description,
        chatbot_summary
      FROM experience_content
    `);

    const experiences = (experienceRows as ExperienceRow[]).map(
      (experience) => {
        const content = {
          es: {
            positionTitle: "",
            description: "",
            chatbotSummary: "",
          },
          cat: {
            positionTitle: "",
            description: "",
            chatbotSummary: "",
          },
          en: {
            positionTitle: "",
            description: "",
            chatbotSummary: "",
          },
        };

        (contentRows as ExperienceContentRow[])
          .filter((item) => item.experience_id === experience.id)
          .forEach((item) => {
            content[item.language_code] = {
              positionTitle: item.position_title ?? "",
              description: item.description ?? "",
              chatbotSummary: item.chatbot_summary ?? "",
            };
          });

        return {
          id: experience.id,
          slug: experience.slug,
          companyName: experience.company_name,
          startDate: dateForInput(experience.start_date),
          endDate: dateForInput(experience.end_date),
          isCurrent: Boolean(experience.is_current),
          location: experience.location ?? "",
          modality: experience.modality,
          sortOrder: experience.sort_order,
          isActive: Boolean(experience.is_active),
          content,
        };
      }
    );

    return Response.json(experiences);
  } catch (error) {
    console.error("Error getting experience:", error);

    return Response.json(
      { error: "Error getting experience" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const connection = await db.getConnection();

  try {
    const body = await request.json();

    if (!body.companyName?.trim()) {
      return Response.json(
        { error: "El nombre de la empresa es obligatorio" },
        { status: 400 }
      );
    }

    if (!body.content?.es?.positionTitle?.trim()) {
      return Response.json(
        { error: "El cargo en español es obligatorio" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const slug = `${buildSlug(body.companyName)}-${Date.now()}`;

    const [experienceResult] = await connection.query(
      `
      INSERT INTO experience (
        slug,
        company_name,
        start_date,
        end_date,
        is_current,
        location,
        modality,
        sort_order,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        slug,
        body.companyName,
        toDateOrNull(body.startDate),
        body.isCurrent ? null : toDateOrNull(body.endDate),
        body.isCurrent ? 1 : 0,
        body.location || null,
        body.modality || "unknown",
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
      ]
    );

    const experienceId = (experienceResult as { insertId: number }).insertId;

    const languages: LanguageCode[] = ["es", "cat", "en"];

    for (const languageCode of languages) {
      await connection.query(
        `
        INSERT INTO experience_content (
          experience_id,
          language_code,
          position_title,
          description,
          chatbot_summary
        )
        VALUES (?, ?, ?, ?, ?)
        `,
        [
          experienceId,
          languageCode,
          body.content?.[languageCode]?.positionTitle ?? "",
          body.content?.[languageCode]?.description ?? "",
          body.content?.[languageCode]?.chatbotSummary ?? "",
        ]
      );
    }

    await connection.commit();

    return Response.json(
      {
        success: true,
        id: experienceId,
      },
      { status: 201 }
    );
  } catch (error) {
    await connection.rollback();

    console.error("Error creating experience:", error);

    return Response.json(
      { error: "Error creating experience" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}