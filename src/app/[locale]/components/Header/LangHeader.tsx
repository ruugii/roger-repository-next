import Link from "next/link";

export default function LangHeader() {
  return (
    <ul className="flex gap-4">
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link
          href="/es"
          locale="es"
        >
          ES
        </Link>
      </li>
      <li className=" text-black hover:text-gray-800 hover:underline">
        <Link
          href="/en"
          locale="en"
        >
          EN</Link>
      </li>
    </ul>
  )
}