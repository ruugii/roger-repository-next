import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OptionsHeader() {

  const t = useTranslations('menu')

  return (
    <ul className="site-nav">
      <li>
        <Link href="/es#home">{t('home')}</Link>
      </li>
      <li>
        <Link href="/es#about">{t('about')}</Link>
      </li>
      <li>
        <Link href="/es#projects">{t('projects')}</Link>
      </li>
      <li>
        <Link href="/es#skills">{t('skills')}</Link>
      </li>
      <li>
        <Link href="/es#studies">{t('studies')}</Link>
      </li>
      <li>
        <Link href="/es#experience">{t('experience')}</Link>
      </li>
    </ul>
  )
}
