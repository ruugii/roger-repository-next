import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OptionsHeader() {

  const t = useTranslations('menu')

  return (
    <ul className="site-nav">
      <li>
        <Link href="/en#home">{t('home')}</Link>
      </li>
      <li>
        <Link href="/en#about">{t('about')}</Link>
      </li>
      <li>
        <Link href="/en#projects">{t('projects')}</Link>
      </li>
      <li>
        <Link href="/en#skills">{t('skills')}</Link>
      </li>
      <li>
        <Link href="/en#studies">{t('studies')}</Link>
      </li>
      <li>
        <Link href="/en#experience">{t('experience')}</Link>
      </li>
    </ul>
  )
}
