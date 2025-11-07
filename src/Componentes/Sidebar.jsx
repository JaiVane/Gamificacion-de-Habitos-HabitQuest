import { NavLink } from "react-router-dom";
import { Home,  Trophy, Settings, User, ListChecks, Users, BarChart3, Flag, Sparkles } from "lucide-react";
import "../Estilos/stylesComponentes/Sidebar.css";

const items = [
  { titulo: "Dashboard", url: "/dashboard", icono: Home },
  { titulo: "Mis Hábitos", url: "/habitos", icono: ListChecks },
  { titulo: "Competición", url: "/tablaClasificacion", icono: Users },
  { titulo: "Estadísticas", url: "/estadisticas", icono: BarChart3 },
  { titulo: "Metas", url: "/metas", icono: Flag },
  { titulo: "Logros", url: "/logros", icono: Trophy },
  { titulo: "Perfil", url: "/perfil", icono: User },
  { titulo: "Configuración", url: "/configuracion", icono: Settings },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="icono-logo">
            <Sparkles className="icono" />
          </div>
          <div className="titulo-logo">
            <h1>HabitQuest</h1>
            <p>Tu aventura RPG</p>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink
            key={item.titulo}
            to={item.url}
            className={({ isActive }) =>
              isActive ? "nav-item activo" : "nav-item"
            }
          >
            <item.icono className="icono-nav" />
            <span className="texto-nav">{item.titulo}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
