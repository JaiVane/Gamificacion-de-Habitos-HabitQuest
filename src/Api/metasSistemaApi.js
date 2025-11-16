// Obtener la URL de la API desde las variables de entorno
const API_URL = import.meta.env.VITE_API_URL;

// Obtener todas las metas del sistema con progreso del usuario
export const obtenerMetasSistema = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/metassistema`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener metas del sistema');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en obtenerMetasSistema:', error);
    throw error;
  }
};

// Verificar y desbloquear logros automáticamente
export const verificarLogros = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/metassistema/verificar`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al verificar logros');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en verificarLogros:', error);
    throw error;
  }
};

// Obtener logros completados del usuario
export const obtenerLogrosCompletados = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/metassistema/completadas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener logros completados');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en obtenerLogrosCompletados:', error);
    throw error;
  }
};

// Obtener estadísticas de logros
export const obtenerEstadisticasLogros = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/api/metassistema/estadisticas`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener estadísticas');
    }

    return await response.json();
  } catch (error) {
    console.error('Error en obtenerEstadisticasLogros:', error);
    throw error;
  }
};