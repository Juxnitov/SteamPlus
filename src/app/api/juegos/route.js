import { getGames } from '../../../services/getgames.service.js';
import { addGame } from '../../../services/addgame.service.js';

export async function GET() {
  try {
    const games = await getGames();
    return new Response(JSON.stringify(games), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { titulo, descripcion, precio, stock, activo, creado_en, imagen } = body;

    const result = await addGame(titulo, descripcion, precio, stock, activo, creado_en, imagen);

    return new Response(JSON.stringify(result), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
