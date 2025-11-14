import React, { useState, useEffect } from "react";
import HabitCard from "../Componentes/HabitCard";
import MostrarNivel from "../Componentes/MostrarNivel";
import TarjetaEstadistica from "../Componentes/TarjetaEstadistica";
import { Target, CheckCircle2, Zap, Calendar, Flame } from "lucide-react";
import { useNotificacion } from "../Hooks/useNotificacion";
import heroImage from "../assets/hero-habits.jpg";
import "../Estilos/stylesPaginas/Dashboard.css";
import { getHistorialHabito } from "../Api/habitosApi";
import { getCategorias } from "../Api/categoriaApi";
import { toggleHabito, getUsuario } from "../Api/api";

const Dashboard = () => {
  const { mostrarMensaje } = useNotificacion();
  const [usuario, setUsuario] = useState(null);
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    const cargarUsuario = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await getUsuario(userId);
        const categoriasData = await getCategorias();

        const hoy = new Date().toDateString();

        const habitosConHistorial = await Promise.all(
          (data.habitos || []).map(async (h) => {
            const historial = await getHistorialHabito(h.id);
            const fueCumplidoHoy = historial.some(r => new Date(r.fecha).toDateString() === hoy);
            return { ...h, historial, cumplido: fueCumplidoHoy };
          })
        );

        setCategorias(categoriasData);
        setUsuario({ ...data, habitos: habitosConHistorial });
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };
    cargarUsuario();
  }, []);

  const alternarHabito = async (id) => {
    try {
      const usuarioActualizado = await toggleHabito(id);
      setUsuario(usuarioActualizado);
      mostrarMensaje({
        title: "✅ ¡Hábito actualizado!",
        description: "Tu progreso ha sido guardado",
        tipo: "success",
      });
    } catch (error) {
      mostrarMensaje({
        title: "Error",
        description: error.message,
        tipo: "error",
      });
    }
  };

  if (!usuario) {
    return <p>Cargando tu progreso...</p>;
  }

  const hoy = new Date().toDateString();
  const habitos = usuario.habitos || [];

  // ✅ Solo hábitos activos hoy (diarios)
  const habitosActivosHoy = habitos.filter(h => h.frecuencia === "Diaria");

  // ✅ Métricas del día
  const completadosHoy = habitosActivosHoy.filter(h => h.cumplido).length;
  const totalHabitos = habitosActivosHoy.length;
  const tasaExito = totalHabitos > 0 ? Math.round((completadosHoy / totalHabitos) * 100) : 0;
  const xpHoy = habitosActivosHoy.filter(h => h.cumplido).reduce((acc, h) => acc + h.xpReward, 0);

  // ✅ XP total y nivel
  const xpTotal = habitos.reduce((acc, h) => acc + h.xp, 0);
  const experienciaSiguienteNivel = usuario.nivel * 300;
  const experienciaActual = xpTotal % experienciaSiguienteNivel;
  const nivelCalculado = Math.floor(xpTotal / 300) + 1;

  // ✅ Rachas
  const mejorRacha = habitos.reduce((acc, h) => Math.max(acc, h.diasConsecutivos), 0);

  return (
    <div className="dashboard">
      <div className="contenido-dashboard">

        {/* Hero */}
        <section className="seccion-hero">
          <div className="texto-hero">
            <h1>
              Transforma tus <span className="resaltado-primario">hábitos</span> en{" "}
              <span className="resaltado-secundario">logros</span>
            </h1>
            <p>
              Gamifica tu vida diaria: gana XP, sube de nivel y mantén tus rachas mientras construyes los hábitos que siempre quisiste.
            </p>
          </div>
          <div className="imagen-hero">
            <img src={heroImage} alt="Hero" />
          </div>
        </section>

        {/* Progreso */}
        <section className="seccion-progreso">
          <MostrarNivel
            nivel={nivelCalculado}
            experienciaActual={experienciaActual}
            experienciaSiguienteNivel={experienciaSiguienteNivel}
            experienciaTotal={xpTotal}
          />

          <TarjetaEstadistica
            Icono={Flame}
            etiqueta="Racha actual"
            valor={`${mejorRacha} días`}
            descripcion="¡Sigue así!"
            claseExtra={"tarjeta-ContarRacha"}
          />
          <TarjetaEstadistica
            Icono={Calendar}
            etiqueta="Mejor racha"
            valor={`${mejorRacha} días`}
            descripcion="Tu récord personal"
            claseExtra={"tarjeta-mejor-racha"}
          />
        </section>

        {/* Estadísticas */}
        <section className="seccion-estadisticas">
          <TarjetaEstadistica
            Icono={Target}
            etiqueta="Hábitos de hoy"
            valor={`${completadosHoy}/${totalHabitos}`}
            descripcion="Tareas completadas"
          />
          <TarjetaEstadistica
            Icono={CheckCircle2}
            etiqueta="Tasa de éxito"
            valor={`${tasaExito}%`}
            descripcion="Rendimiento del día"
          />
          <TarjetaEstadistica
            Icono={Zap}
            etiqueta="XP ganado hoy"
            valor={xpHoy}
            descripcion="Puntos de experiencia"
          />
        </section>

        {/* Hábitos */}
        <section className="seccion-habitos">
          <h2>Tus Hábitos de Hoy</h2>
          <div className="lista-habitos">
            {habitosActivosHoy.map(habito => {
              const categoria = categorias.find(c => c.id === habito.categoriaId);
              return (
                <HabitCard
                  key={habito.id}
                  id={habito.id}
                  name={habito.nombre}
                  description={habito.descripcion}
                  xpReward={habito.xpReward}
                  streak={habito.diasConsecutivos}
                  completed={habito.cumplido}
                  historial={habito.historial}
                  frequency={habito.frecuencia}
                  categoriaNombre={categoria ? categoria.nombre : null}
                  xp={habito.xp}
                  xpPenalty={habito.xpPenalty}
                  soloLectura={true}
                />
              );
            })}
          </div>
        </section>

        {/* Footer */}
        <footer className="pie-dashboard">
          <h3>Cada día es una oportunidad para mejorar</h3>
          <p>No se trata de ser perfecto, sino de ser constante.</p>
          <p>Cada hábito te acerca a tu mejor versión.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
