const API_URL = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

export async function getHabitos() {
  const res = await fetch(`${API_URL}/habitos`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener los hábitos");
  return res.json();
}


export async function getHabitoById(id) {
  const res = await fetch(`${API_URL}/habitos/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo obtener el hábito");
  return res.json();
}

export async function crearHabito(data) {
  // Aseguramos que los datos a enviar tengan la estructura correcta
  const body = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    frecuencia: data.frecuencia,
    xp: data.xp,
  };

  const res = await fetch(`${API_URL}/habitos`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("No se pudo crear el hábito");
  // Si la respuesta es 201 Created y tiene contenido, lo devolvemos.
  // Si no, simplemente indicamos que fue exitoso.
  const contentType = res.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json") !== -1) {
    return res.json();
  }
  return { success: true };
}

export async function actualizarHabito(id, data) {
  const res = await fetch(`${API_URL}/habitos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("No se pudo actualizar el hábito");
  return { success: true }; // No esperamos contenido, solo confirmación.
}

export async function eliminarHabito(id) {
  const res = await fetch(`${API_URL}/habitos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo eliminar el hábito");
}


export async function marcarCumplido(id) {
  const res = await fetch(`${API_URL}/habitos/cumplir/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token()}`,
    },
  });

  if (!res.ok) throw new Error("No se pudo marcar el hábito como cumplido");
  return res.json();
}
export async function marcarDia(habitoId) {
  const res = await fetch(`${API_URL}/habitos/marcar-dia/${habitoId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("Ya se marcó este hábito hoy");
  return res.json();
}

export async function obtenerHistorial(habitoId) {
  const res = await fetch(`${API_URL}/habitos/historial/${habitoId}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo obtener el historial");
  return res.json();
}
