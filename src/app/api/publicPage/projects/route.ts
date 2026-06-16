import { db } from "@/lib/db";

type LanguageCode = "es" | "cat" | "en";

type ProjectRow = {
  id: number;
  slug: string;
  project_type: string;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  repository_url: string | null;
  demo_url: string | null;
  image_url: string | null;
  sort_order: number;
  is_active: number;
};

type ProjectContentRow = {
  project_id: number;
  language_code: LanguageCode;
  name: string;
  short_description: string | null;
  long_description: string | null;
  chatbot_summary: string | null;
};

type ProjectSkillRow = {
  project_id: number;
  skill_id: number;
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
    const [projectRows] = await db.query(`
      SELECT
        id,
        slug,
        project_type,
        start_date,
        end_date,
        is_current,
        repository_url,
        demo_url,
        image_url,
        sort_order,
        is_active
      FROM projects
      ORDER BY sort_order ASC, id ASC
    `);

    const [contentRows] = await db.query(`
      SELECT
        project_id,
        language_code,
        name,
        short_description,
        long_description,
        chatbot_summary
      FROM project_content
    `);

    const [skillRows] = await db.query(`
      SELECT
        project_id,
        skill_id
      FROM project_skills
    `);

    const projects = (projectRows as ProjectRow[]).map((project) => {
      const content = {
        es: {
          name: "",
          shortDescription: "",
          longDescription: "",
          chatbotSummary: "",
        },
        cat: {
          name: "",
          shortDescription: "",
          longDescription: "",
          chatbotSummary: "",
        },
        en: {
          name: "",
          shortDescription: "",
          longDescription: "",
          chatbotSummary: "",
        },
      };

      (contentRows as ProjectContentRow[])
        .filter((item) => item.project_id === project.id)
        .forEach((item) => {
          content[item.language_code] = {
            name: item.name ?? "",
            shortDescription: item.short_description ?? "",
            longDescription: item.long_description ?? "",
            chatbotSummary: item.chatbot_summary ?? "",
          };
        });

      const skillIds = (skillRows as ProjectSkillRow[])
        .filter((item) => item.project_id === project.id)
        .map((item) => item.skill_id);

      return {
        id: project.id,
        slug: project.slug,
        projectType: project.project_type,
        startDate: dateForInput(project.start_date),
        endDate: dateForInput(project.end_date),
        isCurrent: Boolean(project.is_current),
        repositoryUrl: project.repository_url ?? "",
        demoUrl: project.demo_url ?? "",
        imageUrl: project.image_url ?? "",
        sortOrder: project.sort_order,
        isActive: Boolean(project.is_active),
        skillIds,
        content,
      };
    });

    return Response.json(projects);
  } catch (error) {
    console.error("Error getting projects:", error);

    return Response.json(
      { error: "Error getting projects" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  const connection = await db.getConnection();

  try {
    const body = await request.json();

    if (!body.content?.es?.name?.trim()) {
      return Response.json(
        { error: "El nombre del proyecto en español es obligatorio" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const slug = `${buildSlug(body.content.es.name)}-${Date.now()}`;

    const [projectResult] = await connection.query(
      `
      INSERT INTO projects (
        slug,
        project_type,
        start_date,
        end_date,
        is_current,
        repository_url,
        demo_url,
        image_url,
        sort_order,
        is_active
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        slug,
        body.projectType || "other",
        toDateOrNull(body.startDate),
        body.isCurrent ? null : toDateOrNull(body.endDate),
        body.isCurrent ? 1 : 0,
        body.repositoryUrl || null,
        body.demoUrl || null,
        body.imageUrl || null,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
      ]
    );

    const projectId = (projectResult as { insertId: number }).insertId;

    const languages: LanguageCode[] = ["es", "cat", "en"];

    for (const languageCode of languages) {
      await connection.query(
        `
        INSERT INTO project_content (
          project_id,
          language_code,
          name,
          short_description,
          long_description,
          chatbot_summary
        )
        VALUES (?, ?, ?, ?, ?, ?)
        `,
        [
          projectId,
          languageCode,
          body.content?.[languageCode]?.name ?? "",
          body.content?.[languageCode]?.shortDescription ?? "",
          body.content?.[languageCode]?.longDescription ?? "",
          body.content?.[languageCode]?.chatbotSummary ?? "",
        ]
      );
    }

    const skillIds = Array.isArray(body.skillIds) ? body.skillIds : [];

    for (const skillId of skillIds) {
      await connection.query(
        `
        INSERT INTO project_skills (
          project_id,
          skill_id
        )
        VALUES (?, ?)
        `,
        [projectId, skillId]
      );
    }

    await connection.commit();

    return Response.json(
      {
        success: true,
        id: projectId,
      },
      { status: 201 }
    );
  } catch (error) {
    await connection.rollback();

    console.error("Error creating project:", error);

    return Response.json(
      { error: "Error creating project" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}