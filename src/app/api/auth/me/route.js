import pool from '../../../lib/db';

export async function GET(req) {
  try {
    // Aquí asumes que envías email o session en headers o cookies
    // Por simplicidad, si estás guardando email en un header:
    const email = req.headers.get("x-user-email"); 

    if (!email) {
      return new Response(JSON.stringify({ message: "No logueado" }), { status: 401 });
    }

    const result = await pool.query(
      "SELECT usuario_id, nombre, email, rol FROM usuarios WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "No encontrado" }), { status: 404 });
    }

    return new Response(JSON.stringify(result.rows[0]), { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}
