import pool from '../app/lib/db.js';
import { v4 as uuidv4 } from 'uuid';

export const updateOrderStatus = async (pedido_id, estado) => {
  let codigo_entrega = null;

  if (estado === 'entregado') {
    codigo_entrega = uuidv4();
  }

  const update = await pool.query(`
    UPDATE pedidos
    SET estado = $1, codigo_entrega = $2
    WHERE pedido_id = $3
    RETURNING *
  `, [estado, codigo_entrega, pedido_id]);

  if (estado === 'cancelado') {
    // devolver stock
    const pedido = update.rows[0];
    await pool.query('UPDATE juegos SET stock = stock + 1 WHERE juego_id = $1', [pedido.juego_id]);
  }

  return update.rows[0];
};
