'use client'

import Link from "next/link"
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
    },
    {
      name: "Time in your location",
      description: "It's a app that give you the time in your location",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "La Liga results and next matches",
      description: "It's a app that give you the results of the La Liga and the next matches",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "Change the currency",
      description: "It's a app that change the currency of the world",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
    {
      name: "Flights with arrival in Barcelona",
      description: "It's a app that give you the flights with arrival in Barcelona",
      link: "",
      bgImage: "",
      js: true,
      html: true,
      css: true,
    },
  ])

  const [javafx] = useState([
    {
      name: "DataBase lector (Alpha)",
      description: "This project was doed for a project of the hight School, it's a software that helps to give information of the DataBases in your LocalHost server",
      link: "",
      bgImage: "",
      java: true,
    },
    {
      name: "Seven and a half",
      description: "This project was doed for a project of the hight School, it's the card game of the seven and a half",
      link: "",
      bgImage: "",
      java: true,
    },

  ])

  return (
    <>
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black" id="projects">
        <h2 className="text-4xl font-bold">
          Web projects
        </h2>
        <ul className="flex flex-wrap gap-4 items-center justify-center">
          {projects.map((project, index) => (
            <Link href={project.link}  key={index + 1}>
              <li className=" bg-yellow-800 min-h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg px-4 py-2">
                <h3 className="text-2xl font-bold">
                  {project.name}
                </h3>
                <p className="text-xl">
                  {project.description}
                </p>
                <div className=" w-full flex-row justify-between flex">
                  {project.html && <p>HTML</p>}
                  {project.css && <p>CSS</p>}
                  {project.js && <p>JS</p>}
                  {project.json && <p>JSON</p>}
                  {project.react && <p>React</p>}
                  {project.nextJs && <p>Next.js</p>}
                  {project.tailwind && <p>Tailwind</p>}
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </section>
      <section className="flex flex-col gap-8 row-start-2 items-center sm:items-start bg-white rounded-lg p-8 text-black w-full">
        <h2 className="text-4xl font-bold">
          JavaFX projects
        </h2>
        <ul className="flex flex-wrap gap-4 items-center justify-center w-full">
          {javafx.map((project, index) => (
            <li className=" bg-yellow-800 min-h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg px-4 py-2" key={index + 1}>
              <h3 className="text-2xl font-bold">
                {project.name}
              </h3>
              <p className="text-xl">
                {project.description}
              </p>
              <div className=" w-full flex-row justify-between flex">
                {project.java && <a href={project.link}>JAVA</a>}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}