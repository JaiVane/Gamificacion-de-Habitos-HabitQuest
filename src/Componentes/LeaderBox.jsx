// import { useEffect, useRef } from "react";
// import PropTypes from "prop-types";
// import {
//   createConnection,
//   startConnection,
//   onLeaderboardEvent,
//   stopConnection,
//   isConnected,
//   onAscensoPuesto,
// } from "../Api/realtime.js";
// import { useNotificacion } from "../Hooks/useNotificacion";

// const LeaderBox = ({ leaderboard, setLeaderboard }) => {
//   const { mostrarMensaje } = useNotificacion();
//   const unsubscribeRef = useRef(null);
  
// const currentUserId = parseInt(localStorage.getItem("userId"), 10);



//   useEffect(() => {
//     const token = localStorage.getItem("token") || "";
//     createConnection(token);

//     if (!isConnected()) {
//       startConnection().catch((err) => {
//         if (err?.message?.includes("stopped during negotiation")) {
//           console.warn("SignalR: negociación abortada, reintentando...");
//           return;
//         }

//         console.error("❌ Error iniciando SignalR:", err);
//         mostrarMensaje({
//           title: "Conexión en tiempo real fallida",
//           description: "No se pudo conectar al servidor de notificaciones.",
//           tipo: "error",
//         });
//       });
//     }

//     const handler = (payload) => {
//       console.log("📨 Evento recibido:", payload);
//       if (payload.usuarioId === currentUserId) {
//         return;
//       }
//         // Clave única por día
//         const getTodayKey = () => {
//   const d = new Date();
//   return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
// };
// const todayKey = getTodayKey();

// // Claves únicas por usuario
// const xpKey = `xpShown_${payload.UsuarioId}_${todayKey}`;
// const tresKey = `tresHabitosShown_${payload.UsuarioId}_${todayKey}`;

  
//         //actualizar leaderboard
//       setLeaderboard((prev) => {
//         const idx = prev.findIndex((r) => r.usuarioId === payload.UsuarioId);
//         if (idx >= 0) {
//           const updated = [...prev];
//           // updated[idx] = {
//           //   ...updated[idx],
//           //   nivel: payload.NivelDespues ?? updated[idx].nivel,
//           //   xpHoy: payload.XPGanadoHoy ?? updated[idx].xpHoy,
//           //   habitsToday: payload.HabitosCompletadosHoy ?? updated[idx].habitosHoy,
//           //   experiencia: payload.ExperienciaTotal ?? updated[idx].experiencia,
//           //   highlight: true,
//           // };
//           updated[idx] = {
//   ...updated[idx],
//   nivel: payload.nivelDespues ?? updated[idx].nivel,
//   xpHoy: payload.xpGanadoHoy ?? updated[idx].xpHoy,
//   habitosCompletados: payload.habitosCompletadosHistorico ?? updated[idx].habitosCompletados,
//   experiencia: payload.experienciaTotal ?? updated[idx].experiencia,
//   racha: payload.rachaActual ?? updated[idx].racha,
//   nombreUsuario: payload.usuarioNombre ?? updated[idx].nombreUsuario,
//   nombre: payload.usuarioNombre ?? updated[idx].nombre,
//   highlight: true,
// };

//           setTimeout(() => {
//             setLeaderboard((cur) =>
//               cur.map((row, i) =>
//                 i === idx ? { ...row, highlight: false } : row
//               )
//             );
//           }, 1200);
//           return updated;
//         } else {
//           // return [
//           //   {
//           //     usuarioId: payload.UsuarioId,
//           //     nombre: payload.UsuarioNombre,
//           //     nivel: payload.NivelDespues ?? 0,
//           //     xpHoy: payload.XPGanadoHoy ?? 0,
//           //     habitosHoy: payload.HabitosCompletadosHoy ?? 0,
//           //     experiencia: payload.ExperienciaTotal ?? 0,
//           //     highlight: true,
//           //   },
//           //   ...prev,
//           // ];
//         return [
//   {
//     usuarioId: payload.usuarioId,
//     nombre: payload.usuarioNombre,
//     nombreUsuario: payload.usuarioNombre,
//     nivel: payload.nivelDespues ?? 0,
//     xpHoy: payload.xpGanadoHoy ?? 0,
//     habitosCompletados: payload.habitosCompletadosHistorico ?? 0,
//     experiencia: payload.experienciaTotal ?? 0,
//     streak: payload.rachaActual ?? 0,
//     highlight: true,
//   },
//   ...prev,
// ];

//         }
//       });
//         //notificaciones
//       if (payload.subioNivel) { 
//         mostrarMensaje({
//           title: `${payload.usuarioNombre} subió de nivel`,
//           description: `Ahora es nivel ${payload.nivelDespues}`,
//           tipo: "info",
//         });
//       }
//         if (payload.completoTresHoy && !localStorage.getItem(tresKey)) {
//   mostrarMensaje({
//     title: `${payload.usuarioNombre} completó 3 hábitos`,
//     description: `Hoy completó ${payload.habitosCompletadosHoy} hábitos`,
//     tipo: "success",
//   });
//   localStorage.setItem(tresKey, "true");
// }

// if (payload.ganoMas50Xp && !localStorage.getItem(xpKey)) {
//   mostrarMensaje({
//     title: `${payload.usuarioNombre} ganó ${payload.xpGanadoHoy} XP hoy`,
//     description: `Jornada destacada`,
//     tipo: "success",
//   });
//   localStorage.setItem(xpKey, "true");
// }

//     };

//     unsubscribeRef.current = onLeaderboardEvent(handler);
// // Escuchar evento de ascenso de puesto
//   const unsubscribeAscenso = onAscensoPuesto(({ usuarioNombre, nombreUsuario, puesto, biografia }) => {
//     mostrarMensaje({
//       title: `🏆 ¡${usuarioNombre} (@${nombreUsuario}) alcanzó el puesto ${puesto}!`,
//       description: biografia || "Sin biografía",
//       tipo: "success",
//     });
//   });
//     return () => {
//       try {
//         unsubscribeRef.current && unsubscribeRef.current();
//         unsubscribeAscenso && unsubscribeAscenso();
//       } catch (e) {
//         console.warn("Error al desuscribir leaderboard:", e);
//       }
//       try {
//         stopConnection();
//       } catch (e) {
//         console.warn("Error al detener conexión SignalR:", e);
//       }
//     };
//   }, []);

//   return null; //  no renderiza nada
// };

// LeaderBox.propTypes = {
//   leaderboard: PropTypes.array.isRequired,
//   setLeaderboard: PropTypes.func.isRequired,
// };

// export default LeaderBox;


import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import {
  createConnection,
  startConnection,
  onLeaderboardEvent,
  stopConnection,
  isConnected,
  onAscensoPuesto,
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

      const todayKey = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      const xpKey = `xpShown_${payload.usuarioId}_${todayKey}`;
      const tresKey = `tresHabitosShown_${payload.usuarioId}_${todayKey}`;

      // Actualizar leaderboard
      setLeaderboard((prev) => {
        const idx = prev.findIndex((r) => r.usuarioId === payload.usuarioId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = {
            ...updated[idx],
            nivel: payload.nivelDespues ?? updated[idx].nivel,
            xpHoy: payload.xpGanadoHoy ?? updated[idx].xpHoy,
            habitosCompletados: payload.habitosCompletadosHistorico ?? updated[idx].habitosCompletados,
            experiencia: payload.experienciaTotal ?? updated[idx].experiencia,
            racha: payload.rachaActual ?? updated[idx].racha,
            nombreUsuario: payload.nombreUsuario ?? updated[idx].nombreUsuario,
            nombre: payload.usuarioNombre ?? updated[idx].nombre,
            highlight: true,
          };
          setTimeout(() => {
            setLeaderboard((cur) =>
              cur.map((row, i) => (i === idx ? { ...row, highlight: false } : row))
            );
          }, 1200);
          return updated;
        } else {
          return [
            {
              usuarioId: payload.usuarioId,
              nombre: payload.usuarioNombre,
              nombreUsuario: payload.nombreUsuario,
              nivel: payload.nivelDespues ?? 0,
              xpHoy: payload.xpGanadoHoy ?? 0,
              habitosCompletados: payload.habitosCompletadosHistorico ?? 0,
              experiencia: payload.experienciaTotal ?? 0,
              racha: payload.rachaActual ?? 0,
              highlight: true,
            },
            ...prev,
          ];
        }
      });

      // Notificaciones
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

    // Escuchar evento de ascenso de puesto
    const unsubscribeAscenso = onAscensoPuesto(({ usuarioId, usuarioNombre, nombreUsuario, puesto, biografia }) => {
      // 👇 Evitar que el propio usuario vea su notificación
      if (usuarioId === currentUserId) {
        return;
      }

      const todayKey = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`;
      const ascensoKey = `ascensoShown_${usuarioId}_${puesto}_${todayKey}`;

      if (!localStorage.getItem(ascensoKey)) {
        mostrarMensaje({
          title: `🏆 ¡${usuarioNombre} (@${nombreUsuario}) alcanzó el puesto ${puesto}!`,
          description: biografia || "Sin biografía",
          tipo: "success",
        });
        localStorage.setItem(ascensoKey, "true");
      }
    });

    return () => {
      try {
        unsubscribeRef.current && unsubscribeRef.current();
        unsubscribeAscenso && unsubscribeAscenso();
      } catch (e) {
        console.warn("Error al desuscribir:", e);
      }
      try {
        stopConnection();
      } catch (e) {
        console.warn("Error al detener conexión SignalR:", e);
      }
    };
  }, []);

  return null; // no renderiza nada
};

LeaderBox.propTypes = {
  leaderboard: PropTypes.array.isRequired,
  setLeaderboard: PropTypes.func.isRequired,
};

export default LeaderBox;
