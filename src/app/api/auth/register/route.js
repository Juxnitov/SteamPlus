import { registerUser } from '../../../../services/registerUser.service';

export async function POST(req) {
  try {
    const { nombre, email, password } = await req.json();
    const user = await registerUser(nombre, email, password);
    return new Response(JSON.stringify({ user }), { status: 201 });
  } catch (err) {
    console.error(err); // Esto mostrará el error real en la terminal
    return new Response(JSON.stringify({ message: err.message }), { status: 500 });
  }
}