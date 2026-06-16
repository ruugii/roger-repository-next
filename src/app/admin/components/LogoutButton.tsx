"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogout = async () => {
    setIsSubmitting(true);

    await fetch("/api/auth/logout", {
      method: "POST",
    });

    router.push("/admin/login");
    router.refresh();
  };

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isSubmitting}
      className="bg-white text-black border-2 border-yellow-800 rounded-lg px-5 py-3 font-bold hover:bg-yellow-100 transition-colors disabled:opacity-60"
    >
      {isSubmitting ? "Saliendo..." : "Cerrar sesión"}
    </button>
  );
}
