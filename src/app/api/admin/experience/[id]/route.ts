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
    const experienceId = Number(id);
    const body = await request.json();

    if (Number.isNaN(experienceId)) {
      return Response.json(
        { error: "ID de experiencia inválido" },
        { status: 400 }
      );
    }

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

    const [experienceResult] = await connection.query(
      `
      UPDATE experience
      SET
        company_name = ?,
        start_date = ?,
        end_date = ?,
        is_current = ?,
        location = ?,
        modality = ?,
        sort_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        body.companyName,
        toDateOrNull(body.startDate),
        body.isCurrent ? null : toDateOrNull(body.endDate),
        body.isCurrent ? 1 : 0,
        body.location || null,
        body.modality || "unknown",
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
        experienceId,
      ]
    );

    const updateResult = experienceResult as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      await connection.rollback();

      return Response.json(
        { error: "Experiencia no encontrada" },
        { status: 404 }
      );
    }

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
        ON DUPLICATE KEY UPDATE
          position_title = VALUES(position_title),
          description = VALUES(description),
          chatbot_summary = VALUES(chatbot_summary),
          updated_at = CURRENT_TIMESTAMP
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

    return Response.json({
      success: true,
      id: experienceId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error updating experience:", error);

    return Response.json(
      { error: "Error updating experience" },
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
    const experienceId = Number(id);

    if (Number.isNaN(experienceId)) {
      return Response.json(
        { error: "ID de experiencia inválido" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    await connection.query(
      `
      DELETE FROM experience_content
      WHERE experience_id = ?
      `,
      [experienceId]
    );

    const [result] = await connection.query(
      `
      DELETE FROM experience
      WHERE id = ?
      `,
      [experienceId]
    );

    await connection.commit();

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return Response.json(
        { error: "Experiencia no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      id: experienceId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error deleting experience:", error);

    return Response.json(
      { error: "Error deleting experience" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}