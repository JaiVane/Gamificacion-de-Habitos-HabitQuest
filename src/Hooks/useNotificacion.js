import { useState, useCallback, useEffect } from 'react';

// Usamos un estado y escuchas fuera del componente para que sea global en toda la app.
let notificacionesState = [];
const listeners = new Set(); 

const despachar = () => {
  for (const listener of listeners) {
    listener([...notificacionesState]);
  }
};

const mostrarMensaje = ({ title, description, tipo = 'info' }) => {
  const id = Date.now();
  const nuevaNotificacion = {
    id,
    title,
    description,
    tipo,
    visible: true,
  };

  // Añadimos la nueva notificación y despachamos el cambio
  notificacionesState = [nuevaNotificacion, ...notificacionesState].slice(0, 5); // Limite de 5 notificaciones
  despachar();

  // Temporizador para ocultar la notificación
  setTimeout(() => {
    const notificacion = notificacionesState.find(n => n.id === id);
    if (notificacion) {
      notificacion.visible = false;
      despachar();

      // Remover completamente la notificación del DOM después de la animación de salida
      setTimeout(() => {
        notificacionesState = notificacionesState.filter(n => n.id !== id);
        despachar();
      }, 200); // Coincide con la duración de la animación CSS
    }
  }, 5000); // 5 segundos
};

export function useNotificacion() {
  const [notificaciones, setNotificaciones] = useState(notificacionesState);

  useEffect(() => {
    listeners.add(setNotificaciones);
    return () => {
      listeners.delete(setNotificaciones);
    };
  }, []);

  return { notificaciones, mostrarMensaje };
}
