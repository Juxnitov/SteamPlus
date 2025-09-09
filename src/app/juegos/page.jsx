"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function JuegosPage() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetch("/api/juegos");
        const data = await res.json();
        setGames(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGames();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Tienda de Juegos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {games.map((game) => (
          <div key={game.juego_id} className="p-4 border rounded bg-gray-800 text-white">
            <img src={game.imagen} alt={game.titulo} className="mb-2 w-full h-48 object-cover rounded"/>
            <h2 className="font-bold">{game.titulo}</h2>
            <p>{game.descripcion}</p>
            <p>Precio: ${Number(game.precio).toFixed(2)}</p>
            <button
              onClick={() => router.push(`/juegos/${game.juego_id}`)}
              className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded mt-2"
            >
              Ver Juego
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
