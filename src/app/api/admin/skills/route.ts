/* eslint-disable @typescript-eslint/no-explicit-any */
import { db } from "@/lib/db";

type SkillRow = {
  id: number;
  name: string;
  skill_type: string;
  level: string | null;
  sort_order: number;
  is_active: number;
};

function mapSkill(row: SkillRow) {
  return {
    id: row.id,
    name: row.name,
    skillType: row.skill_type,
    level: row.level ?? "",
    sortOrder: row.sort_order,
    isActive: Boolean(row.is_active),
  };
}

export async function GET() {
  try {
    const [rows] = await db.query(`
      SELECT
        id,
        name,
        skill_type,
        level,
        sort_order,
        is_active
      FROM skills
      ORDER BY sort_order ASC, name ASC
    `);

    const skills = (rows as SkillRow[]).map(mapSkill);

    return Response.json(skills);
  } catch (error) {
    console.error("Error getting skills:", error);

    return Response.json(
      { error: "Error getting skills" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name?.trim()) {
      return Response.json(
        { error: "El nombre de la skill es obligatorio" },
        { status: 400 }
      );
    }

    const [result] = await db.query(
      `
      INSERT INTO skills (
        name,
        skill_type,
        level,
        sort_order,
        is_active
      )
      VALUES (?, ?, ?, ?, ?)
      `,
      [
        body.name.trim(),
        body.skillType || "other",
        body.level || null,
        Number(body.sortOrder) || 0,
        body.isActive ? 1 : 0,
      ]
    );

    const insertResult = result as { insertId: number };

    return Response.json(
      {
        success: true,
        id: insertResult.insertId,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating skill:", error);

    if (error?.code === "ER_DUP_ENTRY") {
      return Response.json(
        { error: "Ya existe una skill con ese nombre" },
        { status: 409 }
      );
    }

    return Response.json(
      { error: "Error creating skill" },
      { status: 500 }
    );
  }
}