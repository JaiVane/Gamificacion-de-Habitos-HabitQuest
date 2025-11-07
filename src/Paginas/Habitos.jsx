import React, { useState } from "react";
import "../Estilos/stylesPaginas/Habitos.css";

import  HabitCard  from "../Componentes/HabitCard";
import { Plus, Trash2, Edit, AlertCircle, X } from "lucide-react";

export const Habitos = () => {
  const [habitos, setHabitos] = useState([
    {
      id: "1",
      nombre: "Ejercicio matutino",
      descripcion: "30 minutos de actividad física",
      xpReward: 50,
      racha: 7,
      completado: false,
      frequency: "Diaria",
      xpPenalty: 25,
    },
    {
      id: "2",
      nombre: "Leer 20 páginas",
      descripcion: "Leer un libro de desarrollo personal",
      xpReward: 30,
      racha: 5,
      completado: false,
      frequency: "Diaria",
      xpPenalty: 15,
    },
  ]);

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [habitoEditando, setHabitoEditando] = useState(null);
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    xpReward: 25,
    xpPenalty: 0,
    frequency: "Diaria",
  });

  const alternarCompletado = (id) => {
    setHabitos((prev) =>
      prev.map((h) =>
        h.id === id ? { ...h, completado: !h.completado } : h
      )
    );
  };

  const eliminarHabito = (id) => {
    setHabitos((prev) => prev.filter((h) => h.id !== id));
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    if (habitoEditando) {
      setHabitos((prev) =>
        prev.map((h) =>
          h.id === habitoEditando.id
            ? {
                ...h,
                nombre: formulario.nombre,
                descripcion: formulario.descripcion,
                xpReward: formulario.xpReward,
                xpPenalty: formulario.xpPenalty,
                frequency: formulario.frequency,
              }
            : h
        )
      );
    } else {
      const nuevoHabito = {
        id: Date.now().toString(),
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        xpReward: formulario.xpReward,
        xpPenalty: formulario.xpPenalty,
        frequency: formulario.frequency,
        racha: 0,
        completado: false,
      };
      setHabitos((prev) => [...prev, nuevoHabito]);
    }

    setFormulario({ nombre: "", descripcion: "", xpReward: 25, xpPenalty: 0, frequency: "Diaria" });
    setHabitoEditando(null);
    setDialogoAbierto(false);
  };

  const abrirDialogoEdicion = (habito) => {
    // Buscar el hábito completo en el estado si solo recibimos un objeto parcial
    const habitoCompleto = habitos.find(h => h.id === habito.id) || habito;
    setHabitoEditando(habitoCompleto);
    setFormulario({
      nombre: habitoCompleto.nombre || habito.name || habitoCompleto.nombre,
      descripcion: habitoCompleto.descripcion || habito.description || habitoCompleto.descripcion,
      xpReward: habitoCompleto.xpReward || habito.xpReward || habitoCompleto.recompensaXP || 25,
      xpPenalty: habitoCompleto.xpPenalty || habito.xpPenalty || 0,
      frequency: habitoCompleto.frequency || habito.frequency || "Diaria",
    });
    setDialogoAbierto(true);
  };

  const abrirDialogoNuevo = () => {
    setHabitoEditando(null);
    setFormulario({ nombre: "", descripcion: "", xpReward: 25, xpPenalty: 0, frequency: "Diaria" });
    setDialogoAbierto(true);
  };

  const habitosPendientes = habitos.filter((h) => !h.completado).length;

  return (
    <div className="pagina-habitos">
      <div className="contenido-principal">
        <main className="contenido">
          {habitosPendientes > 0 && (
            <div className="alerta-pendientes">
              <AlertCircle size={20} className="icono-alerta" />
              <div className="alerta-contenido">
                <div className="alerta-titulo">¡Atención!</div>
                <div className="alerta-mensaje">
                  Tienes {habitosPendientes} hábito(s) pendiente(s) hoy. ¡Completa tus hábitos para no perder tu racha y XP!
                </div>
              </div>
            </div>
          )}

          <div className="encabezado">
            <div >
              <h1 className="titulo">Mis Hábitos</h1>
              <p className="subtitulo">
                Gestiona y da seguimiento a tus hábitos diarios
              </p>
            </div>
            <button className="boton-nuevo" onClick={abrirDialogoNuevo}>
              <Plus size={18} /> Nuevo Hábito
            </button>
          </div>

          {dialogoAbierto && (
            <div className="modal-fondo" onClick={() => setDialogoAbierto(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-titulo">
                      {habitoEditando ? "Editar Hábito" : "Crear Nuevo Hábito"}
                    </h2>
                    {!habitoEditando && (
                      <p className="modal-subtitulo">
                        Define tu nuevo hábito y gana XP al completarlo
                      </p>
                    )}
                  </div>
                  <button
                    className="modal-cerrar"
                    onClick={() => setDialogoAbierto(false)}
                    type="button"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={enviarFormulario} className="modal-formulario">
                  <label className="modal-label">
                    Nombre del hábito
                    <input
                      type="text"
                      value={formulario.nombre}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          nombre: e.target.value,
                        })
                      }
                      placeholder="Ej: Ejercicio matutino"
                      required
                      className="modal-input"
                    />
                  </label>

                  <label className="modal-label">
                    Descripción
                    <textarea
                      value={formulario.descripcion}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          descripcion: e.target.value,
                        })
                      }
                      placeholder="Describe tu hábito..."
                      required
                      className="modal-textarea"
                      rows="4"
                    />
                  </label>

                  <label className="modal-label">
                    XP Recompensa
                    <input
                      type="number"
                      value={formulario.xpReward}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          xpReward: parseInt(e.target.value),
                        })
                      }
                      required
                      className="modal-input"
                    />
                  </label>

                  <label className="modal-label">
                    XP Penalización
                    <input
                      type="number"
                      value={formulario.xpPenalty}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          xpPenalty: parseInt(e.target.value) || 0,
                        })
                      }
                      className="modal-input"
                    />
                  </label>

                  <label className="modal-label">
                    Frecuencia
                    <select
                      value={formulario.frequency}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          frequency: e.target.value,
                        })
                      }
                      className="modal-select"
                    >
                      <option value="Diaria">Diaria</option>
                      <option value="Semanal">Semanal</option>
                      <option value="Mensual">Mensual</option>
                    </select>
                  </label>

                  <button type="submit" className="modal-boton-crear">
                    {habitoEditando ? "Guardar cambios" : "Crear hábito"}
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="lista-habitos">
            {habitos.length === 0 ? (
              <p className="mensaje-vacio">
                No tienes hábitos aún. ¡Crea tu primer hábito!
              </p>
            ) : (
              habitos.map((habito) => (
                <HabitCard
                  key={habito.id}
                  id={habito.id}
                  name={habito.nombre}
                  description={habito.descripcion}
                  xpReward={habito.xpReward || habito.recompensaXP}
                  streak={habito.racha}
                  completed={habito.completado}
                  frequency={habito.frequency || "Diaria"}
                  xpPenalty={habito.xpPenalty || 0}
                  onToggle={alternarCompletado}
                  onEdit={abrirDialogoEdicion}
                  onDelete={eliminarHabito}
                />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Habitos;
