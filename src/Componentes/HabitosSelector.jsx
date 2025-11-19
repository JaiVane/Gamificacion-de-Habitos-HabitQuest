import React, { useState, useEffect, useCallback } from "react";
import { getHabitosDelUsuario } from "../Api/categoriasYHabitosApi"; // Asegúrate que la ruta sea correcta
import "../Estilos/stylesComponentes/HabitosSelector.css"; // Importamos los nuevos estilos

const HabitosSelector = ({ value, onChange }) => {
  const [habitos, setHabitos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const cargarHabitos = async () => {
      try {
        setLoading(true);
        const habitosUsuario = await getHabitosDelUsuario();
        setHabitos(habitosUsuario);
        setError("");
      } catch (err) {
        console.error("Error al cargar hábitos:", err);
        setError("No se pudieron cargar los hábitos.");
      } finally {
        setLoading(false);
      }
    };
    cargarHabitos();
  }, []);

  // Usamos useCallback para evitar que esta función se recree en cada render
  const handleCheckboxChange = useCallback((habitoId) => {
    // Creamos un nuevo Set para manejar fácilmente la adición/eliminación de IDs
    const nuevosHabitosIds = new Set(value);
    if (nuevosHabitosIds.has(habitoId)) {
      nuevosHabitosIds.delete(habitoId);
    } else {
      nuevosHabitosIds.add(habitoId);
    }
    // Convertimos el Set de nuevo a un array y llamamos a la función onChange
    onChange(Array.from(nuevosHabitosIds));
  }, [value, onChange]);

  if (loading) {
    return <p>Cargando hábitos...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>{error}</p>;
  }

  if (habitos.length === 0) {
    return (
      <div className="habitos-selector-fieldset">
        <label className="habitos-selector-label">Asociar Hábitos</label>
        <p>No tienes hábitos creados para asociar.</p>
      </div>
    );
  }

  return (
    // Usamos las nuevas clases CSS
    <fieldset className="habitos-selector-fieldset">
      <label className="habitos-selector-label">Asociar Hábitos</label>
      <div className="habitos-grid">
        {habitos.map((habito) => (
          <label key={habito.id} className="habito-item">
            <input
              type="checkbox"
              checked={value.includes(habito.id)}
              onChange={() => handleCheckboxChange(habito.id)}
            />
            {habito.nombre}
          </label>
        ))}
      </div>
    </fieldset>
  );
};

export default HabitosSelector;
