"use client";
import { use, useEffect, useState } from "react";

export default function JuegoPage({ params }) {
  const { juego_id } = use(params); // ✅ en Next.js 15
  const [game, setGame] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Recuperar usuario guardado en localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    // Cargar datos del juego
    fetch(`/api/juegos/${juego_id}`)
      .then((res) => res.json())
      .then(setGame)
      .catch((err) => console.error("❌ Error cargando juego:", err));
  }, [juego_id]);

    const comprar = async () => {
    try {
        if (!user) {
        alert("Debes iniciar sesión para comprar");
        return;
        }

        const payload = {
        usuario_id: user.usuario_id, // ✅ ahora siempre existe
        juego_id,
        cantidad: 1,
        total: game.precio, // Añadir el total al payload
        };

        console.log("📦 Datos que envío al backend:", payload);

        const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(await res.text());
        alert("Compra realizada con éxito 🎉");
    } catch (err) {
        console.error("❌ Error al comprar:", err);
        alert("Error al comprar: " + err.message);
    }
    };

    if (!game) {
        return <p className="text-center text-gray-400">Cargando juego...</p>;
    }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white flex justify-center items-start py-10 px-4">
      <div className="w-full max-w-4xl bg-gray-850 rounded-xl shadow-lg shadow-black/60 overflow-hidden">
        {/* Imagen del juego */}
        <div className="w-full h-72 md:h-96 bg-black">
          <img
            src={game.imagen || "https://via.placeholder.com/800x400?text=Juego"}
            alt={game.nombre}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Detalles */}
        <div className="p-6">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">{game.nombre}</h1>
          <p className="text-gray-300 text-lg mb-4">{game.descripcion}</p>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-2xl font-semibold text-green-400 mb-1">
                ${game.precio}
              </p>
              <p className="text-sm text-gray-400">
                Stock disponible: {game.stock}
              </p>
            </div>

            <button
              onClick={comprar}
              className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-lg shadow-md shadow-green-900/50 transition duration-200"
            >
              Comprar ahora 🛒
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
