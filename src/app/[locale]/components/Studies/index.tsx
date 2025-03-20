import Timeline from "@/app/ux/Timeline";
import { useTranslations } from "next-intl";

export default function Studies() {

  const t = useTranslations('studies');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="studies">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>
      <Timeline
        items={[
          {
            date: `${t('year.2024')} - ${t('year.current')}`,
            title: t('school.lasalleonline'),
            description: t('degree.DAM'),
          },
          {
            date: `${t('year.2021')} - ${t('year.2024')}`,
            title: t('school.lasallegracia'),
            description: t('degree.DAW'),
          },
          {
            date: `${t('year.2018')} - ${t('year.2021')}`,
            title: t('school.eugeni'),
            description: t('degree.SMX'),
          },
          {
            date: `${t('year.2023')}`,
            title: t('school.lucatic'),
            description: t('degree.InTalent'),
          },
          {
            date: `${t('year.2022')}`,
            title: t('school.udemy'),
            description: t('degree.Solidity'),
          },
          {
            date: `${t('year.2021')}`,
            title: t('school.CET'),
            description: t('degree.Diamizer'),
          },
          {
            date: `${t('year.2020')}`,
            title: t('school.CET'),
            description: t('degree.monitor'),
          },
          {
            date: `${t('year.2018')}`,
            title: t('school.CISCO'),
            description: t('degree.CCNA'),
          },
        ]}
      />
    </section>
  )
}