// src/app/api/pedidos/user/[usuario_id]/route.js
import { NextResponse } from "next/server";
import pool from "../../../../lib/db.js"; // ✅ corregido

export async function GET(req, { params }) {
  try {
    const { usuario_id } = params;

    if (!usuario_id) {
      return NextResponse.json({ error: "Falta usuario_id" }, { status: 400 });
    }

    const result = await pool.query(
      `
      SELECT p.pedido_id, p.cantidad, p.total, p.estado, p.codigo_entrega, p.fecha,
             j.titulo, j.descripcion
      FROM pedidos p
      JOIN juegos j ON p.juego_id = j.juego_id
      WHERE p.usuario_id = $1
      ORDER BY p.fecha DESC
      `,
      [usuario_id]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("❌ Error en GET /api/pedidos/user/[usuario_id]:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
