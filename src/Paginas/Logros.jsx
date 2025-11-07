import React, { useState, useMemo } from "react";
import "../Estilos/stylesPaginas/Logros.css";
import { Trophy, Shield, Swords, Heart, Flame, Target, Award, Crown, Star, Zap, Lock, CheckCircle2, User } from "lucide-react";

const Logros = () => {
  const [categoriaActiva, setCategoriaActiva] = useState("hábitos");

  const logros = [
    // Hábitos (2/5 desbloqueados)
    { id: 1, nombre: "Primera Victoria", descripcion: "Completa tu primer hábito", icono: Trophy, rareza: "común", categoria: "hábitos", desbloqueado: true, progreso: 1, maxProgreso: 1, xp: 50 },
    { id: 2, nombre: "Guerrero Constante", descripcion: "Completa 10 hábitos", icono: Target, rareza: "común", categoria: "hábitos", desbloqueado: true, progreso: 10, maxProgreso: 10, xp: 100 },
    { id: 3, nombre: "Maestro de Rutinas", descripcion: "Completa 50 hábitos", icono: Swords, rareza: "rara", categoria: "hábitos", desbloqueado: false, progreso: 32, maxProgreso: 50, xp: 250 },
    { id: 4, nombre: "Leyenda de Hábitos", descripcion: "Completa 100 hábitos", icono: Crown, rareza: "épica", categoria: "hábitos", desbloqueado: false, progreso: 32, maxProgreso: 100, xp: 500 },
    { id: 5, nombre: "Dios del Progreso", descripcion: "Completa 500 hábitos", icono: User, rareza: "legendaria", categoria: "hábitos", desbloqueado: false, progreso: 32, maxProgreso: 500, xp: 2000 },
    // Rachas (2/4 desbloqueados) - ejemplos
    { id: 6, nombre: "Racha Inicial", descripcion: "Mantén una racha de 3 días", icono: Flame, rareza: "común", categoria: "rachas", desbloqueado: true, progreso: 3, maxProgreso: 3, xp: 75 },
    { id: 7, nombre: "Semana Perfecta", descripcion: "Mantén una racha de 7 días", icono: Flame, rareza: "común", categoria: "rachas", desbloqueado: true, progreso: 7, maxProgreso: 7, xp: 150 },
    { id: 8, nombre: "Mes de Éxito", descripcion: "Mantén una racha de 30 días", icono: Flame, rareza: "rara", categoria: "rachas", desbloqueado: false, progreso: 15, maxProgreso: 30, xp: 300 },
    { id: 9, nombre: "Año Legendario", descripcion: "Mantén una racha de 365 días", icono: Flame, rareza: "épica", categoria: "rachas", desbloqueado: false, progreso: 15, maxProgreso: 365, xp: 1000 },
    // XP (1/4 desbloqueados) - ejemplos
    { id: 10, nombre: "Primeros Pasos", descripcion: "Alcanza 100 XP", icono: Star, rareza: "común", categoria: "xp", desbloqueado: true, progreso: 100, maxProgreso: 100, xp: 50 },
    { id: 11, nombre: "Experto", descripcion: "Alcanza 1000 XP", icono: Star, rareza: "rara", categoria: "xp", desbloqueado: false, progreso: 250, maxProgreso: 1000, xp: 200 },
    { id: 12, nombre: "Maestro", descripcion: "Alcanza 5000 XP", icono: Star, rareza: "épica", categoria: "xp", desbloqueado: false, progreso: 250, maxProgreso: 5000, xp: 500 },
    { id: 13, nombre: "Leyenda", descripcion: "Alcanza 10000 XP", icono: Star, rareza: "legendaria", categoria: "xp", desbloqueado: false, progreso: 250, maxProgreso: 10000, xp: 1000 },
    // Especiales (0/2 desbloqueados) - ejemplos
    { id: 14, nombre: "Coleccionista", descripcion: "Desbloquea 10 logros", icono: Award, rareza: "rara", categoria: "especiales", desbloqueado: false, progreso: 5, maxProgreso: 10, xp: 300 },
    { id: 15, nombre: "Campeón Total", descripcion: "Desbloquea todos los logros", icono: Crown, rareza: "legendaria", categoria: "especiales", desbloqueado: false, progreso: 5, maxProgreso: 15, xp: 2000 },
  ];

  const categorias = [
    { id: "todos", nombre: "Todos" },
    { id: "hábitos", nombre: "Hábitos" },
    { id: "rachas", nombre: "Rachas" },
    { id: "xp", nombre: "XP" },
    { id: "especiales", nombre: "Especiales" },
  ];

  const logrosFiltrados = useMemo(() => {
    if (categoriaActiva === "todos") return logros;
    return logros.filter((l) => l.categoria === categoriaActiva);
  }, [categoriaActiva]);

  const logrosDesbloqueados = useMemo(() => {
    return logros.filter((l) => l.desbloqueado).length;
  }, []);

  const contarPorCategoria = (categoria) => {
    if (categoria === "todos") {
      const desbloqueados = logros.filter((l) => l.desbloqueado).length;
      return `${desbloqueados}/${logros.length}`;
    }
    const categoriaLogros = logros.filter((l) => l.categoria === categoria);
    const desbloqueados = categoriaLogros.filter((l) => l.desbloqueado).length;
    return `${desbloqueados}/${categoriaLogros.length}`;
  };

  const obtenerColorIcono = (logro) => {
    if (!logro.desbloqueado) return "#9ca3af";
    return "#10b981";
  };

  const obtenerClaseRareza = (rareza) => {
    switch (rareza) {
      case "común": return "rareza-comun";
      case "rara": return "rareza-rara";
      case "épica": return "rareza-epica";
      case "legendaria": return "rareza-legendaria";
      default: return "";
    }
  };

  const columnasDeLogros = useMemo(() => {
    const columnas = [[], [], []];
    logrosFiltrados.forEach((logro, index) => {
      columnas[index % 3].push(logro);
    });
    return columnas;
  }, [logrosFiltrados]);
  
  return (
    <div className="pagina-logros">
      <div className="configuracion">
        <header className="logros-encabezado">
        <div className="logros-header-izquierda">
          <div className="logros-titulo"> 
            <Trophy size={55} color="#f59e0b" />
            <h1>Logros</h1>
          </div>
          <p className="logros-subtitulo">
            Desbloquea logros completando desafíos y mejorando tus hábitos
          </p>
        </div>
        <div className="logros-contador">
          <div className="contador-box">
            <span className="contador-label">Desbloqueados</span>
            <span className="contador-numero">{logrosDesbloqueados}/{logros.length}</span>
          </div>
        </div>
      </header>

      <div className="logros-botones">
        {categorias.map((cat) => (
          <button
            key={cat.id}
            className={`boton-categoria ${categoriaActiva === cat.id ? "categoria-activa" : ""}`}
            onClick={() => setCategoriaActiva(cat.id)}
          >
            {cat.nombre} ({contarPorCategoria(cat.id)})
          </button>
        ))}
      </div>

      </div>
      

      <div className="logros-grid-columnas">
        {columnasDeLogros.map((columna, colIndex) => (
          <div key={colIndex} className="columna-logros">
            {columna.map((logro) => {
              const IconComponent = logro.icono;
              return (
                <div key={logro.id} className={`logro-tarjeta ${logro.desbloqueado ? "" : "bloqueado"}`}>
                  <div className="logro-estado">
                    {logro.desbloqueado ? (
                      <CheckCircle2 size={18} color="#9ca3af" />
                    ) : (
                      <Lock size={18} color="#9ca3af" />
                    )}
                  </div>
                  <div
                    className={`logro-icono ${logro.desbloqueado ? "desbloqueado" : ""}`}
                    style={{ backgroundColor: logro.desbloqueado ? "#10b981" : "#e5e7eb" }}
                  >
                    <IconComponent size={18} color={logro.desbloqueado ? "#ffffff" : "#9ca3af"} />
                  </div>
                  <div className="logro-contenido">
                    <h3>{logro.nombre}</h3>
                    <p>{logro.descripcion}</p>
                    <div className="logro-info">
                      <span className={`rareza ${obtenerClaseRareza(logro.rareza)}`}>
                        {logro.rareza}
                      </span>
                      <span className="xp">+{logro.xp} XP</span>
                    </div>
                    {!logro.desbloqueado && (
                      <div className="logro-progreso">
                        <div className="progreso-header">
                          <span className="progreso-label">Progreso</span>
                          <span className="progreso-numero">{logro.progreso}/{logro.maxProgreso}</span>
                        </div>
                        <div className="barra-progreso">
                          <div
                            className="barra-interna"
                            style={{ width: `${(logro.progreso / logro.maxProgreso) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Logros;
