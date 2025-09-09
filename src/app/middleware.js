import { NextResponse } from "next/server";

export function middleware(req) {
  // Revisamos si hay sesión (cookie "user")
  const user = req.cookies.get("user");
  const { pathname } = req.nextUrl;

  // Rutas que no requieren sesión
  const publicPaths = ["/login", "/register"];

  // Si no hay usuario y está entrando a una ruta privada, lo mandamos al login
  if (!user && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  // Se aplica a TODAS las rutas excepto las de API, next internals y favicon
  matcher: ["/((?!api|_next|favicon.ico).*)"],
};
