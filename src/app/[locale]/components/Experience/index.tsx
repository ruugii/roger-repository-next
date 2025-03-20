import { useTranslations } from "next-intl";

export default function Experience() {

  const t = useTranslations('experience');

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="experience">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>

      <ol className="relative border-s border-gray-700">
        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2025')} - {t('year.2023')}
            </b>
          </time>
          <h3 className="font-bold">
            {t('enterprice.ntt.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.ntt.position')}
            </li>
            {t.rich('enterprice.ntt.description', {
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
            })}
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
          {t('enterprice.nsign.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.nsign.position')}
            </li>
            {t.rich('enterprice.nsign.description', {
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
            })}
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
          {t('enterprice.aecc.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.aecc.position')}
            </li>
            {t.rich('enterprice.aecc.description', {
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
            })}
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
          {t('enterprice.ckm.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.ckm.position')}
            </li>
            {t.rich('enterprice.ckm.description', {
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
            })}
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
          {t('enterprice.ckm2.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.ckm2.position')}
            </li>
            {t.rich('enterprice.ckm2.description', {
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
            })}
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
          {t('enterprice.ies.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.ies.position')}
            </li>
            {t.rich('enterprice.ies.description', {
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
            })}
          </ul>
        </li>

        <li className="mb-4 ms-4">
          <div className="absolute w-3 h-3 rounded-full mt-1.5 -start-1.5 border border-gray-900 bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none ">
            <b className="font-bold">
              {t('year.2019')}
            </b>
          </time>
          <h3 className="font-bold">
          {t('enterprice.tv.title')}
          </h3>
          <ul>
            <li>
              {t('enterprice.tv.position')}
            </li>
            {t.rich('enterprice.tv.description', {
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
            })}
          </ul>
        </li>
      </ol>
    </section>
  )
}