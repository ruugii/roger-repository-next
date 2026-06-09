/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function PUT(request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const skillId = Number(id);
    const body = await request.json();

    if (Number.isNaN(skillId)) {
      return Response.json(
        { error: "ID de skill inválido" },
        { status: 400 }
      );
    }

    if (!body.name?.trim()) {
      return Response.json(
        { error: "El nombre de la skill es obligatorio" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `
      UPDATE skills
      SET
        name = ?,
        skill_type = ?,
        level = ?,
        sort_order = ?,
        is_active = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        body.name.trim(),
        body.skillType || "other",
        body.level || null,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
        skillId,
      ]
    );

    const updateResult = result as { affectedRows: number };

    if (updateResult.affectedRows === 0) {
      return Response.json(
        { error: "Skill no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      id: skillId,
    });
  } catch (error: any) {
    console.error("Error updating skill:", error);

    if (error?.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "Ya existe una skill con ese nombre" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Error updating skill" },
      { status: 500 }
    );
  }
}

export async function DELETE(_request: Request, { params }: RouteContext) {
  try {
    const { id } = await params;
    const skillId = Number(id);

    if (Number.isNaN(skillId)) {
      return Response.json(
        { error: "ID de skill inválido" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `
      DELETE FROM skills
      WHERE id = ?
      `,
      [skillId]
    );

    const deleteResult = result as { affectedRows: number };

    if (deleteResult.affectedRows === 0) {
      return Response.json(
        { error: "Skill no encontrada" },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      id: skillId,
    });
  } catch (error) {
    console.error("Error deleting skill:", error);

    return Response.json(
      { error: "Error deleting skill" },
      { status: 500 }
    );
  }
}