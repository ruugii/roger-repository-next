import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function yearToDate(year: string) {
  if (!year) return null;
  return `${year}-01-01`;
}

export async function PUT(request: Request, { params }: RouteContext) {
  const connection = await db.getConnection();

  try {
    const { id } = await params;
    const studyId = Number(id);
    const body = await request.json();

    if (Number.isNaN(studyId)) {
      return Response.json(
        { error: "ID de estudio inválido" },
        { status: 400 }
      );
    }

    if (!body.school?.trim()) {
      return Response.json(
        { error: "El centro es obligatorio" },
        { status: 400 }
      );
    }

    if (!body.degreeEs?.trim()) {
      return Response.json(
        { error: "El grado en español es obligatorio" },
        { status: 400 }
      );
    }

    if (!body.startYear?.trim()) {
      return Response.json(
        { error: "El año de inicio es obligatorio" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    const [educationResult] = await connection.query(
      `
      UPDATE education
      SET
        school_name = ?,
        start_date = ?,
        end_date = ?,
        is_current = ?,
        sort_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        body.school,
        yearToDate(body.startYear),
        body.isCurrent ? null : yearToDate(body.endYear),
        body.isCurrent ? 1 : 0,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
        studyId,
      ]
    );

    const updateResult = educationResult as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      await connection.rollback();

      return Response.json(
        { error: "Estudio no encontrado" },
        { status: 404 }
      );
    }

    const contents = [
      {
        languageCode: "es",
        degreeName: body.degreeEs ?? "",
        description: body.descriptionEs ?? "",
        chatbotSummary: body.chatbotSummaryEs ?? "",
      },
      {
        languageCode: "cat",
        degreeName: body.degreeCat ?? "",
        description: body.descriptionCat ?? "",
        chatbotSummary: body.chatbotSummaryCat ?? "",
      },
      {
        languageCode: "en",
        degreeName: body.degreeEn ?? "",
        description: body.descriptionEn ?? "",
        chatbotSummary: body.chatbotSummaryEn ?? "",
      },
    ];

    for (const content of contents) {
      await connection.query(
        `
        INSERT INTO education_content (
          education_id,
          language_code,
          degree_name,
          description,
          chatbot_summary
        )
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          degree_name = VALUES(degree_name),
          description = VALUES(description),
          chatbot_summary = VALUES(chatbot_summary),
          updated_at = CURRENT_TIMESTAMP
        `,
        [
          studyId,
          content.languageCode,
          content.degreeName,
          content.description,
          content.chatbotSummary,
        ]
      );
    }

    await connection.commit();

    return Response.json({
      success: true,
      id: studyId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error updating study:", error);

    return Response.json(
      { error: "Error updating study" },
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
    const studyId = Number(id);

    if (Number.isNaN(studyId)) {
      return Response.json(
        { error: "ID de estudio inválido" },
        { status: 400 }
      );
    }

    await connection.beginTransaction();

    await connection.query(
      `
      DELETE FROM education_content
      WHERE education_id = ?
      `,
      [studyId]
    );

    const [result] = await connection.query(
      `
      DELETE FROM education
      WHERE id = ?
      `,
      [studyId]
    );

    await connection.commit();

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return Response.json(
        { error: "Estudio no encontrado" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      id: studyId,
    });
  } catch (error) {
    await connection.rollback();

    console.error("Error deleting study:", error);

    return Response.json(
      { error: "Error deleting study" },
      { status: 500 }
    );
  } finally {
    connection.release();
  }
}