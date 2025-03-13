"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export default function LangHeader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString(); // Convierte los parámetros en string
  const hash = typeof window !== "undefined" ? window.location.hash : ""; // Obtiene el hash de la URL

  return (
    <ul className="flex gap-4">
      <li className="text-black hover:text-gray-800 hover:underline">
        <Link href={`/es${queryString ? `?${queryString}` : ""}${hash}`} locale="es">
          ES
        </Link>
      </li>
      <li className="text-black hover:text-gray-800 hover:underline">
        <Link href={`/en${queryString ? `?${queryString}` : ""}${hash}`} locale="en">
          EN
        </Link>
      </li>
    </ul>
  );
}
