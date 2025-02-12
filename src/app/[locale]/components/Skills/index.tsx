import { useTranslations } from "next-intl"

export default function Skills() {

  const t = useTranslations('skills')

  const skills = [
    {
      name: "HTML",
    },
    {
      name: "CSS",
    },
    {
      name: "JavaScript",
    },
    {
      name: "PHP",
    },
    {
      name: "Node.js",
    },
    {
      name: "Laravel",
    },
    {
      name: "React",
    },
    {
      name: "Java",
    },
    {
      name: "JavaFX",
    },
    {
      name: "Kotlin",
    },
    {
      name: "MySQL",
    },
    {
      name: "Wordpress",
    },
    {
      name: "Moodle",
    },
    {
      name: "Shopify",
    }
  ]

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="skills">
      <h2 className="text-4xl font-bold">
        {t('title')}
      </h2>
      <ul className="flex flex-wrap gap-4 items-center justify-center">
        {skills.map((project, index) => (
          <li className=" bg-yellow-800 h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg px-4 py-2" key={index + 1}>
            <h3 className="text-2xl font-bold">
              {project.name}
            </h3>
          </li>
        ))}
      </ul>
    </section>
  )
}