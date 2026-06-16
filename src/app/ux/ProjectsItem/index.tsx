
import Link from "next/link";

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
  expo?: boolean
  bgImage?: string;
}

export default function ProjectsItem(props: ProjectInteface) {

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
    expo,
    bgImage
  } = props;
  const technologies = [
    { enabled: html, label: "HTML" },
    { enabled: css, label: "CSS" },
    { enabled: js, label: "JS" },
    { enabled: ts, label: "TS" },
    { enabled: json, label: "JSON" },
    { enabled: react, label: "React" },
    { enabled: nextJs, label: "Next.js" },
    { enabled: tailwind, label: "Tailwind" },
    { enabled: java, label: "Java" },
    { enabled: javaFX, label: "JavaFX" },
    { enabled: git, label: "Git" },
    { enabled: expo, label: "Expo" },
  ].filter((technology) => technology.enabled);
  const backgroundStyle = bgImage
    ? {
      backgroundImage: `url(${bgImage})`,
    }
    : undefined;

  return (
    <li className="project-card" style={backgroundStyle}>
      <Link
        href={link || "#projects"}
        className="project-card__link"
        aria-label={name}
      >
        <div className="project-card__title-layer">
          <h3 className="project-card__title font-bold">{name}</h3>
        </div>

        <div className="project-card__details">
          <p className="project-card__description">{description}</p>

          {technologies.length > 0 ? (
            <div className="project-card__tags">
              {technologies.map((technology) => (
                <span key={technology.label} className="project-card__tag">
                  {technology.label}
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </Link>
    </li>
  )
}
