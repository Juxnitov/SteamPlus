"use client";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import PanelEmpleado from "../empleado/PanelEmpleado";

export default function AdminPage() {
  useAuth("administrador"); // protege la ruta
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [imagen, setImagen] = useState("");

  const agregarJuego = async () => {
    try {
      const res = await fetch("/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, precio, imagen }),
      });
      if (!res.ok) throw new Error("Error al agregar juego");
      alert("Juego agregado con éxito");
      setTitulo("");
      setPrecio("");
      setImagen("");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold mb-6">Panel Administrador</h1>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold">Agregar Nuevo Juego</h2>
          <input
            placeholder="Título"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="p-2 rounded text-black bg-gray-200"
          />
          <input
            placeholder="Precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="p-2 rounded text-black bg-gray-200"
            type="number"
          />
          <input
            placeholder="URL Imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="p-2 rounded text-black bg-gray-200"
          />
          <button
            onClick={agregarJuego}
            className="bg-blue-600 hover:bg-blue-700 p-2 rounded text-white font-bold"
          >
            Agregar Juego
          </button>
        </div>
      </div>
      <div>
        <PanelEmpleado />
      </div>
    </div>
  );
}
