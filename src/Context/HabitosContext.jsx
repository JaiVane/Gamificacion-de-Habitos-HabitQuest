import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { 
  getHabitos, 
  crearHabito, 
  actualizarHabito, 
  eliminarHabito, 
  marcarCumplido, 
  marcarDia, 
  obtenerHistorial 
} from '../Api/habitosApi';
import { useAuth } from './AuthContext';
import { useNotificacion } from '../Hooks/useNotificacion';
 



// 1️ Crear el contexto
const HabitContext = createContext();

// 2️ Hook personalizado para consumir el contexto fácilmente
export const useHabits = () => useContext(HabitContext);

// 3️ Proveedor del contexto
export const HabitProvider = ({ children }) => {
  const [habitos, setHabitos] = useState([]);
  const [cargandoHabitos, setCargandoHabitos] = useState(false);
  const { usuario, setUsuario } = useAuth(); // <-- Obtenemos setUsuario
  const { mostrarMensaje } = useNotificacion();

  // Cargar hábitos al iniciar sesión
  useEffect(() => {
    if (usuario) {
      fetchHabitos();
    }
  }, [usuario]);

  // 🔹 Cargar hábitos desde la API
  const fetchHabitos = useCallback(async () => {
    setCargandoHabitos(true);
    try {
      const data = await getHabitos();
      console.log("Hábitos recibidos:", data);

      setHabitos(data.map(h => ({
        id: h.id,
        nombre: h.nombre,
        descripcion: h.descripcion ?? h.Descripcion ?? "", 
        frecuencia: h.frecuencia,
        cumplido: h.cumplido,
        diasConsecutivos: h.diasConsecutivos,
        xp: h.xp || 0,
        xpReward: h.xpReward || 0,      
        xpPenalty: h.xpPenalty || 0,     
        rareza: h.rareza || "Común",
        categoriaId: h.categoriaId, // <-- ✨ CORRECCIÓN AQUÍ
        fechaUltimoCumplimiento: h.fechaUltimoCumplimiento || null,
      })));
      
    } catch (error) {
      console.error("Error al cargar hábitos:", error);
      mostrarMensaje({
        title: "Error al cargar hábitos",
        description: error.message || "No se pudieron cargar tus hábitos.",
        tipo: "error",
      });
    } finally {
      setCargandoHabitos(false);
    }
  }, [mostrarMensaje]);

  // 🔹 Crear hábito
  const addHabit = useCallback(async (newHabitData) => {
    try {
      await crearHabito(newHabitData);
      await fetchHabitos();
      mostrarMensaje({
        title: "Hábito creado",
        description: `"${newHabitData.nombre}" ha sido añadido.`,
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al crear hábito:", error);
      mostrarMensaje({
        title: "Error al crear hábito",
        description: error.message || "No se pudo crear el hábito.",
        tipo: "error",
      });
    }
  }, [mostrarMensaje, fetchHabitos]);

  // 🔹 Actualizar hábito
  const updateHabit = useCallback(async (id, updatedHabitData) => {
    try {
      await actualizarHabito(id, updatedHabitData);
      await fetchHabitos();
      mostrarMensaje({
        title: "Hábito actualizado",
        description: `"${updatedHabitData.nombre}" ha sido actualizado.`,
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al actualizar hábito:", error);
      mostrarMensaje({
        title: "Error al actualizar hábito",
        description: error.message || "No se pudo actualizar el hábito.",
        tipo: "error",
      });
    }
  }, [mostrarMensaje, fetchHabitos]);

  // 🔹 Eliminar hábito
  const removeHabit = useCallback(async (id) => {
    try {
      await eliminarHabito(id);
      setHabitos((prev) => prev.filter((h) => h.id !== id));
      mostrarMensaje({
        title: "Hábito eliminado",
        description: "El hábito ha sido eliminado correctamente.",
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al eliminar hábito:", error);
      mostrarMensaje({
        title: "Error al eliminar hábito",
        description: error.message || "No se pudo eliminar el hábito.",
        tipo: "error",
      });
    }
  }, [mostrarMensaje]);

  // 🔹 Marcar hábito como cumplido (✔) y registrar en historial
  const toggleHabitCompletion = useCallback(async (id) => {
    try {
      const updatedHabit = await marcarCumplido(id);
  
      if (updatedHabit.cumplido) {
        try {
          await marcarDia(id);
          console.log(` Día registrado en historial para hábito ${id}`);
        } catch (err) {
          console.warn("No se pudo registrar el día (posiblemente ya marcado):", err.message);
        }
      }
  
      // 🔹 Actualizar estado local
      setHabitos((prev) =>
        prev.map((h) => (h.id === id ? updatedHabit : h))
      );
  
      mostrarMensaje({
        title: updatedHabit.cumplido ? "¡Hábito completado!" : "Hábito desmarcado",
        description: updatedHabit.cumplido
          ? "Se registró el cumplimiento de hoy 🎯"
          : "Se desmarcó el cumplimiento.",
        tipo: "success",
      });
  
      // 🔹 Devuelve el historial actualizado si fue cumplido
      if (updatedHabit.cumplido) {
        const history = await obtenerHistorial(id);
        return history;
      }
  
    } catch (error) {
      console.error("Error al alternar completado del hábito:", error);
      mostrarMensaje({
        title: "Error al actualizar hábito",
        description: error.message || "No se pudo actualizar el hábito.",
        tipo: "error",
      });
    }
  }, [mostrarMensaje]);
  

  // 🔹 Registrar manualmente el día (opcional)
  const markDayForHabit = useCallback(async (id) => {
    try {
      await marcarDia(id);
      await fetchHabitos();
      mostrarMensaje({
        title: "¡Día marcado!",
        description: "Se ha registrado el cumplimiento de hoy.",
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al marcar día:", error);
      mostrarMensaje({
        title: "Error al marcar día",
        description: error.message || "No se pudo registrar el día.",
        tipo: "error",
      });
    }
  }, [mostrarMensaje, fetchHabitos]);

  // 🔹 Obtener historial sin modificar el hábito
  const getHistoryForHabit = useCallback(async (id) => {
    try {
      const data = await obtenerHistorial(id);
      if (!data || data.length === 0) {
        mostrarMensaje({
          title: "Sin registros",
          description: "Este hábito aún no tiene historial.",
          tipo: "info",
        });
      }
      return data || [];
    } catch (error) {
      console.error("Error al obtener historial:", error);
      mostrarMensaje({
        title: "Error de historial",
        description: error.message || "No se pudo obtener el historial.",
        tipo: "error",
      });
      return [];
    }
  }, [mostrarMensaje]);

  const value = {
    habitos,
    cargandoHabitos,
    addHabit,
    updateHabit,
    removeHabit,
    toggleHabitCompletion,
    markDayForHabit,
    getHistoryForHabit,
    fetchHabitos
  };

  return (
    <HabitContext.Provider value={value}>
      {cargandoHabitos ? <div>Cargando hábitos...</div> : children}
    </HabitContext.Provider>
  );
};
