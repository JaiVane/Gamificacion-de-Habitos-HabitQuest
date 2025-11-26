import React, { createContext, useState, useContext, useEffect } from 'react';
import { getPerfil, updatePerfil, postData } from '../Api/api.js';


// 1. Create the context 
const AuthContext = createContext();
// 2. Custom hook to easily consume context 
export const useAuth = () => { return useContext(AuthContext); };


// 3. Proveedor del contexto
export const AuthProvider = ({ children }) => { 
  const [usuario, setUsuario] = useState(null); 
  const [cargando, setCargando] = useState(true);


 useEffect(() => { 
  const token = localStorage.getItem('token'); 
  if (token) { 
    getPerfil() .then(data => { setUsuario(data); 

    }) 
    .catch(err => { 
      console.error("Error al cargar perfil en AuthContext:", err); 
// If the token is invalid, we clean itpiamos 
      localStorage.removeItem('token'); 
    }) 
    .finally(() => { 
      setCargando(false); 
    }); 
  } else { setCargando(false); } 
}, []);

// Function to refresh the user's profile

  const refrescarPerfil = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/Auth/perfil`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      if (!res.ok) throw new Error("No se pudo refrescar el perfil");
      const data = await res.json();
      setUsuario(data); // ✅ ahora sí actualiza el estado global
      return data;
    } catch (error) {
      console.error("Error refrescando perfil:", error);
      setUsuario(null);
      localStorage.removeItem("token");
      throw error;
    }
  };
// Function to update the user's profile 
const actualizarUsuario = async (nuevosDatos) => { 
try { 
  await updatePerfil(nuevosDatos); 
// We don't need to do anything with the response, as the 'user' status has already been updated in the frontend. // We just maintain the state we already have.s. 
return nuevosDatos; // We return the data we already had.s.
} catch (error) { console.error("Error updating profile from context:", error); throw error; // We relaunch the error so that the component can handle itrlo 
   } 
  };

//Login Handling Feature 
//Login Handling Feature
const iniciarSesion = async (email, password) => {
  try {
    const result = await postData("Auth/login", { email, password });
    localStorage.setItem("token", result.token); 
    localStorage.setItem("userId", result.usuario.id); 
    
    // 🔹 Traemos el perfil completo después del login
    const perfilCompleto = await getPerfil();
    setUsuario(perfilCompleto);

    return perfilCompleto;
  } catch (error) {
    console.error("Error al iniciar sesión desde el contexto:", error); 
    throw error; 
  } 
};


//User Logout Feature 
const cerrarSesion = () => {
localStorage.removeItem("token"); // We clean the tokenken 
setUsuario(null); // We clean the status of the user // Optional: you could also clean the status of the habits if you wisheas 
   }; 
   const value = { usuario, setUsuario, cargando, refrescarPerfil,actualizarUsuario, iniciarSesion, cerrarSesion }; 
   return ( 
   <AuthContext.Provider value={value}> 
   {!cargando && children} 
   </AuthContext.Provider> );
}

 