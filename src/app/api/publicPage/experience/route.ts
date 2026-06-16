import { db } from "@/lib/db";

type LanguageCode = "es" | "cat" | "en";

type ExperiencePublicRow = {
  id: number;
  slug: string;
  company_name: string;
  start_date: string | null;
  end_date: string | null;
  is_current: number;
  location: string | null;
  modality: string;
  sort_order: number;
};

type ExperienceContentRow = {
  experience_id: number;
  language_code: LanguageCode;
  position_title: string;
  description: string | null;
};

type LocalizedExperienceContent = {
  positionTitle: string;
  description: string;
};

function dateForInput(value: string | null) {
  if (!value) return "";
  return new Date(value).toISOString().split("T")[0];
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
        sort_order
      FROM experience
      WHERE is_active = 1
      ORDER BY sort_order ASC, id ASC
    `);

    const [contentRows] = await db.query(`
      SELECT
        experience_id,
        language_code,
        position_title,
        description
      FROM experience_content
    `);

    const experiences = experienceRows as ExperiencePublicRow[];
    const contents = contentRows as ExperienceContentRow[];

    const contentByExperienceId = new Map<
      number,
      Partial<Record<LanguageCode, LocalizedExperienceContent>>
    >();

    for (const content of contents) {
      const current = contentByExperienceId.get(content.experience_id) ?? {};

      current[content.language_code] = {
        positionTitle: content.position_title ?? "",
        description: content.description ?? "",
      };

      contentByExperienceId.set(content.experience_id, current);
    }

    const publicExperiences = experiences.map((experience) => {
      const content = contentByExperienceId.get(experience.id) ?? {};

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

        content: {
          es: {
            positionTitle: content.es?.positionTitle ?? "",
            description: content.es?.description ?? "",
          },
          cat: {
            positionTitle: content.cat?.positionTitle ?? "",
            description: content.cat?.description ?? "",
          },
          en: {
            positionTitle: content.en?.positionTitle ?? "",
            description: content.en?.description ?? "",
          },
        },
      };
    });

    return Response.json(publicExperiences);
  } catch (error) {
    console.error("Error getting public experience:", error);

    return Response.json(
      { error: "Error getting public experience" },
      { status: 500 },
    );
  }
}