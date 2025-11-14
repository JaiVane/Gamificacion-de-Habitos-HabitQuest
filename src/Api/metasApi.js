const API_URL = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

// Obtener todas las metas del usuario
export async function getMetasPorUsuario(userId) {
  const res = await fetch(`${API_URL}/metas/usuario/${userId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las metas");
  return res.json();
}

// Obtener una meta por ID
export async function getMetaById(id) {
  const res = await fetch(`${API_URL}/metas/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo obtener la meta");
  return res.json();
}

// Crear nueva meta
export async function crearMeta(data) {
  const body = {
    titulo: data.titulo,
    descripcion: data.descripcion,
    valorObjetivo: data.valorObjetivo,
    valorActual: data.valorActual || 0,
    fechaLimite: data.fechaLimite,
    categoria: data.categoria,
    estado: data.estado || "activa",
    usuarioId: data.usuarioId, // importante para relacionar con el usuario
  };

  const res = await fetch(`${API_URL}/metas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) throw new Error("No se pudo crear la meta");

  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return { success: true };
}

// Actualizar meta
export async function actualizarMeta(id, data) {
  const res = await fetch(`${API_URL}/metas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("No se pudo actualizar la meta");
  return res.json();
}

// Eliminar meta
export async function eliminarMeta(id) {
  const res = await fetch(`${API_URL}/metas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo eliminar la meta");
  return { success: true };
}
