"use client";
import { useEffect, useState } from "react";

export default function PanelEmpleado() {
  const [pedidos, setPedidos] = useState([]);

  const fetchPedidos = async () => {
    try {
      const res = await fetch("/api/pedidos");
      const data = await res.json();
      setPedidos(data);
    } catch (error) {
      console.error("Error al cargar pedidos:", error);
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, []);

  const actualizarEstado = async (pedidoId, estado) => {
    try {
      const res = await fetch(`/api/pedidos/${pedidoId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      const data = await res.json();
      setPedidos((prev) =>
        prev.map((p) => (p.pedido_id === pedidoId ? data : p))
      );
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Pedidos Pendientes</h1>
      {pedidos.length === 0 ? (
        <p>No hay pedidos.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pedidos.map((pedido) => (
            <div key={pedido.pedido_id} className="p-4 border rounded bg-gray-700 text-white">
              <h2 className="font-bold">{pedido.titulo}</h2>
              <p>{pedido.descripcion}</p>
              <p className="text-sm text-gray-400">
                Cliente: {pedido.cliente} (ID: {pedido.usuario_id})
              </p>
              <p className="text-sm text-gray-400">
                Email: {pedido.email}
              </p>
              <p>Cantidad: {pedido.cantidad}</p>
              <p>Total: ${Number(pedido.total).toFixed(2)}</p>
              <p>Estado: {pedido.estado}</p>
              <p>Fecha: {new Date(pedido.fecha).toLocaleString()}</p>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-green-600 px-2 py-1 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                  onClick={() => actualizarEstado(pedido.pedido_id, "entregado")}
                  disabled={
                    pedido.estado === "entregado" ||
                    pedido.estado === "cancelado"
                  }
                >
                  Entregado
                </button>
                <button
                  className="bg-red-600 px-2 py-1 rounded disabled:bg-gray-500 disabled:cursor-not-allowed"
                  onClick={() => actualizarEstado(pedido.pedido_id, "cancelado")}
                  disabled={
                    pedido.estado === "entregado" ||
                    pedido.estado === "cancelado"
                  }
                >
                  Cancelar
                </button>
              </div>
              {pedido.codigo_entrega && (
                <p className="mt-1">Key: {pedido.codigo_entrega}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
