import React from "react";
import "../Estilos/stylesPaginas/Inicio.css";
import { useNavigate } from "react-router-dom";
import { Sparkles, Target, Trophy, TrendingUp, Rocket, ArrowBigDown, ArrowBigRightIcon, ArrowBigRightDashIcon, ArrowRight, ListCheck, List, ListTodo, CheckCircle, ChartBar, ChartBarIncreasing, ChartBarStacked, ChartBarBig, ChartBarIcon, Zap, Star, Medal, Flame, User, Users, Heart } from "lucide-react";
import heroImage from "../assets/hero-habits.jpg";
import  Button  from "../Componentes/Button";

const Inicio = () => {
  const navegar = useNavigate();

  return (  
    <div className="pagina-inicio">
      {/* Encabezado */}
      <header className="header-inicio">
        <div className="logo">
          <Sparkles size={46} className="logoIcon" />
          <h1 className="titulo-">HabitQuest</h1>
        </div>
        <div className="boton-inicio-sesion">
  <Button onClick={() => navegar("/autenticacion")} className="boton-primario grande">
    Comenzar Gratis
  </Button>
</div>
      </header>
      

      {/* Sección principal */}
      <section className="seccion-principal">
        <div className="contenedor-principal">
          <div className="texto-principal">
              <div className="info">
                <div class="hero-banner">
                  <Rocket size={32} className="rocket-icon"/>
                  Tu vida es el juego más importante
                </div>
                <h2>
                  Transforma tus <span className="resaltado">hábitos</span> en una aventura épica
                </h2>
                <p>
                  La única web que gamifica tu vida real. Gana XP, desbloquea logros y sube de nivel mientras construyes la mejor versión de ti mismo.
                </p>
                  <Button onClick={() => navegar("/autenticacion")} className="botones-principales boton-primario grande">
                    <Sparkles/>Empieza Tu Aventura  <ArrowRight/>
                  </Button>
                  <section class="benefits-section">
                    <div class="benefits-header">
                      <p>
                        <CheckCircle color="#02a513"/> <strong>En 10 segundos:  </strong>Crea hábitos, complétalos diariamente, gana XP, sube de nivel y desbloquea logros. <br />  <strong>Tu vida nunca fue tan divertida.</strong>
                      </p>
                    </div>

                    <div class="stats-grid">
                      <div class="stat-card">
                        <h3>1,000+</h3>
                        <p>Jugadores activos</p>
                      </div>
                      <div class="stat-card">
                        <h3>50K+</h3>
                        <p>Hábitos conquistados</p>
                      </div>
                      <div class="stat-card">
                        <h3>95%</h3>
                        <p>Éxito en rachas</p>
                      </div>
                    </div>
                  </section>
              </div>
              <div className="imagen-principal">
                <img
                  src={heroImage}
                  alt="HabitQuest - Gamificación de hábitos"
                />
              </div>
          </div>
        </div>
      </section>

      {/* Sección de cómo funciona */}
      <section class="como-funciona-seccion">
            <div class="banner">
                  <Target size={22} className=""/>
                  Simple y Poderoso
                </div>
                <div className="info-titulo">
                  <h3 class="section-subtitle">Cómo funciona <span className="span-habit">HabitQuest</span> </h3>
                  <p class="section-description">
                    Cuatro pasos para transformar tu vida en la aventura más emocionante
                  </p>
                </div>
  

  <div class="steps-grid">
    <div class="step-card">
      <div class="step-number">01</div><Target size={70} className="iconos"/>
      <h4>Crea tus hábitos</h4>
      <p>Define los hábitos que quieres construir. Desde ejercicio hasta meditación, tú decides tu aventura.</p>
    </div>

    <div class="step-card">
      <div class="step-number">02</div><Zap size={70} className="iconos"/>
      <h4>Completa misiones diarias</h4>
      <p>Cada hábito completado es una misión ganada. Acumula tu progreso día tras día.</p>
    </div>

    <div class="step-card">
      <div class="step-number">03</div><Trophy size={70} className="iconos"/>
      <h4>Gana XP y sube de nivel</h4>
      <p>Recibe puntos de experiencia por cada logro. Sube de nivel como en tu juego favorito.</p>
    </div>

    <div class="step-card">
      <div class="step-number">04</div><ChartBar size={70} className="iconos"/>
      <h4>Observa tu transformación</h4>
      <p>Visualiza tu evolución con estadísticas detalladas y celebra cada victoria.</p>
    </div>
  </div>
      </section>

      {/* Sección de beneficios reales */}
      <section class="real-benefits">
        <div className="header-beneficios">
          <div class="star-banner">
                  <Star size={22} className=""/>
                  Ventajas Reales 
                </div>
        </div>

  <h2 class="benefits-title">Por qué te va a <span className="encantar">encantar</span></h2>
  <p class="benefits-subtitle">No es solo una web. Es tu compañero de transformación personal</p>

  <div class="benefits-grid">
    <div class="benefit-card">
      <Flame size={60} class="benefit-icon"/>
      <div className="info-benefit"><h3>Mantén tu racha viva</h3>
      <p>Cada día cuenta. Construye rachas épicas y nunca pierdas tu momento.</p>
      </div>
      
    </div>

    <div class="benefit-card">
      <Medal size={60} class="benefit-icon"/>
      <div className="info-benefit"><h3>Desbloquea logros épicos</h3>
      <p>Colecciona insignias y recompensas mientras conquistas nuevos desafíos.</p></div>
      
    </div>

    <div class="benefit-card">
      <Users size={60} class="benefit-icon"/>
      <div className="info-benefit"><h3>Compite con amigos</h3>
      <p>Únete a la tabla de clasificación y motívate con una comunidad ganadora.</p>
    </div>
    </div>

    <div class="benefit-card">
      <Star size={60} class="benefit-icon"/>
      <div className="info-benefit"><h3>Actual Rewards</h3>
      <p>Tu progreso virtual se traduce en cambios reales en tu vida diaria.</p>
    </div>
    </div>
  </div>
      </section>

      {/* Sección del sistema de juego */}
      <section class="game-system">
    <div class="system-header">
      <div class="play-banner">
        <Trophy size={22} />
        Sistema de juego
      </div>
    </div>
    <h2 className="titulo-play"> Gamificación que <span className="span-play">realmente funciona</span></h2>
    <p className="subtitulo-play">Inspirado en los mejores RPGs, diseñado para tu vida real</p>

  <div class="system-grid">
    <div class="system-card green">
      <Zap size={60} class="zap play-icon"/>
      <div className="info-benefit">
        <h3>Sistema de XP</h3>
      <p>Gana 25 XP por cada hábito completado. Acumula experiencia y desbloquea nuevos niveles de poder.</p>
      </div>
    </div>

    <div class="system-card red">
      <Flame size={60} class="flame play-icon"/>
      <div className="info-benefit">
        <h3>Rachas de fuego</h3>
      <p>Mantén tu racha diaria activa. Cada día consecutivo multiplica tu poder y te acerca a la grandeza.</p>
      </div>
    </div>

    <div class="system-card blue">
      <Trophy size={60} class="trophy play-icon"/>
      <div className="info-benefit">
        <h3>Logros legendarios</h3>
        <p>Desde común hasta legendario. Desbloquea insignias especiales y demuestra tu dedicación.</p>
      </div>
    </div>

    <div class="system-card yellow">
      <Star size={60} class="star play-icon"/>
      <div className="info-benefit">
        <h3>Niveles infinitos</h3>
        <p>Sin límites. Sube de nivel constantemente y demuestra que eres imparable.</p>
      </div>
    </div>
    
  </div>
      </section>


      {/* Sección final */}
<section class="seccion-final">
  <div class="final-cta">
    <div className="header-final">
      <div class="banner">
        <Sparkles size={22} className=""/>
        Tu mejor versión te está esperando
      </div>
    </div>
    <div className="info-final">
        <h2 class="cta-title">¿Listo para convertirte en el <span className="heroe">héroe de tu propia historia?</span></h2>
      <p class="cta-description">
        Únete a más de <strong>1,000 jugadores</strong> que ya están conquistando sus metas.<br />
        Empieza gratis hoy y transforma tu vida en la aventura que siempre soñaste.
      </p>
      <Button onClick={() => navegar("/autenticacion")} className="botones-principales boton-primario grande">
                    <Rocket/>Empieza Tu Aventura  <ArrowRight/>
                  </Button>
    </div>
  

                  

<ul className="cta-benefits">
  <li><CheckCircle className="check-icon" /> Gratis para siempre</li>
  <li><CheckCircle className="check-icon" /> Sin tarjeta de crédito</li>
  <li><CheckCircle className="check-icon" /> Empieza en 30 segundos</li>
</ul>

  </div>
  
</section>


      {/* Pie de página */}
      <footer class="hq-footer">
  <div class="footer-logo">
    <div className="i logo">
          <Sparkles size={46} className="logoIcon" />
          <h1 className="titulo-">HabitQuest</h1>
        </div>
    <p class="footer-tagline">
      Transforma tu vida, un hábito a la vez.<br />
      <strong>Juega, Evoluciona y  Conquista.</strong>
    </p>
  </div>

  <p class="footer-note">
    © 2025 HabitQuest. Hecho con ❤️  para personas que quieren más de la vida.
  </p>

  <nav class="footer-links">
    <a href="/terminos">Términos</a>
    <a href="/privacidad">Privacidad</a>
    <a href="/contacto">Contacto</a>
  </nav>
</footer>

    </div>
  );
};

export default Inicio;
