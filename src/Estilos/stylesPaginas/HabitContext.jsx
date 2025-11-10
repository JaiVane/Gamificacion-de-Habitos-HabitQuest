import React, { createContext, useState, useContext } from 'react';

// 1. Crear el contexto
const HabitContext = createContext();

// 2. Crear un hook personalizado para usar el contexto fácilmente
export const useHabits = () => {
  return useContext(HabitContext);
};

// 3. Crear el proveedor del contexto
export const HabitProvider = ({ children }) => {
  const [habitos, setHabitos] = useState([
    {
      id: "1",
      nombre: "Ejercicio matutino",
      descripcion: "30 minutos de actividad física",
      xpReward: 50,
      racha: 7,
      completado: false,
      frequency: "Diaria",
      xpPenalty: 25,
    },
    {
      id: "2",
      nombre: "Leer 20 páginas",
      descripcion: "Leer un libro de desarrollo personal",
      xpReward: 30,
      racha: 5,
      completado: false,
      frequency: "Diaria",
      xpPenalty: 15,
    },
  ]);

  // Aquí podrías añadir todas las funciones para modificar los hábitos
  // (addHabit, deleteHabit, toggleHabit, etc.)
  
  const eliminarHabito = (id) => {
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  };

  const value = {
    habitos,
    setHabitos,
    eliminarHabito,
    // ...otras funciones y estados
  };

  return (
    <HabitContext.Provider value={value}>
      {children}
    </HabitContext.Provider>
  );
};
