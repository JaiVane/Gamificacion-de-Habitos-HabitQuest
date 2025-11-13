{/*// Componentes/FlokiAvatar.jsx
import React, { useMemo } from "react";
import Lottie from "lottie-react";
import normalJSON from "../assets/floki/floki-normal.json";
import rachaJSON from "../assets/floki/floki-racha.json";
import celebraJSON from "../assets/floki/floki-celebra.json";
import preocupadoJSON from "../assets/floki/floki-preocupado.json";
import tristeJSON from "../assets/floki/floki-triste.json";
import "../Estilos/stylesComponentes/FlokiAvatar.css";

const FlokiAvatar = ({
  nombreUsuario = "David",
  nivel = 5,
  racha = 0,
  xpHoy = 0,
  habitosCompletadosHoy = 0,
  perdioRacha = false,
  subioDeNivel = false,
}) => {
  const estado = useMemo(() => {
    if (perdioRacha) return "triste";
    if (subioDeNivel || xpHoy >= 100) return "celebra";
    if (racha >= 7) return "racha";
    if (habitosCompletadosHoy === 0) return "preocupado";
    return "normal";
  }, [perdioRacha, subioDeNivel, xpHoy, racha, habitosCompletadosHoy]);

  const animData = useMemo(() => {
    switch (estado) {
      case "celebra": return celebraJSON;
      case "racha": return rachaJSON;
      case "preocupado": return preocupadoJSON;
      case "triste": return tristeJSON;
      default: return normalJSON;
    }
  }, [estado]);

  const mensaje = useMemo(() => {
    switch (estado) {
      case "celebra": return `¡Estás en fuego, ${nombreUsuario}! +${xpHoy} XP hoy 🔥`;
      case "racha": return `¡Racha imparable: ${racha} días! 💪`;
      case "triste": return `Perder la racha duele… hoy la recuperamos 🐾`;
      case "preocupado": return `Aún no marcas nada. ¿arrancamos juntos? ✨`;
      default: return `¡Vamos, ${nombreUsuario}! Hoy puedes romper tu récord 🐾`;
    }
  }, [estado, nombreUsuario, xpHoy, racha]);

  return (
    <div className={`floki-avatar floki-${estado}`}>
      <Lottie animationData={animData} loop={true} autoplay={true} className="floki-lottie" />
      <div className="floki-info">
        <div className="floki-badges">
          <span className="floki-badge">Nivel {nivel}</span>
          <span className="floki-badge">Racha {racha}d</span>
          <span className="floki-badge">XP hoy {xpHoy}</span>
        </div>
        <p className="floki-mensaje">{mensaje}</p>
      </div>
    </div>
  );
};

export default FlokiAvatar;
*/}