"use client";

import { useEffect, useState } from "react";
import PanelCliente from "./PanelCliente";

export default function ClientePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  if (!user) return <p className="p-4">Cargando...</p>;

  return <PanelCliente usuarioId={user.usuario_id} />;
}
