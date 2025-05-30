import calcAge from "@/app/actins/calcAge";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function About() {

  const t = useTranslations('about')

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="about">
      <h1 className="text-4xl font-bold">
        {t('title')}
      </h1>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t('description', { age: calcAge() })}
      </p>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t('description2')}
      </p>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t('description3')}
      </p>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t.rich('description4', {
          guidelines: (chunks) => (
            <Link className=" underline hover:text-gray-700" href="https://www.linkedin.com/in/roger-barrero-sorribas/">{chunks}</Link>
          ),
          portfolio: (chunks) => (
            <Link className=" underline hover:text-gray-700" href="https://www.ruugii.com/">{chunks}</Link>
          )
        })}
      </p>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t.rich('description5', {
          email: (chunks) => (
            <Link className=" underline hover:text-gray-700" href="mailto:roger.barrero.sorribas@gmail.com">{chunks}</Link>
          )
        })}
      </p>
    </section>
  );
}