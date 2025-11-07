import React from "react";
import "../Estilos/stylesPaginas/TablaClasificacion.css";
import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

// Generar datos para top 100
const generarDatos = () => {
  const datos = [];
  const nombres = [
    "Ana García", "Carlos Ruiz", "Laura Martínez", "Miguel Sánchez", "Sofia López",
    "David Torres", "Elena Flores", "Javier Morales", "María González", "Pedro Hernández",
    "Carmen Díaz", "Luis Fernández", "Isabel Moreno", "Francisco Jiménez", "Patricia Romero"
  ];
  const usuarios = [
    "DragonSlayer", "ShadowNinja", "MysticMage", "IronWarrior", "StarSeeker",
    "ThunderBolt", "PhoenixRise", "StormChaser", "FireBlade", "IceQueen",
    "WindRunner", "EarthShaker", "LightBringer", "DarkKnight", "SkyWalker"
  ];

  for (let i = 0; i < 100; i++) {
    const nombreIndex = i % nombres.length;
    const usuarioIndex = i % usuarios.length;
    const baseXP = 15420 - (i * 50);
    const baseNivel = 12 - Math.floor(i / 10);
    const baseHabitos = 287 - (i * 2);
    const baseRacha = 45 - Math.floor(i / 3);

    datos.push({
      puesto: i + 1,
      usuario: usuarios[usuarioIndex] + (i > usuarios.length - 1 ? i : ""),
      nombre: nombres[nombreIndex] + (i > nombres.length - 1 ? ` ${i + 1}` : ""),
      xpTotal: Math.max(100, baseXP),
      nivel: Math.max(1, baseNivel),
      habitosCompletados: Math.max(10, baseHabitos),
      racha: Math.max(1, baseRacha)
    });
  }

  // Asegurar los primeros 8 con datos específicos
  datos[0] = { puesto: 1, usuario: "DragonSlayer", nombre: "Ana García", xpTotal: 15420, nivel: 12, habitosCompletados: 287, racha: 45 };
  datos[1] = { puesto: 2, usuario: "ShadowNinja", nombre: "Carlos Ruiz", xpTotal: 14230, nivel: 11, habitosCompletados: 265, racha: 38 };
  datos[2] = { puesto: 3, usuario: "MysticMage", nombre: "Laura Martínez", xpTotal: 13890, nivel: 11, habitosCompletados: 254, racha: 42 };
  datos[3] = { puesto: 4, usuario: "IronWarrior", nombre: "Miguel Sánchez", xpTotal: 12560, nivel: 10, habitosCompletados: 241, racha: 31 };
  datos[4] = { puesto: 5, usuario: "StarSeeker", nombre: "Sofia López", xpTotal: 11340, nivel: 9, habitosCompletados: 228, racha: 29 };
  datos[5] = { puesto: 6, usuario: "ThunderBolt", nombre: "David Torres", xpTotal: 10890, nivel: 9, habitosCompletados: 215, racha: 25 };
  datos[6] = { puesto: 7, usuario: "PhoenixRise", nombre: "Elena Flores", xpTotal: 9870, nivel: 8, habitosCompletados: 198, racha: 22 };
  datos[7] = { puesto: 8, usuario: "StormChaser", nombre: "Javier Morales", xpTotal: 9120, nivel: 8, habitosCompletados: 185, racha: 18 };

  return datos;
};

const datosClasificacion = generarDatos();

const TablaClasificacion = () => {
  const obtenerIcono = (puesto) => {
    switch (puesto) {
      case 1: return <Trophy className="icono icono-oro" size={24} />;
      case 2: return <Medal className="icono icono-plata" size={24} />;
      case 3: return <Award className="icono icono-bronce" size={24} />;
      default: return <span className="puesto-numero">{puesto}</span>;
    }
  };

  const obtenerIniciales = (nombre) => {
    const partes = nombre.split(" ");
    if (partes.length >= 2) {
      return (partes[0][0] + partes[1][0]).toUpperCase();
    }
    return nombre.slice(0, 2).toUpperCase();
  };

  return (
    <div className="contenedor-principal">
      <div className="contenido-dashboard">
        <main className="contenido-tabla">
          <div className="header-seccion">
            <h1 className="titulo-seccion">
              <Trophy className="icono-titulo" size={32} /> Tabla de Competición
            </h1>
            <p className="subtitulo">Los mejores guerreros del reino de HabitQuest</p>
          </div>

          {/* Top 3 */}
          <div className="tarjetas-top">
            {datosClasificacion.slice(0, 3).map((jugador) => (
              <div
                key={jugador.puesto}
                className={`tarjeta-top jugador-${jugador.puesto}`}
              >
                <div className="tarjeta-icono">
                  {obtenerIcono(jugador.puesto)}
                </div>
                <h2 className="tarjeta-nombre">{jugador.nombre}</h2>
                <p className="tarjeta-usuario">@{jugador.usuario}</p>
                <div className="tarjeta-stats">
                  <div className="stat-item">
                    <span className="stat-label">Nivel</span>
                    <span className="badge-nivel">{jugador.nivel}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Total XP</span>
                    <span className="stat-value">{jugador.xpTotal.toLocaleString()}</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Racha</span>
                    <span className="stat-racha">{jugador.racha} días</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Tabla general */}
          <div className="tabla-general">
            <h2 className="titulo-tabla">
              <TrendingUp size={20} /> Clasificación General
            </h2>
            <div className="tabla-contenedor">
              <table>
                <thead>
                  <tr>
                    <th>Rank</th>
                    <th>Usuario</th>
                    <th>Nivel</th>
                    <th>XP Total</th>
                    <th>Hábitos</th>
                    <th>Racha</th>
                  </tr>
                </thead>
                <tbody>
                  {datosClasificacion.map((jugador, index) => (
                    <tr key={jugador.puesto} className={index % 2 === 0 ? "fila-par" : "fila-impar"}>
                      <td className="columna-rank">
                        {obtenerIcono(jugador.puesto)}
                      </td>
                      <td>
                        <div className="usuario-info">
                          <div className="avatar">
                            {obtenerIniciales(jugador.nombre)}
                          </div>
                          <div className="usuario-datos">
                            <p className="usuario-nombre">{jugador.nombre}</p>
                            <span className="usuario-username">@{jugador.usuario}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`badge-nivel-tabla nivel-${jugador.puesto <= 3 ? jugador.puesto : 'normal'}`}>
                          Nivel {jugador.nivel}
                        </span>
                      </td>
                      <td className="columna-xp">{jugador.xpTotal.toLocaleString()}</td>
                      <td>{jugador.habitosCompletados}</td>
                      <td className="columna-racha">{jugador.racha} días</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TablaClasificacion;
