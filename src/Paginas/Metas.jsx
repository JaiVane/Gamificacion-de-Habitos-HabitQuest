import React, { useState, useEffect } from "react";
import { useNotificacion } from "../Hooks/useNotificacion";
import { Flag, Plus, Calendar, TrendingUp, CheckCircle2, Target, Pen } from "lucide-react";
import "../Estilos/stylesPaginas/Metas.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import { getMetasPorUsuario, crearMeta, actualizarMeta, eliminarMeta } from "../Api/metasApi";
import CategoriasSelector from "../Componentes/CategoriasSelector";
import HabitosSelector from "../Componentes/HabitosSelector";
import Modal from "../Componentes/Modal";

const mapEstadoToEtiqueta = (estado) => {
  switch (estado) {
    case "En progreso": return <span className="etiqueta azul">En progreso</span>;
    case "Completada":  return <span className="etiqueta verde">Completada</span>;
    default:            return <span className="etiqueta gris">Pendiente</span>;
  }
};

export default function MetasPersonal() {
  const { mostrarMensaje } = useNotificacion();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [metas, setMetas] = useState([]);
  const [editando, setEditando] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    valorObjetivo: "",
    fechaLimite: "",
    categoriaId: "",
    habitosIds: [],
  });

  const cargarPersonales = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("userId");
      const data = await getMetasPorUsuario(userId);
      setMetas(data);
    } catch (error) {
      console.error("Error cargando metas personales:", error);
      mostrarMensaje("Error", "No se pudieron cargar las metas.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { cargarPersonales(); }, []);

  const abrirCrear = () => {
    setEditando(null);
    setFormData({
      titulo: "",
      descripcion: "",
      valorObjetivo: "",
      fechaLimite: "",
      categoriaId: "",
      habitosIds: [],
    });
    setMostrarFormulario(true);
  };

  const abrirEditar = (meta) => {
    setEditando(meta);
    setFormData({
      titulo: meta.titulo,
      descripcion: meta.descripcion,
      valorObjetivo: meta.valorObjetivo,
      fechaLimite: (meta.fechaLimite || "").slice(0, 10),
      categoriaId: meta.categoriaId,
      // Si quieres editar hábitos, deberás cargar los ids asociados desde un endpoint específico
      habitosIds: [],
    });
    setMostrarFormulario(true);
  };

  const cerrarModalPersonal = () => {
    setMostrarFormulario(false);
    setEditando(null);
  };

  const submitPersonal = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        valorObjetivo: Number(formData.valorObjetivo),
      };

      if (editando) {
        await actualizarMeta(editando.id, payload);
        mostrarMensaje("Meta actualizada", `${formData.titulo} guardada.`);
      } else {
        await crearMeta(payload);
        mostrarMensaje("¡Meta creada!", `${formData.titulo} añadida.`);
      }
      cerrarModalPersonal();
      await cargarPersonales();
    } catch (error) {
      console.error("Error guardando meta:", error);
      // Intenta mostrar el mensaje del backend si viene en problem details
      const msg = error?.response?.data?.mensaje || "No se pudo guardar la meta.";
      mostrarMensaje("Error", msg);
    }
  };

  const eliminarHandler = async (id, titulo) => {
    if (!confirm(`¿Eliminar la meta "${titulo}"?`)) return;
    try {
      await eliminarMeta(id);
      mostrarMensaje("Meta eliminada", `"${titulo}" fue eliminada.`);
      await cargarPersonales();
    } catch (error) {
      console.error("Error eliminando meta:", error);
      const msg = error?.response?.data?.mensaje || "No se pudo eliminar la meta.";
      mostrarMensaje("Error", msg);
    }
  };

  const totalPendientes = metas.filter((m) => m.estado === "Pendiente").length;
  const totalCompletadas = metas.filter((m) => m.estado === "Completada").length;
  const totalEnProgreso = metas.filter((m) => m.estado === "En progreso").length;
  const progresoTotal =
    metas.length > 0
      ? Math.round(
          (metas.reduce((acc, m) => acc + (m.valorObjetivo ? m.valorActual / m.valorObjetivo : 0), 0) / metas.length) * 100
        )
      : 0;

  return (
    <div className="pagina-metas">
      <div className="contenido-dashboard">
        <main className="contenido-principal">
          {/* Encabezado */}
          <div className="encabezado-metas">
            <div>
              <h1 className="titulo-metas">
                <Flag className="icono-flag" size={48} /> Mis Metas
              </h1>
              <p className="subtitulo">Establece objetivos y alcanza nuevas alturas</p>
            </div>
            <button className="boton-nueva-meta" onClick={abrirCrear}>
              <Plus className="icono-plus" /> Nueva Meta
            </button>
          </div>

          {/* Modal crear/editar meta personal */}
          <Modal
            isOpen={mostrarFormulario}
            onClose={cerrarModalPersonal}
            title={
              <span style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Pen size={32} className="icon-" /> {editando ? "Editar Meta" : "Crear Nueva Meta"}
              </span>
            }
            subtitle={editando ? "Actualiza tu objetivo" : "Define un nuevo objetivo para conquistar"}
          >
            <form className="modal-formulario" onSubmit={submitPersonal}>
              <label className="modal-label">
                Título de la meta
                <input
                  className="modal-input"
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </label>

              <label className="modal-label">
                Descripción
                <textarea
                  className="modal-textarea"
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </label>

              <div className="campos-en-linea">
                <label className="modal-label">
                  Cantidad meta 
                  <input
                    className="modal-input"
                    type="number"
                    placeholder="Ej: 10 repeticiones" 
                    value={formData.valorObjetivo}
                    onChange={(e) => setFormData({ ...formData, valorObjetivo: e.target.value })}
                    required
                  />
                </label>

                <CategoriasSelector
                  value={formData.categoriaId}
                  onChange={(id) => setFormData({ ...formData, categoriaId: id })}
                  label="Categoría"
                />
              </div>

              <HabitosSelector
                value={formData.habitosIds}
                onChange={(ids) => setFormData({ ...formData, habitosIds: ids })}
              />

<label className="modal-label">
  Fecha Objetivo de la Meta
  <DatePicker
    selected={formData.fechaLimite ? new Date(formData.fechaLimite) : null}
    onChange={(date) => setFormData({ ...formData, fechaLimite: date.toISOString().slice(0, 10) })}
    dateFormat="yyyy-MM-dd"
    className="modal-input"
    placeholderText="Selecciona una fecha"
    minDate={new Date()}  
  />
</label>

              <div className="modal-actions">
                <button type="submit" className="modal-boton-crear">
                  {editando ? "Guardar cambios" : "Crear Meta"}
                </button>
              </div>
            </form>
          </Modal>

          {/* Resumen personales */}
          <section className="resumen-metas">
            <div className="tarjeta-resumen">
              <div className="header">
                <Target className="icon" size={30} />
                <p>En progreso</p>
              </div>
              <h3>{totalEnProgreso}</h3>
            </div>

            <div className="tarjeta-resumen">
              <div className="header">
                <CheckCircle2 className="icon verde" size={30} />
                <p>Completadas</p>
              </div>
              <h3>{totalCompletadas}</h3>
            </div>

            <div className="tarjeta-resumen">
              <div className="header">
                <TrendingUp className="icon naranja" size={30} />
                <p>Progreso total</p>
              </div>
              <h3>{progresoTotal} %</h3>
            </div>
          </section>

          {/* Lista de metas personales */}
          <section className="lista-metas">
            {loading && metas.length === 0 ? <p className="texto-secundario">Cargando...</p> : null}
            {metas.map((meta) => (
              <div key={meta.id} className="tarjeta-meta">
                <div className="encabezado-tarjeta">
                  <h2>{meta.titulo}</h2>
                  {mapEstadoToEtiqueta(meta.estado)}
                </div>

                <p>{meta.descripcion}</p>

                <div className="progreso">
                  <p>Progreso</p>
                  <progress value={meta.valorActual} max={meta.valorObjetivo}></progress>
                  <span>{meta.valorActual} / {meta.valorObjetivo}</span>
                </div>

                <div className="detalles">
                  <div className="fecha">
                    <Calendar className="icono-fecha" />
                    <span>Fecha límite: {new Date(meta.fechaLimite).toLocaleDateString("es-ES")}</span>
                  </div>
                  <span className="categoria">{meta.categoriaNombre ?? "Sin categoría"}</span>
                </div>

                <div className="acciones-tarjeta">
                  <button className="btn-accion" onClick={() => abrirEditar(meta)}>Editar</button>
                  <button className="btn-accion peligro" onClick={() => eliminarHandler(meta.id, meta.titulo)}>Eliminar</button>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
