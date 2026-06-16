import LangHeader from "./LangHeader";
import OptionsHeader from "./OptinsHeader";

export default function Header() {

  return (
    <header className="site-header">
      <OptionsHeader />
      <LangHeader />
    </header>
  )
}
