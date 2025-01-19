import About from "./components/About";
import Home from "./components/Home/page";
// import Projects from "./components/Projects";

export default function HomePage() {
  return (
    <div className=" min-h-screen grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-yellow-500">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Home />
        <About />
        {/* <Projects /> */}
      </main>
    </div>
  );
}
