import { useTranslations } from "next-intl";
import Chat from "../ux/Chat";
import About from "./components/About";
import Experience from "./components/Experience";
import Header from "./components/Header";
import Home from "./components/Home/page";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Studies from "./components/Studies";

export default function HomePage() {
    const t = useTranslations()
  return (
    <>
      <Header />
      <div className="portfolio-page">
        <main className="portfolio-main">
          <Home />
          <About />
          <Projects />
          <Skills />
          <Studies />
          <Experience />
          <Chat
            text={t('ia.button')}
            power={t('ia.host')}
            firstMsg={t('ia.msg')}
            changeAudio={t('ia.audio')}
            changeText={t('ia.text')}
          />
        </main>
      </div>
    </>
  );
}
