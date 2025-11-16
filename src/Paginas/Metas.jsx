import React, { useState, useEffect } from "react";
import { useNotificacion } from "../Hooks/useNotificacion";
import { Flag, Plus, Calendar, TrendingUp, CheckCircle2, Target, X, Pen } from "lucide-react";
import "../Estilos/stylesPaginas/Metas.css";
import { getMetasPorUsuario, crearMeta, actualizarMeta, eliminarMeta } from "../Api/metasApi";

const Metas = () => {
  const { mostrarMensaje } = useNotificacion();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [metas, setMetas] = useState([]); // ✅ inicializar estado

  useEffect(() => {
    const cargarMetas = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await getMetasPorUsuario(userId);
        setMetas(data);
      } catch (error) {
        console.error("Error cargando metas:", error);
      }
    };
    cargarMetas();
  }, []);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    valorObjetivo: "",
    fechaLimite: "",
    categoria: "",
  });

  const crearMetaHandler = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem("userId");
      const nuevaMeta = { ...formData, usuarioId: userId };
      const metaCreada = await crearMeta(nuevaMeta);
      setMetas([...metas, metaCreada]);
      mostrarMensaje("¡Meta creada!", `${formData.titulo} ha sido añadida a tus metas.`);
      setFormData({ titulo: "", descripcion: "", valorObjetivo: "", fechaLimite: "", categoria: "" });
      setMostrarFormulario(false);
    } catch (error) {
      console.error("Error creando meta:", error);
    }
  };

  const obtenerEtiquetaEstado = (estado) => {
    switch (estado) {
      case "activa":
        return <span className="etiqueta azul">En progreso</span>;
      case "completada":
        return <span className="etiqueta verde">Completada</span>;
      case "pendiente":
        return <span className="etiqueta gris">Pendiente</span>;
      default:
        return null;
    }
  };

  return (
    <div className="pagina-metas">
      <div className="contenido-dashboard">
        <main className="contenido-principal">
          <div className="encabezado-metas">
            <div>
              <h1 className="titulo-metas">
                <Flag className="icono-flag" size={48} /> Mis Metas
              </h1>
              <p className="subtitulo">Establece objetivos y alcanza nuevas alturas</p>
            </div>

            <button className="boton-nueva-meta" onClick={() => setMostrarFormulario(!mostrarFormulario)}>
              <Plus className="icono-plus" /> Nueva Meta
            </button>
          </div>

          {mostrarFormulario && (
            <div className="modal-fondo" onClick={() => setMostrarFormulario(false)}>
              <div className="modal-meta" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-titulo"><Pen size={32} className="icon-"/>Crear Nueva Meta</h2>
                    <p className="modal-subtitulo">Define un nuevo objetivo para conquistar</p>
                  </div>
                  <button className="modal-cerrar" onClick={() => setMostrarFormulario(false)}>
                    <X size={24} />
                  </button>
                </div>

                <form className="modal-formulario" onSubmit={crearMetaHandler}>
                  <label className="modal-label">
                    Título de la meta
                    <input
                      className="modal-input"
                      type="text"
                      value={formData.titulo}
                      onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                      placeholder="Ej: Ahorrar para un viaje"
                      required
                    />
                  </label>
                  <label className="modal-label">
                    Descripción
                    <textarea
                      className="modal-textarea"
                      value={formData.descripcion}
                      onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                      placeholder="Describe los detalles de tu meta..."
                      required
                    />
                  </label>
                  <div className="campos-en-linea">
                    <label className="modal-label">
                      Valor objetivo
                      <input
                        className="modal-input"
                        type="number"
                        value={formData.valorObjetivo}
                        onChange={(e) => setFormData({ ...formData, valorObjetivo: e.target.value })}
                        placeholder="Ej: 1000"
                        required
                      />
                    </label>
                    <label className="modal-label">
                      Categoría
                      <input
                        className="modal-input"
                        type="text"
                        value={formData.categoria}
                        onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                        placeholder="Ej: Finanzas"
                        required
                      />
                    </label>
                  </div>
                  <label className="modal-label">
                    Fecha límite
                    <input className="modal-input" type="date" value={formData.fechaLimite} onChange={(e) => setFormData({ ...formData, fechaLimite: e.target.value })} required />
                  </label>
                  <button type="submit" className="modal-boton-crear">Crear Meta</button>
                </form>
              </div>
            </div>
          )}

          {/* Resumen de metas */}
          <section className="resumen-metas">
            <div className="tarjeta-resumen">
              <div className="header">
                <Target className="icon" size={30} />
                <p>Metas Activas</p>
              </div>
              <h3>{metas.filter((m) => m.estado === "activa").length}</h3>
            </div>

            <div className="tarjeta-resumen">
              <div className="header">
                <CheckCircle2 className="icon verde" size={30} />
                <p>Metas Completadas</p>
              </div>
              <h3>{metas.filter((m) => m.estado === "completada").length}</h3>
            </div>

            <div className="tarjeta-resumen">
              <div className="header">
                <TrendingUp className="icon naranja" size={30} />
                <p>Progreso Total</p>
              </div>
              <h3>
                {metas.length > 0
                  ? Math.round(
                      (metas.reduce((acc, m) => acc + m.valorActual / m.valorObjetivo, 0) / metas.length) * 100
                    )
                  : 0}
                %
              </h3>
            </div>
          </section>

          {/* Lista de metas */}
          <section className="lista-metas">
            {metas.map((meta) => (
              <div key={meta.id} className="tarjeta-meta">
                <div className="encabezado-tarjeta">
                  <h2>{meta.titulo}</h2>
                  {obtenerEtiquetaEstado(meta.estado)}
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
                  <span className="categoria">{meta.categoria}</span>
                </div>
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
};

export default Metas;
