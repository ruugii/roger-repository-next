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
      <div className=" min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-yellow-500">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
