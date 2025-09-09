// src/app/api/pedidos/[pedido_id]/status/route.js
import { NextResponse } from "next/server";
import pool from "../../../../lib/db.js";

function generarKey() {
  // genera una key estilo AAAA-BBBB-CCCC-DDDD
  return Array(4)
    .fill(0)
    .map(() => Math.random().toString(36).substring(2, 6).toUpperCase())
    .join("-");
}

export async function PATCH(req, { params }) {
  try {
    const { pedido_id } = params;
    const { estado } = await req.json();

    if (!estado) {
      return NextResponse.json({ error: "Falta estado" }, { status: 400 });
    }

    let updateQuery = `UPDATE pedidos SET estado = $1 WHERE pedido_id = $2 RETURNING *`;
    let queryParams = [estado, pedido_id];

    if (estado.toLowerCase() === "entregado") {
      const key = generarKey();
      updateQuery = `UPDATE pedidos SET estado = $1, codigo_entrega = $2 WHERE pedido_id = $3 RETURNING *`;
      queryParams = [estado, key, pedido_id];
    }

    const result = await pool.query(
      `WITH updated AS (
        ${updateQuery}
       )
       SELECT p.pedido_id, p.usuario_id, u.nombre as cliente, 
              j.titulo, j.descripcion, p.cantidad, p.total, p.estado, p.fecha, p.codigo_entrega
       FROM updated p
       JOIN usuarios u ON p.usuario_id = u.usuario_id
       JOIN juegos j ON p.juego_id = j.juego_id`,
      queryParams
    );

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Pedido no encontrado" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al actualizar pedido:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
