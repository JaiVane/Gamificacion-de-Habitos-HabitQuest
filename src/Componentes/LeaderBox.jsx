import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  createConnection,
  startConnection,
  onLeaderboardEvent,
  stopConnection,
  isConnected,
} from "../Api/realtime.js";
import { useNotificacion } from "../Hooks/useNotificacion";

const LeaderBox = ({ leaderboard, setLeaderboard }) => {
  const { mostrarMensaje } = useNotificacion();
  const unsubscribeRef = useRef(null);
  
const currentUserId = parseInt(localStorage.getItem("userId"), 10);



  useEffect(() => {
    const token = localStorage.getItem("token") || "";
    createConnection(token);

    if (!isConnected()) {
      startConnection().catch((err) => {
        if (err?.message?.includes("stopped during negotiation")) {
          console.warn("SignalR: negociación abortada, reintentando...");
          return;
        }

        console.error("❌ Error iniciando SignalR:", err);
        mostrarMensaje({
          title: "Conexión en tiempo real fallida",
          description: "No se pudo conectar al servidor de notificaciones.",
          tipo: "error",
        });
      });
    }

    const handler = (payload) => {
      console.log("📨 Evento recibido:", payload);
      if (payload.usuarioId === currentUserId) {
        return;
      }
        //✅Unique key per day
        const getTodayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
};
const todayKey = getTodayKey();

// Claves únicas por usuario
const xpKey = `xpShown_${payload.UsuarioId}_${todayKey}`;
const tresKey = `tresHabitosShown_${payload.UsuarioId}_${todayKey}`;

  
        //actualizar leaderboard
      setLeaderboard((prev) => {
        const idx = prev.findIndex((r) => r.usuarioId === payload.UsuarioId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            nivel: payload.NivelDespues ?? updated[idx].nivel,
            xpHoy: payload.XPGanadoHoy ?? updated[idx].xpHoy,
            habitosHoy: payload.HabitosCompletadosHoy ?? updated[idx].habitosHoy,
            highlight: true,
          };
          setTimeout(() => {
            setLeaderboard((cur) =>
              cur.map((row, i) =>
                i === idx ? { ...row, highlight: false } : row
              )
            );
          }, 1200);
          return updated;
        } else {
          return [
            {
              usuarioId: payload.UsuarioId,
              nombre: payload.UsuarioNombre,
              nivel: payload.NivelDespues ?? 0,
              xpHoy: payload.XPGanadoHoy ?? 0,
              habitosHoy: payload.HabitosCompletadosHoy ?? 0,
              highlight: true,
            },
            ...prev,
          ];
        }
      });
        //notificaciones
      if (payload.subioNivel) { 
        mostrarMensaje({
          title: `${payload.usuarioNombre} subió de nivel`,
          description: `Ahora es nivel ${payload.nivelDespues}`,
          tipo: "info",
        });
      }
        if (payload.completoTresHoy && !localStorage.getItem(tresKey)) {
  mostrarMensaje({
    title: `${payload.usuarioNombre} completó 3 hábitos`,
    description: `Hoy completó ${payload.habitosCompletadosHoy} hábitos`,
    tipo: "success",
  });
  localStorage.setItem(tresKey, "true");
}

if (payload.ganoMas50Xp && !localStorage.getItem(xpKey)) {
  mostrarMensaje({
    title: `${payload.usuarioNombre} ganó ${payload.xpGanadoHoy} XP hoy`,
    description: `Jornada destacada`,
    tipo: "success",
  });
  localStorage.setItem(xpKey, "true");
}

    };

    unsubscribeRef.current = onLeaderboardEvent(handler);

    return () => {
      try {
        unsubscribeRef.current && unsubscribeRef.current();
      } catch (e) {
        console.warn("Error al desuscribir leaderboard:", e);
      }
      try {
        stopConnection();
      } catch (e) {
        console.warn("Error al detener conexión SignalR:", e);
      }
    };
  }, []);

  return null; //  no renderiza nada
};

LeaderBox.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  setLeaderboard: PropTypes.func.isRequired,
};

export default LeaderBox;
