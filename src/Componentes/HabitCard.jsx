import { useState } from "react";
import "../Estilos/stylesComponentes/HabitCard.css";
import { useNotificacion } from "../Hooks/useNotificacion";
import { Flame, Trophy, Calendar, AlertTriangle, Edit3, Trash2, Tags, } from "lucide-react";
import HabitTrackerGrid from "../Componentes/HabitTrackerGrid";

const HabitCard = ({
  id,
  name,
  description,
  xp,
  xpReward,
  streak,
  completed,
  frequency = "Diaria",
  xpPenalty = 0,
  onToggle,
  onEdit,
  onDelete,
  onShowHistory,
  soloLectura =false,
  categoriaNombre,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const { mostrarMensaje } = useNotificacion();
  const [historial, setHistorial] = useState([]);
  const [mostrarHistorial, setMostrarHistorial] = useState(false);
  const handleMarkCompleted = async (e) => {
    e.stopPropagation();
    try {
      // 🔹 Marca el hábito y obtiene el historial actualizado  git 
      const history = await onToggle(id);
  
      if (history && history.length > 0) {
        setHistorial(history);
      }
  
      mostrarMensaje({
        title: "¡Hábito cumplido!",
        description: "Se ha registrado este día en tu historial 🎯",
        tipo: "success",
      });
    } catch (error) {
      console.error("Error al marcar hábito:", error);
      mostrarMensaje({
        title: "Error al marcar hábito",
        description: error.message || "No se pudo registrar el cumplimiento.",
        tipo: "error",
      });
    }
  };
  
  
 
  const handleShowHistory = async (e) => {
    e.stopPropagation(); // Evita que otros eventos de click se disparen

    // Si el historial ya se está mostrando, simplemente lo ocultamos.
    if (mostrarHistorial) {
      setMostrarHistorial(false);
      return;
    }

    // Si no se está mostrando, pedimos los datos a la API.
    const historyData = await onShowHistory(id); // onShowHistory viene de Habitos.jsx
    if (historyData && historyData.length > 0) {
      setHistorial(historyData); // Guardamos los datos en el estado
      setMostrarHistorial(true); // Y ahora sí, mostramos la lista
    }
  }

  
  return (
    <div
      className={`habit-card ${completed ? "completed" : ""} ${
        isAnimating ? "celebrate" : ""
      }`}
    >
      <div className="habit-card-content">


        <div className="habit-details">
          <div className="habit-header">
          <div className="habit-title-section">
            <h3 className={`habit-name ${completed ? "done" : ""}`}>{name}</h3>
            {description && (
            <p className="habit-description">{description}</p>
            )}


          </div>


            <div className="habit-top-badges">

               {/* XP acumulado */}
                <span className="badge-xp-top">
                  <Trophy size={14} /> {xp} XP
                </span>

                {/* XP por cumplimiento */}
                <span className="badge-xp-reward">
                  +{xpReward} XP / {frequency}
                </span>
              {(onEdit || onDelete) && (
                <div className="habit-actions">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit({ id, name, description, xp, xpReward, streak, completed, frequency, xpPenalty });
                      }}
                      className="icon-btn edit"
                      title="Editar hábito"
                    >
                      <Edit3 size={16} />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(id);
                      }}
                      className="icon-btn delete"
                      title="Eliminar hábito"
                    >
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="habit-badges">
            
            {categoriaNombre && (
              <span className="badge badge-categoria">
                <Tags size={14} /> {categoriaNombre}
              </span>
            )}

            {frequency && (
              <span className="badge badge-frequency">
                <Calendar size={14} /> {frequency}
              </span>
            )}
            {xpPenalty > 0 && (
              <span className="badge badge-xp-negative">
                <AlertTriangle size={14} /> -{xpPenalty} XP
              </span>
            )}
          </div>

          <div className="habit-card-actions">
          {!soloLectura && (
  <button
    className={`boton-marcar-dia ${completed ? "cumplido" : ""}`}
    onClick={handleMarkCompleted}
    disabled={completed}
  >
    {completed ? " Cumplido" : "Marcar Cumplido"}
  </button>
)}



{!soloLectura && (
  <button
    className="boton-historial"
    onClick={handleShowHistory}
  >
    Ver Historial
  </button>
)}

          </div>

          {!soloLectura && mostrarHistorial && (
  <div className="habit-historial">
    <h4>Historial de Cumplimiento</h4>
    <p>Días consecutivos: <strong>{streak}</strong></p>
    <HabitTrackerGrid frecuencia={frequency} historial={historial} />
  </div>
)}



        </div>
      </div>
    </div>
  );
};

export default HabitCard;
