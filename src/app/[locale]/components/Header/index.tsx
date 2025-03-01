import LangHeader from "./LangHeader";
import OptionsHeader from "./OptinsHeader";

export default function Header() {

  return (
    <header className=" fixed top-0 left-0 w-full bg-slate-50 text-black z-10 justify-between items-center py-4 px-20 gap-16 hidden lg:flex">
      <OptionsHeader />
      <LangHeader />
    </header>
  )
}