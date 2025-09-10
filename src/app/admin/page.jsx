"use client";
import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import PanelEmpleado from "../empleado/PanelEmpleado";

export default function AdminPage() {
  useAuth("administrador"); // protege la ruta
  const [nuevoJuego, setNuevoJuego] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
  });

  const agregarJuego = async () => {
    try {
      const res = await fetch("/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoJuego),
      });
      if (!res.ok) throw new Error("Error al agregar juego");
      alert("Juego agregado con éxito");
      setNuevoJuego({
        titulo: "",
        descripcion: "",
        precio: "",
        stock: "",
        imagen: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoJuego((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col gap-10">
      <div>
        <h1 className="text-4xl font-bold mb-6">Panel Administrador</h1>
        <div className="flex flex-col gap-4 w-full max-w-md">
          <h2 className="text-2xl font-semibold">Agregar Nuevo Juego</h2>
          <input
            name="titulo"
            placeholder="Título"
            value={nuevoJuego.titulo}
            onChange={handleInputChange}
            className="p-2 rounded text-black bg-gray-200"
          />
          <textarea
            name="descripcion"
            placeholder="Descripción"
            value={nuevoJuego.descripcion}
            onChange={handleInputChange}
            className="p-2 rounded text-black bg-gray-200 h-24"
          />
          <input
            name="precio"
            placeholder="Precio"
            value={nuevoJuego.precio}
            onChange={handleInputChange}
            className="p-2 rounded text-black bg-gray-200"
            type="number"
          />
          <input
            name="stock"
            placeholder="Stock"
            value={nuevoJuego.stock}
            onChange={handleInputChange}
            className="p-2 rounded text-black bg-gray-200"
            type="number"
          />
          <input
            name="imagen"
            placeholder="URL Imagen"
            value={nuevoJuego.imagen}
            onChange={handleInputChange}
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
