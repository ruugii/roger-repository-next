import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OptionsHeader() {

  const t = useTranslations('menu')

  return (
    <ul className="site-nav">
      <li>
        <Link href="/cat#home">{t('home')}</Link>
      </li>
      <li>
        <Link href="/cat#about">{t('about')}</Link>
      </li>
      <li>
        <Link href="/cat#projects">{t('projects')}</Link>
      </li>
      <li>
        <Link href="/cat#skills">{t('skills')}</Link>
      </li>
      <li>
        <Link href="/cat#studies">{t('studies')}</Link>
      </li>
      <li>
        <Link href="/cat#experience">{t('experience')}</Link>
      </li>
    </ul>
  )
}
