import React from "react";
import "../Estilos/stylesComponentes/MostrarNivel.css";
import { TrendingUp, Trophy } from "lucide-react";

const MostrarNivel = ({
  nivel,
  experienciaActual,
  experienciaSiguienteNivel,
  experienciaTotal,
}) => {
  const progreso = Math.min(
    (experienciaActual / experienciaSiguienteNivel) * 100,
    100
  );

  return (
    <div className="tarjeta-nivel">
      <div className="nivel-header">
        <h3 className="titulo-nivel">
        <Trophy /> Nivel Actual 
        </h3>
        <p className="xp-total">< TrendingUp/> XP Total:  {experienciaTotal}</p>
      </div>

      <div className="nivel-principal">
        <h2 className="valor-nivel">Nivel {nivel}</h2>
        <p className="texto-progreso">
          Progreso al siguiente nivel{" "}
          <span className="xp-progreso">
            {experienciaActual}/{experienciaSiguienteNivel} XP
          </span>
        </p>

        <div className="barra-progreso">
          <div
            className="relleno"
            style={{ width: `${progreso}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default MostrarNivel;
