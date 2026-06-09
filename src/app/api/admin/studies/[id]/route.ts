import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

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