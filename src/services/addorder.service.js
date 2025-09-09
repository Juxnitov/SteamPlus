import pool from '../app/lib/db.js';

export const createOrder = async (usuario_id, juego_id) => {
  // Traer info del juego
  const juegoRes = await pool.query('SELECT precio, stock, activo FROM juegos WHERE juego_id = $1', [juego_id]);
  const juego = juegoRes.rows[0];

  if (!juego || !juego.activo) {
    throw new Error('Juego no disponible');
  }

  if (juego.stock <= 0) {
    throw new Error('Stock agotado');
  }

  // Insertar pedido
  const total = juego.precio;
  const result = await pool.query(
    'INSERT INTO pedidos (usuario_id, juego_id, cantidad, total) VALUES ($1, $2, 1, $3) RETURNING *',
    [usuario_id, juego_id, total]
  );

  // Reducir stock
  await pool.query('UPDATE juegos SET stock = stock - 1 WHERE juego_id = $1', [juego_id]);

  return result.rows[0];
};
