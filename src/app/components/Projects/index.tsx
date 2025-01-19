'use client'

import { useState } from "react"

export default function Projects() {

  const [projects] = useState([
    {
      name: "Ciudad de Barcelona",
      description: "This project was doed for a project of the hight School, it's a web that gives you some information of the city of Barcelona and cities of near of the city",
      link: "",
      bgImage: "",
      html: true,
      css: true,
      js: true,
    },
    {
      name: "Mr.Crypto rarity calculator tool",
      description: "This project is maked in react, it's maked for a NFT project named Mr.Crypto, it gives you information about the rarity of your NFT",
      link: "",
      bgImage: "",
      js: true,
      json: true,
      react: true,
    },
    {
      name: "Bookers rarity calculator tool",
      description: "This project is maked in react, it's maked for a NFT project named Bookers, it gives you information about the rarity of your NFT",
      link: "",
      bgImage: "",
      js: true,
      json: true,
      nextJs: true,
      tailwind: true,
    },
    {
      name: "Calculator",
      description: "It's a calculator that you can use to do some basic math operations",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "multiply app",
      description: "It's an APP, that give you some Multipltications and you have to solve them",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "Digital Clock",
      description: "It's a digital clock that you can use to know the time",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "Real time character count",
      description: "It's a character counter that you can use to know the number of characters you have typed",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "Random color generator",
      description: "It's a random color generator app that give you some random colors",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    }
  ])

  return (
    <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="projects">
      <h2 className="text-4xl font-bold">
        Web projects
      </h2>
      <ul className="flex flex-wrap gap-4 items-center justify-center">
        {projects.map((project, index) => (
          <li className=" bg-yellow-800 min-h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg px-4" key={index + 1}>
            <h3 className="text-2xl font-bold">
              {project.name}
            </h3>
            <p className="text-xl">
              {project.description}
            </p>
            <div className=" w-full flex-row justify-between flex">
              {project.html && <a href={project.link}>HTML</a>}
              {project.css && <a href={project.link}>CSS</a>}
              {project.js && <a href={project.link}>JS</a>}
              {project.json && <a href={project.link}>JSON</a>}
              {project.react && <a href={project.link}>React</a>}
              {project.nextJs && <a href={project.link}>Next.js</a>}
              {project.tailwind && <a href={project.link}>Tailwind</a>}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}