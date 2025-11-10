import { useNotificacion } from "../Hooks/useNotificacion";
import "../Estilos/stylesComponentes/Notificaciones.css";

const Notificaciones = () => {
  const { notificaciones } = useNotificacion();
  
  return (
    <div className="notificaciones-container">
      {notificaciones.map((n) =>
        n.visible ? (
          <div key={n.id} className={`notificacion ${n.tipo}`}>
            <div className="notificacion-contenido">
              <strong className="notificacion-titulo">{n.title}</strong>
              <p className="notificacion-descripcion">{n.description}</p>
            </div>
            {/* Si deseas un botón de cierre manual, descomenta la siguiente línea */}
            {/* <button onClick={n.onClose} className="notificacion-cerrar">X</button> */}
          </div>
        ) : null
      )}
    </div>
  );
};

export default Notificaciones;
