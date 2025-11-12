import React from "react";
import "../Estilos/stylesPaginas/Inicio.css";
import { useNavigate } from "react-router-dom";
import { Sparkles, Target, Trophy, TrendingUp } from "lucide-react";
import heroImage from "../assets/hero-habits.jpg";
import  Button  from "../Componentes/Button";

const Inicio = () => {
  const navegar = useNavigate();

  return (  
    <div className="pagina-inicio">
      {/* Encabezado */}
      <header className="encabezado">
        <div className="logo">
          <Sparkles size={46} className="logoIcon" />
          <h1>HabitQuest</h1>
        </div>
        <div className="boton-inicio-sesion">
  <Button onClick={() => navegar("/autenticacion")} className="boton-primario grande">
    Iniciar Sesión
  </Button>
</div>
      </header>
      

      {/* Sección principal */}
      <section className="seccion-principal">
        <div className="contenedor-principal">
          <div className="texto-principal">
            <h2>
              Transforma tus <span className="resaltado">hábitos</span> en una aventura épica
            </h2>
            <p>
              Convierte tu rutina diaria en un juego emocionante. Gana XP, sube
              de nivel y desbloquea logros mientras construyes los hábitos que
              transformarán tu vida.
            </p>
            <div className="botones-principales">
              <Button onClick={() => navegar("/autenticacion")} className="boton-primario grande">
                Comenzar Ahora
              </Button>
            </div>
          </div>
          <div className="imagen-principal">
            <img
              src={heroImage}
              alt="HabitQuest - Gamificación de hábitos"
            />
          </div>
        </div>
      </section>

      {/* Sección de características */}
      <section className="seccion-caracteristicas">
        <h3>¿Por qué HabitQuest?</h3>
        <div className="caracteristicas">
          <div className="tarjeta">
            <div className="icono-fon">
              <Target size={28} className="icon" />
            </div>
            <h4>Sistema de Niveles</h4>
            <p>
              Gana experiencia con cada hábito completado y observa cómo tu nivel aumenta progresivamente.
            </p>
          </div>

          <div className="tarjeta">
            <div className="icono-fon">
              <Trophy size={28} className="icon" />
            </div>
            <h4>Rachas y Logros</h4>
            <p>
              Mantén tu racha activa y desbloquea logros especiales mientras construyes consistencia.
            </p>
          </div>

          <div className="tarjeta">
            <div className="icono-fon">
              <TrendingUp size={28} className="icon" />
            </div>
            <h4>Progreso Visual</h4>
            <p>
              Visualiza tu crecimiento con estadísticas detalladas y gráficos motivadores.
            </p>
          </div>
        </div>
      </section>

      {/* Sección final */}
      <section className="seccion-final">
        <div className="cta">
          <h3>¿Listo para comenzar tu aventura?</h3>
          <p>
            Únete a miles de personas que ya están transformando sus vidas
          </p>
          <Button onClick={() => navegar("/autenticacion")} className="boton-primario ">
            Empezar Gratis
          </Button>
        </div>
      </section>

      {/* Pie de página */}
      <footer className="pie">
        <p>© 2025 HabitQuest. Transforma tu vida, un hábito a la vez.</p>
      </footer>
    </div>
  );
};

export default Inicio;
