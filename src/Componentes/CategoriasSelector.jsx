import React, { useEffect, useState } from "react";
import { getCategorias } from "../Api/categoriasYHabitosApi";

const CategoriasSelector = ({ value, onChange, label = "Categoría" }) => {
  const [categorias, setCategorias] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    const cargar = async () => {
      try {
        setCargando(true);
        const data = await getCategorias();
        setCategorias(data);
      } catch (e) {
        console.error("Error cargando categorías:", e);
      } finally {
        setCargando(false);
      }
    };
    cargar();
  }, []);

  return (
    <label className="modal-label">
      {label}
      <select
        className="modal-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={cargando}
        required
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map((c) => (
          <option key={c.id} value={c.id}>
            {c.nombre}
          </option>
        ))}
      </select>
    </label>
  );
};

export default CategoriasSelector;
