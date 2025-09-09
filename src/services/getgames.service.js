import pool from '../app/lib/db';

export const getGames = async () => {
  const result = await pool.query(
    'SELECT juego_id, titulo, descripcion, precio, stock, activo, creado_en, imagen FROM juegos ORDER BY juego_id DESC;'
  );

  // Convertir precio a número
  const juegos = result.rows.map((juego) => ({
    ...juego,
    precio: parseFloat(juego.precio), // ahora precio es number
  }));

  return juegos;
};
