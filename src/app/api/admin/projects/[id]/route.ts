import { db } from "@/lib/db";

type LanguageCode = "es" | "cat" | "en";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function toDateOrNull(value: string) {
  if (!value) return null;
  return value;
}

export async function PUT(request: Request, { params }: RouteContext) {
  const connection = await db.getConnection();

  try {
    const { id } = await params;
    const projectId = Number(id);
    const body = await request.json();

    if (Number.isNaN(projectId)) {
      return Response.json(
        { error: "ID de proyecto inválido" },
        { status: 400 }
      );
    }

    if (!body.content?.es?.name?.trim()) {
      return Response.json(
        { error: "El nombre del proyecto en español es obligatorio" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const [projectResult] = await connection.query(
      `
      UPDATE projects
      SET
        project_type = ?,
        start_date = ?,
        end_date = ?,
        is_current = ?,
        repository_url = ?,
        demo_url = ?,
        image_url = ?,
        sort_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        body.projectType || "other",
        toDateOrNull(body.startDate),
        body.isCurrent ? null : toDateOrNull(body.endDate),
        body.isCurrent ? 1 : 0,
        body.repositoryUrl || null,
        body.demoUrl || null,
        body.imageUrl || null,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
        projectId,
      ]
    );

    const updateResult = projectResult as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      await connection.rollback();

      return Response.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

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
        ON DUPLICATE KEY UPDATE
          name = VALUES(name),
          short_description = VALUES(short_description),
          long_description = VALUES(long_description),
          chatbot_summary = VALUES(chatbot_summary),
          updated_at = CURRENT_TIMESTAMP
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

    await connection.query(
      `
      DELETE FROM project_skills
      WHERE project_id = ?
      `,
      [projectId]
    );

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

    return Response.json({
      success: true,
      id: projectId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error updating project:", error);

    return Response.json(
      { error: "Error updating project" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  const connection = await db.getConnection();

  try {
    const { id } = await params;
    const projectId = Number(id);

    if (Number.isNaN(projectId)) {
      return Response.json(
        { error: "ID de proyecto inválido" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    await connection.query(
      `
      DELETE FROM project_skills
      WHERE project_id = ?
      `,
      [projectId]
    );

    await connection.query(
      `
      DELETE FROM project_content
      WHERE project_id = ?
      `,
      [projectId]
    );

    const [result] = await connection.query(
      `
      DELETE FROM projects
      WHERE id = ?
      `,
      [projectId]
    );

    await connection.commit();

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return Response.json(
        { error: "Proyecto no encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      id: projectId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error deleting project:", error);

    return Response.json(
      { error: "Error deleting project" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}