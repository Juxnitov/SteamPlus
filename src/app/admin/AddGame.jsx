"use client";

import { useState } from "react";

export default function AdminAddGame() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [stock, setStock] = useState("");
  const [imagen, setImagen] = useState("");
  const [activo, setActivo] = useState(true);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar campos básicos
    if (!titulo || !descripcion || !precio || !stock || !imagen) {
      setMensaje("Por favor completa todos los campos");
      return;
    }

    try {
      const response = await fetch("/api/juegos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          titulo,
          descripcion,
          precio: parseFloat(precio),
          stock: parseInt(stock),
          activo,
          creado_en: new Date().toISOString(),
          imagen
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMensaje(`Juego "${data.titulo}" agregado correctamente`);
        // Limpiar formulario
        setTitulo("");
        setDescripcion("");
        setPrecio("");
        setStock("");
        setImagen("");
        setActivo(true);
      } else {
        setMensaje(`Error: ${data.error}`);
      }
    } catch (error) {
      setMensaje(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-white mb-4">Agregar Juego</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <input
          type="text"
          placeholder="URL de Imagen"
          value={imagen}
          onChange={(e) => setImagen(e.target.value)}
          className="p-2 rounded bg-gray-700 text-white"
        />
        <label className="text-white">
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            className="mr-2"
          />
          Activo
        </label>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar Juego
        </button>
      </form>
      {mensaje && <p className="mt-4 text-white">{mensaje}</p>}
    </div>
  );
}
