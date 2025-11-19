import client from './client';

export const getCategorias = async () => {
  const { data } = await client.get('/categorias');
  return Array.isArray(data) ? data : [];
};

// ✅ Cambiar aquí: ya no pasamos userId, el backend lo saca del token
export const getHabitosDelUsuario = async () => {
  const { data } = await client.get('/habitos');
  return Array.isArray(data) ? data : [];
};
