import pool from "../../../lib/db";

export async function GET(req, context) {
  try {
    // 👇 Ahora hay que hacer await a context.params
    const { juego_id } = await context.params;

    const result = await pool.query(
      "SELECT * FROM juegos WHERE juego_id = $1",
      [juego_id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ error: "Juego no encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error("Error GET juego:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
