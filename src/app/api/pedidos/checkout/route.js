import { createOrder } from '../../../../services/addorder.service.js';

export async function POST(request) {
  try {
    const body = await request.json();
    const { usuario_id, juego_id } = body;
    const pedido = await createOrder(usuario_id, juego_id);
    return new Response(JSON.stringify(pedido), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
