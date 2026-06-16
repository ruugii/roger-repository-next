import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OptionsHeader() {

  const t = useTranslations('menu')

  return (
    <ul className="site-nav">
      <li>
        <Link href="/#home">{t('home')}</Link>
      </li>
      <li>
        <Link href="/#about">{t('about')}</Link>
      </li>
      <li>
        <Link href="/#projects">{t('projects')}</Link>
      </li>
      <li>
        <Link href="/#skills">{t('skills')}</Link>
      </li>
      <li>
        <Link href="/#studies">{t('studies')}</Link>
      </li>
      <li>
        <Link href="/#experience">{t('experience')}</Link>
      </li>
    </ul>
  )
}
