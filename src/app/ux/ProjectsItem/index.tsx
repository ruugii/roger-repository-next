'use client'

import Link from "next/link";
import { useState } from "react";

interface ProjectInteface {
  link: string;
  name: string;
  description: string;
  html?: boolean;
  css?: boolean;
  js?: boolean;
  ts?: boolean;
  json?: boolean;
  react?: boolean;
  nextJs?: boolean;
  tailwind?: boolean;
  java?: boolean;
  javaFX?: boolean;
  git?: boolean;
  bgImage?: string;
}

export default function ProjectsItem(props: ProjectInteface) {

  const [hover, setHover] = useState(false);

  const {
    link,
    name,
    description,
    html,
    css,
    js,
    ts,
    json,
    react,
    nextJs,
    tailwind,
    java,
    javaFX,
    git,
    bgImage
  } = props;
  return (
    <Link href={link}>
      <li
        className="bg-yellow-800 min-h-64 w-64 flex flex-col justify-center items-center mx-auto rounded-lg"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <div className=" bg-white/40 px-4 py-2 h-full min-h-64 w-64 flex flex-col items-center mx-auto rounded-lg justify-center">
          {hover ? (
            <div className=" gap-2">
              <p className="text-sm">
                {description}
              </p>
              <div className=" w-full flex-row justify-between flex font-bold">
                {html && <p>HTML</p>}
                {css && <p>CSS</p>}
                {js && <p>JS</p>}
                {ts && <p>TS</p>}
                {json && <p>JSON</p>}
                {react && <p>React</p>}
                {nextJs && <p>Next.js</p>}
                {tailwind && <p>Tailwind</p>}
                {java && <p>Java</p>}
                {javaFX && <p>JavaFX</p>}
                {git && <p>Git</p>}
              </div>
            </div>
          ) : (
            <h3 className="text-2xl font-bold">
              {name}
            </h3>
          )}
        </div>
      </li>
    </Link>
  )
}