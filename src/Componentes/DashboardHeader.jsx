import { useState, useEffect } from "react";
import "../Estilos/stylesComponentes/DashboardHeader.css";
import { LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const frasesMotivacionales = [
  "Cada día es una nueva oportunidad para mejorar.",
  "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
  "No cuentes los días, haz que los días cuenten.",
  "La disciplina es el puente entre metas y logros.",
  "Tu única limitación eres tú mismo.",
  "Los hábitos son la clave del éxito.",
  "El progreso, no la perfección, es lo que importa.",
  "Hoy es el día perfecto para comenzar.",
  "Pequeños pasos, grandes cambios.",
  "La constancia vence lo que la dicha no alcanza.",
  "Cree en ti mismo y todo será posible.",
  "El cambio comienza cuando decides actuar.",
  "Tu futuro depende de lo que hagas hoy.",
  "La motivación te pone en marcha, el hábito te mantiene en movimiento.",
  "No esperes el momento perfecto, créalo.",
  "Cada hábito es un voto por la persona que quieres ser.",
  "El mejor momento para plantar un árbol fue hace 20 años. El segundo mejor momento es ahora.",
  "La excelencia no es un acto, sino un hábito.",
  "Tus hábitos de hoy construyen tu mañana.",
  "El único mal hábito es no tener ninguno bueno.",
];

export default function DashboardHeader() {
  const { usuario, cerrarSesion } = useAuth(); // Obtenemos la función cerrarSesion
  const navigate = useNavigate();
  const [tiempoActual, setTiempoActual] = useState(new Date());
  const [frase] = useState(() => {
    const indiceAleatorio = Math.floor(Math.random() * frasesMotivacionales.length);
    return frasesMotivacionales[indiceAleatorio];
  });

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempoActual(new Date());
    }, 60000);

    return () => clearInterval(temporizador);
  }, []);

  const obtenerSaludo = () => {
    const hora = tiempoActual.getHours();
    if (hora < 12) return "Buenos días";
    if (hora < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  const formatearHora = () => {
    const horas = tiempoActual.getHours();
    const minutos = tiempoActual.getMinutes();
    const ampm = horas >= 12 ? "pm" : "am";
    const horas12 = horas % 12 || 12;
    const minutosFormateados = minutos.toString().padStart(2, "0");
    return `${horas12}:${minutosFormateados} ${ampm}`;
  };
  const [menuAbierto, setMenuAbierto] = useState(false);

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate("/"); // Redirigimos al inicio después de limpiar todo
  };


  return (
    <header className="dashboard-header">
      <div className="header-container">
        <div className="header-left">
          <h2 className="saludo-rpg">
            {obtenerSaludo()}, <span className="usuario">{usuario?.nombreUsuario || 'Aventurero'}</span>
          </h2>

          <p className="frase">{frase}</p>

          <p className="fecha-hora">
            {tiempoActual.toLocaleDateString("es-ES", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })} · {formatearHora()}
          </p>
        </div>

        <div className="header-right">
  <div className="avatar-menu" onClick={() => setMenuAbierto(!menuAbierto)}>
    {usuario?.avatar ? (
      <img src={usuario.avatar} alt="Avatar" className="avatar-imagen" />
    ) : (
      <div className="avatar-letras">
        {usuario?.nombre?.slice(0, 2).toUpperCase() || '??'}
      </div>
    )}

{menuAbierto && (
  <div className="menu-cuenta">
    <p className="menu-titulo">Mi Cuenta</p>

    <button onClick={() => navigate("/perfil")}>
      <span className="menu-icono"><User /></span> Mi perfil
    </button>

    <button onClick={handleCerrarSesion} className="cerrar-sesion">
      <span className="menu-icono"><LogOut color="#dc2626" /></span> Cerrar sesión
    </button>
  </div>
)}

  </div>
        </div>


      </div>
    </header>
  );
}
