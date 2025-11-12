import React, { createContext, useState, useContext, useEffect } from 'react';
import { getPerfil, updatePerfil, postData } from '../Api/api.js';
 
// 1. Crear el contexto
const AuthContext = createContext();

// 2. Hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};

// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getPerfil()
        .then(data => {
          setUsuario(data);
        })
        .catch(err => {
          console.error("Error al cargar perfil en AuthContext:", err);
          // Si el token es inválido, lo limpiamos
          localStorage.removeItem('token');
        })
        .finally(() => {
          setCargando(false);
        });
    } else {
      setCargando(false);
    }
  }, []);

  // Función para actualizar el perfil del usuario
  const actualizarUsuario = async (nuevosDatos) => {
    try {
      // Hacemos la llamada a la API para que guarde los datos.
      await updatePerfil(nuevosDatos);
      // No necesitamos hacer nada con la respuesta, ya que el estado 'usuario' ya fue actualizado en el frontend.
      // Simplemente mantenemos el estado que ya tenemos.
      return nuevosDatos; // Devolvemos los datos que ya teníamos.
    } catch (error) {
      console.error("Error al actualizar el perfil desde el contexto:", error);
      throw error; // Relanzamos el error para que el componente pueda manejarlo
    }
  };

  // Función para manejar el inicio de sesión
  const iniciarSesion = async (email, password) => {
    try {
      const result = await postData("auth/login", { email, password });
      localStorage.setItem("token", result.token);
      // Después de guardar el token, obtenemos los datos del perfil inmediatamente
      const datosUsuario = await getPerfil();
      setUsuario(datosUsuario); // Actualizamos el estado global
      return datosUsuario;
    } catch (error) {
      console.error("Error al iniciar sesión desde el contexto:", error);
      throw error; // Relanzamos el error para que el componente lo maneje
    }
  };

  // Función para cerrar la sesión del usuario
  const cerrarSesion = () => {
    localStorage.removeItem("token"); // Limpiamos el token
    setUsuario(null); // Limpiamos el estado del usuario
    // Opcional: podrías limpiar también el estado de los hábitos si lo deseas
  };

  const value = { usuario, setUsuario, cargando, actualizarUsuario, iniciarSesion, cerrarSesion };

  return (
    <AuthContext.Provider value={value}>
      {!cargando && children}
    </AuthContext.Provider>
  );
};