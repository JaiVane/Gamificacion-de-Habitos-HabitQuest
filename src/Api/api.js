// src/services/api.js
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL:", API_URL);

async function handleError(response) {
  let errorMessage = `Error ${response.status}: ${response.statusText}`;
  try {
    // Intenta parsear el cuerpo del error como JSON, que es común en APIs REST.
    const errorBody = await response.json();
    // Si el JSON tiene una propiedad 'message' o 'error', úsala.
    errorMessage = errorBody.message || errorBody.error || JSON.stringify(errorBody);
  } catch (e) {
    // Si no es JSON, usa el texto plano de la respuesta.
    errorMessage = await response.text() || errorMessage;
  }
  throw new Error(errorMessage);
}
  
// Ejemplo de función para obtener datos de un endpoint
export async function getData(endpoint) {
  const response = await fetch(`${API_URL}/${endpoint}`);
  if (!response.ok) return handleError(response);

  return response.json();
}

// Ejemplo de función para enviar datos a un endpoint
export async function postData(endpoint, data) {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) return handleError(response);


  return await response.json();
}

//  Función PUT para actualizar datos
export const putData = async (endpoint, body) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
  if (!response.ok) return handleError(response);


  return await response.json();
};

//  Función DELETE para eliminar registros
export const deleteData = async (endpoint) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return handleError(response);
  }
  // Si la respuesta es 204 No Content, no hay cuerpo para parsear.
  if (response.status === 204) {
    return { success: true };
  }
  return response.json();
};

//funcion obtener perfil
export async function getPerfil() {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/auth/perfil`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if (!response.ok) return handleError(response);
  return response.json();
}
//funcion actualizar perfil
export async function updatePerfil(data) {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_URL}/auth/perfil`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) return handleError(response);
  return response.json();
}
