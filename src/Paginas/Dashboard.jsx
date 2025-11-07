import React, { useState } from "react";
import HabitCard from "../Componentes/HabitCard";
import MostrarNivel from "../Componentes/MostrarNivel";
import TarjetaEstadistica from "../Componentes/TarjetaEstadistica";
import { Target, CheckCircle2, Zap, CalendarHeart, Calendar, Flame } from "lucide-react";
import { useNotificacion } from "../Hooks/useNotificacion";
import heroImage from "../assets/hero-habits.jpg";
import "../Estilos/stylesPaginas/Dashboard.css";
import ContadorRacha from "../Componentes/ContadorRacha";

const Dashboard = () => {
  const { mostrarMensaje } = useNotificacion();

  const [habitos, setHabitos] = useState([
    { id: "1", nombre: "Ejercicio matutino", descripcion: "30 minutos de actividad física", xp: 50, racha: 7, completado: false },
    { id: "2", nombre: "Leer 20 páginas", descripcion: "Lectura de desarrollo personal", xp: 30, racha: 5, completado: false },
    { id: "3", nombre: "Meditar", descripcion: "10 minutos de meditación", xp: 25, racha: 12, completado: false },
    { id: "4", nombre: "Beber 2L de agua", descripcion: "Mantenerse hidratado todo el día", xp: 20, racha: 3, completado: false },
  ]);

  const [estadisticas, setEstadisticas] = useState({
    nivel: 5,
    experienciaActual: 150,
    experienciaTotal: 1250,
    rachaActual: 7,
    mejorRacha: 15,
  });

  const experienciaSiguienteNivel = estadisticas.nivel * 300;

  const alternarHabito = (id) => {
    setHabitos((prev) =>
      prev.map((habito) => {
        if (habito.id === id) {
          const nuevoCompletado = !habito.completado;

          if (nuevoCompletado) {
            const nuevaXP = estadisticas.experienciaActual + habito.xp;
            const nuevaTotalXP = estadisticas.experienciaTotal + habito.xp;
            let nuevoNivel = estadisticas.nivel;
            let xpRestante = nuevaXP;

            if (nuevaXP >= experienciaSiguienteNivel) {
              nuevoNivel += 1;
              xpRestante = nuevaXP - experienciaSiguienteNivel;
              mostrarMensaje("🎉 ¡Subiste de nivel!", `Ahora eres nivel ${nuevoNivel}. ¡Sigue así!`);
            } else {
              mostrarMensaje("✅ ¡Hábito completado!", `+${habito.xp} XP ganados`);
            }

            setEstadisticas({
              ...estadisticas,
              nivel: nuevoNivel,
              experienciaActual: xpRestante,
              experienciaTotal: nuevaTotalXP,
            });

            return { ...habito, completado: true, racha: habito.racha + 1 };
          } else {
            const nuevaXP = Math.max(0, estadisticas.experienciaActual - habito.xp);
            const nuevaTotalXP = Math.max(0, estadisticas.experienciaTotal - habito.xp);

            setEstadisticas({
              ...estadisticas,
              experienciaActual: nuevaXP,
              experienciaTotal: nuevaTotalXP,
            });

            return { ...habito, completado: false };
          }
        }
        return habito;
      })
    );
  };

  const completadosHoy = habitos.filter((h) => h.completado).length;
  const totalHabitos = habitos.length;
  const tasaExito = totalHabitos > 0 ? Math.round((completadosHoy / totalHabitos) * 100) : 0;

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
            nivel={estadisticas.nivel}
            experienciaActual={estadisticas.experienciaActual}
            experienciaSiguienteNivel={experienciaSiguienteNivel}
            experienciaTotal={estadisticas.experienciaTotal}
          />

          <ContadorRacha
            Icono={Flame}
            etiqueta="Racha actual"
            valor={`${estadisticas.rachaActual} días`}
            descripcion={`Sigue así!`}
          />
          <TarjetaEstadistica
            Icono={Calendar}
            etiqueta="Mejor racha"
            valor={`${estadisticas.mejorRacha} días`}
            descripcion="Tu récord Personal"
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
            valor={habitos.filter((h) => h.completado).reduce((acc, h) => acc + h.xp, 0)}
            descripcion="Puntos de experiencia"
          />
        </section>

        {/* Hábitos */}
        <section className="seccion-habitos">
          <h2>Tus Hábitos de Hoy</h2>
          <div className="lista-habitos">
            {habitos.map((habito) => (
              <HabitCard
                key={habito.id}
                id={habito.id}
                name={habito.nombre}
                description={habito.descripcion}
                xpReward={habito.xp}
                streak={habito.racha}
                completed={habito.completado}
                onToggle={alternarHabito}
              />
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="pie-dashboard">
          <h3>Cada día es una oportunidad para mejorar</h3>
          <p>No se trata de ser perfecto, sino de ser constante.</p>
          <p> Cada hábito te acerca a tu mejor versión.</p>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
