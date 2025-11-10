import { useNotificacion } from "../Hooks/useNotificacion";
import "../Estilos/stylesComponentes/Notificaciones.css";

const Notificaciones = () => {
  const { notificaciones } = useNotificacion();

  return (
    <div className="notificaciones-container">
      {notificaciones.map((n) =>
        n.visible ? (
          <div key={n.id} className={`notificacion ${n.tipo}`}>
            <strong>{n.titulo}</strong>
            <p>{n.mensaje}</p>
            <button onClick={n.onClose}>Cerrar</button>
          </div>
        ) : null
      )}
    </div>
  );
};

export default Notificaciones;
