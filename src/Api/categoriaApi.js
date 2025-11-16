import { useNotificacion } from "../Hooks/useNotificacion";


const API_URL = import.meta.env.VITE_API_URL;
const token = () => localStorage.getItem("token");

/*  Obtener todas las categorías de un usuario
export async function getCategorias() {
    const res = await fetch(`${API_URL}/categorias`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    if (!res.ok) throw new Error("No se pudieron obtener las categorías");
    return res.json();
  }*/
    export async function getCategorias() {
        const res = await fetch(`${API_URL}/categorias`, {
          headers: { Authorization: `Bearer ${token()}` },
        });
        if (!res.ok) throw new Error("No se pudieron obtener las categorías");
        return res.json();
      }
      
  

//  Obtener una categoría por ID
export async function getCategoriaById(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudo obtener la categoría");
  return res.json();
}

//  Crear nueva categoría
export async function crearCategoria(data) {
    const body = {
      nombre: data.nombre,
      descripcion: data.descripcion
    };
  
    const res = await fetch(`${API_URL}/categorias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token()}`,
      },
      body: JSON.stringify(body),
    });
  
    if (!res.ok) {
      let errorMessage = "No se pudo crear la categoría";
      try {
        const errorBody = await res.json();
        errorMessage = errorBody.message || errorBody.error || errorMessage;
      } catch (e) {}
      throw new Error(errorMessage);
    }

    const nuevaCategoria = await res.json();
    return { ...nuevaCategoria, successMessage: "Categoría creada exitosamente" };
  }
  

// Actualizar categoría
export async function actualizarCategoria(id, data) {
  const body = { Nombre: data.nombre, Descripcion: data.descripcion };
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token()}` },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.mensaje || "No se pudo actualizar la categoría");
  }
  return res.json(); // devuelve { mensaje: "..."}
}


// Eliminar categoría
export async function eliminarCategoria(id) {
  const res = await fetch(`${API_URL}/categorias/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.mensaje || "No se pudo eliminar la categoría");
  }
  return res.json(); // { mensaje: "Categoría eliminada correctamente" }
}



// Obtener categorías con detalles (hábitos y metas)
export async function getCategoriasConDetalles() {
  const res = await fetch(`${API_URL}/categorias/con-detalles`, {
    headers: { Authorization: `Bearer ${token()}` },
  });
  if (!res.ok) throw new Error("No se pudieron obtener las categorías con detalles");
  return res.json();
}
