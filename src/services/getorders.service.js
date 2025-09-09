import pool from '../app/lib/db.js';

export const getUserOrders = async (usuario_id) => {
  const result = await pool.query(`
    SELECT p.pedido_id, p.juego_id, j.titulo, j.descripcion, j.precio, p.cantidad, p.total, p.fecha
    FROM pedidos p
    JOIN juegos j ON p.juego_id = j.juego_id
    WHERE p.usuario_id = $1
    ORDER BY p.fecha DESC
  `, [usuario_id]);

  return result.rows;
};
