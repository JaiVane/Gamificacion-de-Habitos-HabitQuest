const API_URL = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");
const authHeaders = { Authorization: `Bearer ${token()}` };

export async function getMetasGlobales() {
  const res = await fetch(`${API_URL}/api/metas/globales`, { headers: authHeaders });
  if (!res.ok) throw new Error("No se pudieron obtener metas globales");
  return res.json();
}

export async function getEstadoGlobales() {
  const res = await fetch(`${API_URL}/api/metas/globales/estado`, { headers: authHeaders });
  if (!res.ok) throw new Error("No se pudo obtener estado de participación");
  return res.json(); // [{ id, titulo, ..., asociado: true/false }]
}

export async function asociarHabitosAGlobal(metaId, habitosIds) {
  const res = await fetch(`${API_URL}/api/metas/globales/${metaId}/asociar-habitos`, {
    method: "POST",
    headers: { ...authHeaders, "Content-Type": "application/json" },
    body: JSON.stringify(habitosIds),
  });
  if (!res.ok) throw new Error("No se pudieron asociar hábitos");
  return res.json();
}

export async function getMisHabitosPorMetaGlobal(metaId) {
  const res = await fetch(`${API_URL}/api/metas/globales/${metaId}/mis-habitos`, { headers: authHeaders });
  if (!res.ok) throw new Error("No se pudieron obtener mis hábitos de la meta global");
  return res.json(); // MetaConHabitosDto con lista de nombres
}
