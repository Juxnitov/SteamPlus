"use client";

import { useEffect, useState } from "react";

export default function PanelCliente() {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [usuarioId, setUsuarioId] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user?.usuario_id) {
        setUsuarioId(user.usuario_id); // ✅ usa usuario_id
      }
    }
  }, []);

  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const res = await fetch(`/api/pedidos/user/${usuarioId}`);
        const data = await res.json();
        setPedidos(data);
      } catch (error) {
        console.error("Error al cargar pedidos:", error);
      } finally {
        setLoading(false);
      }
    };
    if (usuarioId) fetchPedidos();
  }, [usuarioId]);

  if (loading) return <p className="p-4">Cargando tus pedidos...</p>;
  if (pedidos.length === 0) return <p className="p-4">No has realizado ningún pedido.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {pedidos.map((pedido) => (
          <div key={pedido.pedido_id} className="p-4 border rounded bg-gray-800 text-white">
            <h2 className="font-bold">{pedido.titulo}</h2>
            <p>{pedido.descripcion}</p>
            <p>Cantidad: {pedido.cantidad}</p>
            <p>Total: ${Number(pedido.total).toFixed(2)}</p>
            <p>Estado: {pedido.estado}</p>
            {pedido.codigo_entrega && <p>Key de entrega: {pedido.codigo_entrega}</p>}
            <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
