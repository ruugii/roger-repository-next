import Link from "next/link";

export default function Header() {
  return (
    <header className=" fixed top-0 left-0 w-full bg-slate-50 text-black px-2 py-4 z-10">
      <ul className="flex gap-4">
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#home">Home</Link>
        </li>
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#about">About me</Link>
        </li>
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#projects">Projects</Link>
        </li>
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#skills">Skills</Link>
        </li>
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#studies">Studies</Link>
        </li>
        <li className=" text-black hover:text-gray-800 hover:underline">
          <Link href="#experience">Experience</Link>
        </li>
      </ul>
    </header>
  )
}