import { useTranslations } from "next-intl";
import Link from "next/link";

export default function OptionsHeader() {

  const t = useTranslations('menu')

  return (
    <ul className=" hidden lg:flex gap-4">
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#home">{t('home')}</Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#about">{t('about')}</Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#projects">{t('projects')}</Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#skills">{t('skills')}</Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#studies">{t('studies')}</Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link href="#experience">{t('experience')}</Link>
      </li>
    </ul>
  )
}