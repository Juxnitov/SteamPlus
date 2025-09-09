// src/app/api/pedidos/route.js
import { NextResponse } from "next/server";
import pool from "../../lib/db.js";

// Obtener todos los pedidos (para empleados)
export async function GET() {
  try {
    const result = await pool.query(
      `SELECT p.pedido_id, p.usuario_id, u.nombre as cliente, u.email,
              j.titulo, j.descripcion, p.cantidad, p.total, p.estado, p.fecha
       FROM pedidos p
       JOIN usuarios u ON p.usuario_id = u.usuario_id
       JOIN juegos j ON p.juego_id = j.juego_id
       ORDER BY p.fecha DESC`
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("❌ Error al obtener pedidos:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}

// Crear un pedido (para clientes)
export async function POST(req) {
  try {
    const { usuario_id, juego_id, cantidad, total } = await req.json();

    if (!usuario_id || !juego_id || !cantidad || !total) {
      return NextResponse.json({ error: "Faltan datos" }, { status: 400 });
    }

    const result = await pool.query(
      `INSERT INTO pedidos (usuario_id, juego_id, cantidad, total, estado, fecha)
       VALUES ($1, $2, $3, $4, 'pendiente', NOW())
       RETURNING *`,
      [usuario_id, juego_id, cantidad, total]
    );

    return NextResponse.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error al crear pedido:", err);
    return NextResponse.json({ error: "Error interno" }, { status: 500 });
  }
}
