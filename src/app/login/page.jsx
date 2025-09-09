"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const { usuario_id, nombre, email, rol } = await res.json();

      // ✅ Guarda con usuario_id
      localStorage.setItem("user", JSON.stringify({
        usuario_id,
        nombre,
        email,
        rol
      }));

      window.dispatchEvent(new Event("userChanged"));
      router.push("/juegos");
    } else {
      alert("Error al iniciar sesión");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Steam+</h1>
      <div className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-lg w-80">
        <input
          className="mb-4 p-2 rounded text-black"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="mb-4 p-2 rounded text-black"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={login}
          className="bg-green-600 hover:bg-green-700 p-2 rounded text-white font-bold"
        >
          Iniciar sesión
        </button>
      </div>
    </div>
  );
}
