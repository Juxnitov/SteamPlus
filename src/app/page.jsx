"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) router.replace("/juegos");
    else router.replace("/login");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
      <p className="text-xl">Cargando...</p>
    </div>
  );
}
