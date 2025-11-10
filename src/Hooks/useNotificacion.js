import { useEffect, useState } from "react";

const LIMITE_NOTIFICACIONES = 1;
const TIEMPO_ELIMINAR = 3000; // 3 segundos

let contador = 0;

function generarId() {
  contador = (contador + 1) % Number.MAX_SAFE_INTEGER;
  return contador.toString();
}

const tiposAccion = {
  AGREGAR: "AGREGAR",
  ACTUALIZAR: "ACTUALIZAR",
  OCULTAR: "OCULTAR",
  ELIMINAR: "ELIMINAR",
};

const temporizadores = new Map();
let estadoMemoria = { notificaciones: [] };
const escuchas = [];

function despachar(accion) {
  estadoMemoria = reductor(estadoMemoria, accion);
  escuchas.forEach((escucha) => escucha(estadoMemoria));
}

function agregarAColaEliminar(id) {
  if (temporizadores.has(id)) return;

  const tiempo = setTimeout(() => {
    temporizadores.delete(id);
    despachar({ tipo: tiposAccion.ELIMINAR, id });
  }, TIEMPO_ELIMINAR);

  temporizadores.set(id, tiempo);
}

function reductor(estado, accion) {
  switch (accion.tipo) {
    case tiposAccion.AGREGAR:
      return {
        ...estado,
        notificaciones: [accion.notificacion, ...estado.notificaciones].slice(
          0,
          LIMITE_NOTIFICACIONES
        ),
      };

    case tiposAccion.ACTUALIZAR:
      return {
        ...estado,
        notificaciones: estado.notificaciones.map((n) =>
          n.id === accion.notificacion.id
            ? { ...n, ...accion.notificacion }
            : n
        ),
      };

    case tiposAccion.OCULTAR:
      const id = accion.id;
      if (id) agregarAColaEliminar(id);
      return {
        ...estado,
        notificaciones: estado.notificaciones.map((n) =>
          n.id === id || id === undefined ? { ...n, visible: false } : n
        ),
      };

    case tiposAccion.ELIMINAR:
      if (accion.id === undefined) return { ...estado, notificaciones: [] };
      return {
        ...estado,
        notificaciones: estado.notificaciones.filter((n) => n.id !== accion.id),
      };

    default:
      return estado;
  }
}

function crearNotificacion({ titulo, mensaje, tipo = "info" }) {
  const id = generarId();

  const actualizar = (nueva) =>
    despachar({
      tipo: tiposAccion.ACTUALIZAR,
      notificacion: { ...nueva, id },
    });

  const ocultar = () => despachar({ tipo: tiposAccion.OCULTAR, id });

  despachar({
    tipo: tiposAccion.AGREGAR,
    notificacion: {
      id,
      titulo,
      mensaje,
      tipo,
      visible: true,
      onClose: () => ocultar(),
    },
  });

  return { id, actualizar, ocultar };
}

export function useNotificacion() {
  const [estado, setEstado] = useState(estadoMemoria);

  useEffect(() => {
    escuchas.push(setEstado);
    return () => {
      const index = escuchas.indexOf(setEstado);
      if (index > -1) escuchas.splice(index, 1);
    };
  }, []);

  return {
    ...estado,
    crearNotificacion,
    ocultar: (id) => despachar({ tipo: tiposAccion.OCULTAR, id }),
  };
}
