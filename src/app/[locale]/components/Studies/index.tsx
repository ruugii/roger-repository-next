import { useTranslations } from "next-intl";

export default function Studies() {

  const t = useTranslations('studies');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="studies">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>
      <ol className="relative border-s border-gray-700">
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2024')} - {t('year.current')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.lasalleonline')}
          </h3>
          <ul>
            <li>
              {t('degree.DAM')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2021')} - {t('year.2024')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.lasallegracia')}
          </h3>
          <ul>
            <li>
              {t('degree.DAW')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2018')} - {t('year.2021')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.eugeni')}
          </h3>
          <ul>
            <li>
              {t('degree.SMX')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2023')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.lucatic')}
          </h3>
          <ul>
            <li>
              {t('degree.InTalent')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2022')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.udemy')}
          </h3>
          <ul>
            <li>
              {t('degree.Solidity')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2021')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.CET')}
          </h3>
          <ul>
            <li>
              {t('degree.Diamizer')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2020')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.CET')}
          </h3>
          <ul>
            <li>
              {t('degree.monitor')}
            </li>
          </ul>
        </li>
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2018')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('school.CISCO')}
          </h3>
          <ul>
            <li>
              {t('degree.CCNA')}
            </li>
          </ul>
        </li>
      </ol>
    </section>
  )
}