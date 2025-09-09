// /api/auth/login/route.js
import { loginUser } from "@/services/login.service.js";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    const user = await loginUser(email, password);

    if (!user) {
      return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
    }

    // 👇 aquí me aseguro de incluir usuario_id
    return NextResponse.json({
      usuario_id: user.usuario_id,
      nombre: user.nombre,
      email: user.email,
      rol: user.rol,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
