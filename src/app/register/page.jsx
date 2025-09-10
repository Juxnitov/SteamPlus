"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    // Validación de campos vacíos
    if (!nombre || !email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setError(""); // Limpiar errores previos

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password }),
    });

    if (res.ok) {
      localStorage.setItem("user", JSON.stringify({ nombre, email, rol: "cliente" }));
      window.dispatchEvent(new Event("userChanged"));
      router.push("/juegos");
    } else {
      const data = await res.json();
      setError(data.error || "Error al registrarse. Inténtalo de nuevo.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Steam+</h1>
      <div className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <input
          className="mb-4 p-2 rounded text-black"
          type="text"
          placeholder="Nombre"
          value={nombre}
          required
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="mb-4 p-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 p-2 rounded text-black"
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && (
          <p className="text-red-400 text-sm mb-4 text-center">{error}</p>
        )}
        <button onClick={register} className="bg-green-600 hover:bg-green-700 p-2 rounded text-white font-bold">
          Registrarse
        </button>
        <p className="mt-4 text-center text-gray-300">
          ¿Ya tienes cuenta?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => router.push("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
