import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations('home')

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full" id="home">
      <h1 className="text-4xl font-bold">
        {t('welcome')}
      </h1>
      <p className="text-2xl" style={{ overflowWrap: 'break-word', wordBreak: 'break-word' }}>
        {t('description')}
      </p>
    </section>
  );
}