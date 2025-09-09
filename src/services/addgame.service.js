import pool from '../app/lib/db';

export const addGame = async (titulo, descripcion, precio, stock, activo, creado_en, imagen) => {
  try {
    const result = await pool.query(
      'INSERT INTO juegos (titulo, descripcion, precio, stock, activo, creado_en, imagen) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;',
      [titulo, descripcion, precio, stock, activo, creado_en, imagen]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error en addGame:', error);
    throw error;
  }
};
