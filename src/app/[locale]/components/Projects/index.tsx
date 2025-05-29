import ProjectsItem from "@/app/ux/ProjectsItem"
import { useTranslations } from "next-intl"

export default function Projects() {

  const t = useTranslations('projects')

  const projects = [
    {
      name: 'projects1.name',
      description: 'projects1.description',
      link: "https://barcelona.lasalle.projects.ruugii.com/",
      bgImage: "/img/BCN.PNG",
      html: true,
      css: true,
      js: true,
    },
    {
      name: 'projects2.name',
      description: 'projects2.description',
      link: "https://rarity.mrcrypto.projects.ruugii.com/",
      bgImage: "/img/MrCryptorar.PNG",
      js: true,
      json: true,
      react: true,
    },
    {
      name: 'projects3.name',
      description: 'projects3.description',
      link: "https://rarity.bookers.projects.ruugii.com/",
      bgImage: "/img/bookerRar.PNG",
      js: true,
      json: true,
      nextJs: true,
      tailwind: true,
    },
    {
      name: 'projects4.name',
      description: 'projects4.description',
      link: "https://calc.math.projects.ruugii.com/",
      bgImage: "/img/calc.PNG",
      js: true,
      html: true,
      css: true,
    },
    {
      name: 'projects5.name',
      description: 'projects5.description',
      link: "https://multiply-app.math.projects.ruugii.com/",
      bgImage: "/img/mult.PNG",
      js: true,
      html: true,
      css: true,
    },
    {
      name: 'projects6.name',
      description: 'projects6.description',
      link: "https://digital-clock.projects.ruugii.com/",
      bgImage: "/img/clock.PNG",
      js: true,
      html: true,
      css: true,
    },
    {
      name: 'projects7.name',
      description: 'projects7.description',
      link: "https://charecter-count.projects.ruugii.com/",
      bgImage: "/img/Counter.PNG",
      js: true,
      html: true,
      css: true,
    },
    {
      name: 'projects8.name',
      description: 'projects8.description',
      link: "https://generator-color.random.projects.ruugii.com/",
      bgImage: "/img/rand-color.PNG",
      js: true,
      html: true,
      css: true,
    },
    {
      name: 'projects9.name',
      description: 'projects9.description',
      link: "https://time.ruugii.com/",
      bgImage: "/img/time.png",
      react: true,
      git: true
    },
    {
      name: 'projects10.name',
      description: 'projects10.description',
      link: "https://laliga.ruugii.com",
      bgImage: "/img/laliga.png",
      nextJs: true,
      tailwind: true,
      ts: true,
      git: true
    },
    {
      name: 'projects11.name',
      description: 'projects11.description',
      link: "https://currency.ruugii.com",
      bgImage: "/img/currency.png",
      nextJs: true,
      tailwind: true,
      ts: true,
      git: true
    },
    {
      name: 'projects12.name',
      description: 'projects12.description',
      link: "https://flights.ruugii.com/",
      bgImage: "/img/flights.png",
      ts: true,
      nextJs: true,
      tailwind: true,
      git: true
    },
    {
      name: 'projects13.name',
      description: 'projects13.description',
      link: "https://ckm.ruugii.com/",
      bgImage: "/img/CKM.PNG",
      ts: true,
      nextJs: true,
      tailwind: true,
      git: true
    },
  ]

  const javafx = [
    {
      name: 'javafx1.name',
      description: 'javafx1.description',
      link: "",
      bgImage: "",
      javaFX: true
    },
    {
      name: 'javafx2.name',
      description: 'javafx2.description',
      link: "",
      bgImage: "",
      javaFX: true
    }
  ]

  return (
    <>
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="projects">
        <h2 className="text-4xl font-bold">
          {t("title.web")}
        </h2>
        <ul className="flex flex-wrap gap-4 items-center justify-center">
          {projects.map((project, index) => (
            <ProjectsItem
              key={index + 1}
              link={project.link}
              name={t(project.name)}
              description={t(project.description)}
              html={project.html}
              css={project.css}
              js={project.js}
              ts={project.ts}
              json={project.json}
              react={project.react}
              nextJs={project.nextJs}
              tailwind={project.tailwind}
              git={project.git}
              bgImage={project.bgImage}
            />
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full">
        <h2 className="text-4xl font-bold">
          {t('title.javafx')}
        </h2>
        <ul className="flex flex-wrap gap-4 items-center justify-center w-full">
          {javafx.map((project, index) => (
            <ProjectsItem
              key={index + 1}
              link={project.link}
              name={t(project.name)}
              description={t(project.description)}
              javaFX={project.javaFX}
              bgImage={project.bgImage}
            />
          ))}
        </ul>
      </section>
    </>
  )
}