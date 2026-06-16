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