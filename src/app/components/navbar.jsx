"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    const handleUserChange = () => {
      const updatedUser = localStorage.getItem("user");
      setUser(updatedUser ? JSON.parse(updatedUser) : null);
    };

    window.addEventListener("userChanged", handleUserChange);
    return () => window.removeEventListener("userChanged", handleUserChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <h1 className="font-bold text-xl cursor-pointer" onClick={() => router.push("/")}>
        Steam+
      </h1>

      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.nombre}</span>

            {user.rol === "cliente" && (
              <button
                onClick={() => router.push("/cliente")}
                className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded"
              >
                Mi Panel
              </button>
            )}

            {user.rol === "empleado" && (
              <button
                onClick={() => router.push("/empleado")}
                className="bg-green-600 hover:bg-green-700 px-2 py-1 rounded"
              >
                Panel Empleado
              </button>
            )}

            {user.rol === "administrador" && (
              <button
                onClick={() => router.push("/admin")}
                className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded"
              >
                Panel Admin
              </button>
            )}

            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded"
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <button onClick={() => router.push("/login")} className="hover:underline">
              Iniciar Sesión
            </button>
            <button onClick={() => router.push("/register")} className="hover:underline">
              Registrarse
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
