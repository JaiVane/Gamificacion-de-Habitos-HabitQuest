import client from './client';
import { normalizeMeta } from '../utils/normalize';

export const getMetasPorUsuario = async (userId) => {
  const { data } = await client.get(`/Metas/usuario/${userId}`);
  return Array.isArray(data) ? data.map(normalizeMeta) : [];
};

export const getMetaById = async (id) => {
  const { data } = await client.get(`/Metas/${id}`);
  return normalizeMeta(data);
};

export const crearMeta = async (payload) => {
  const body = {
    Titulo: payload.titulo,
    Descripcion: payload.descripcion,
    ValorObjetivo: Number(payload.valorObjetivo),
    FechaLimite: payload.fechaLimite,
    CategoriaId: payload.categoriaId,
    HabitosIds: payload.habitosIds || [],
  };
  const { data } = await client.post('/Metas/crear', body);
  return normalizeMeta(data);
};

export const actualizarMeta = async (id, payload) => {
  const body = {
    Titulo: payload.titulo,
    Descripcion: payload.descripcion,
    ValorObjetivo: Number(payload.valorObjetivo),
    FechaLimite: payload.fechaLimite,
    CategoriaId: payload.categoriaId,
    HabitosIds: payload.habitosIds || null,
  };
  const { data } = await client.put(`/Metas/${id}`, body);
  return data;
};

export const eliminarMeta = async (id) => {
  await client.delete(`/Metas/${id}`);
  return { success: true };
};
