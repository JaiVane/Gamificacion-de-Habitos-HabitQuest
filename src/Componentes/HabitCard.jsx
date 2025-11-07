import { useState } from "react";
import "../Estilos/stylesComponentes/HabitCard.css";
import { Flame, Trophy, Calendar, AlertTriangle, Edit3, Trash2 } from "lucide-react";

const HabitCard = ({
  id,
  name,
  description,
  xpReward,
  streak,
  completed,
  frequency = "Diaria",
  xpPenalty = 0,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    if (!completed) {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 600);
    }
    onToggle(id);
  };

  return (
    <div
      className={`habit-card ${completed ? "completed" : ""} ${
        isAnimating ? "celebrate" : ""
      }`}
    >
      <div className="habit-card-content">
        <div className="checkbox-container">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleToggle}
            className="habit-checkbox"
          />
        </div>

        <div className="habit-details">
          <div className="habit-header">
            <div className="habit-title-section">
              <h3 className={`habit-name ${completed ? "done" : ""}`}>{name}</h3>
              <p className="habit-description">{description}</p>
            </div>

            <div className="habit-top-badges">
              {streak > 0 && (
                <span className="badge-streak">
                  <Flame size={14} /> {streak}
                </span>
              )}
              <span className="badge-xp-top">
                <Trophy size={14} /> {xpReward} XP
              </span>
              {(onEdit || onDelete) && (
                <div className="habit-actions">
                  {onEdit && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEdit({ id, name, description, xpReward, streak, completed, frequency, xpPenalty });
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
        </div>
      </div>
    </div>
  );
};

export default HabitCard;
