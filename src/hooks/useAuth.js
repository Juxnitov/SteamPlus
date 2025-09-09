"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function useAuth(rolRequerido) {
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user || (rolRequerido && user.rol !== rolRequerido)) {
      router.push("/login");
    }
  }, [rolRequerido, router]);
}
