import Timeline from "@/app/ux/Timeline";
import { useTranslations } from "next-intl";

export default function Experience() {

  const t = useTranslations('experience');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="experience">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>

      <Timeline
        items={[
          {
            date: `${t('year.2025')} - ${t('year.2023')}`,
            title: t('enterprice.ntt.title'),
            description: t.rich('enterprice.ntt.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
          {
            date: `${t('year.2023')}`,
            title: t('enterprice.nsign.title'),
            description: t.rich('enterprice.nsign.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
          {
            date: `${t('year.2022')}`,
            title: t('enterprice.aecc.title'),
            description: t.rich('enterprice.aecc.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
          {
            date: `${t('year.2022')}`,
            title: t('enterprice.ckm.title'),
            description: t.rich('enterprice.ckm.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
          {
            date: `${t('year.2020')}`,
            title: t('enterprice.ckm2.title'),
            description: t.rich('enterprice.ckm2.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
          {
            date: `${t('year.2020')}`,
            title: t('enterprice.ies.title'),
            description: t.rich('enterprice.ies.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            })
          },
          {
            date: `${t('year.2019')}`,
            title: t('enterprice.tv.title'),
            description: t.rich('enterprice.ntt.description', {
              ul: (chunks) => (
                <ul>
                  {chunks}
                </ul>
              ),
              li: (chunks) => (
                <li>
                  {chunks}
                </li>
              )
            }),
          },
        ]}
      />
    </section>
  )
}