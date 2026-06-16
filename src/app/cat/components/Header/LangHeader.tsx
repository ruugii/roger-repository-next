"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function LangHeader() {
  const searchParams = useSearchParams();
  const queryString = searchParams.toString(); // Convierte los parámetros en string
  const hash = typeof window !== "undefined" ? window.location.hash : ""; // Obtiene el hash de la URL

  return (
    <ul className="site-language-nav">
      <li>
        <Link
          href={`/es${queryString ? `?${queryString}` : ""}${hash}`}
          locale="es"
        >
          ES
        </Link>
      </li>
      <li>
        <Link
          href={`/cat${queryString ? `?${queryString}` : ""}${hash}`}
          locale="cat"
        >
          CAT
        </Link>
      </li>
      <li>
        <Link
          href={`/en${queryString ? `?${queryString}` : ""}${hash}`}
          locale="en"
        >
          EN
        </Link>
      </li>
    </ul>
  );
}
