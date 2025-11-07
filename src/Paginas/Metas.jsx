import React, { useState } from "react";
import { useNotificacion } from "../Hooks/useNotificacion";
import { Flag, Plus, Calendar, TrendingUp, CheckCircle2, Target } from "lucide-react";
import "../Estilos/stylesPaginas/Metas.css";

const Metas = () => {
  const { mostrarMensaje } = useNotificacion();
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [metas, setMetas] = useState([
    {
      id: "1",
      titulo: "Racha de 30 días",
      descripcion: "Mantener una racha consecutiva de 30 días completando hábitos",
      valorObjetivo: 30,
      valorActual: 18,
      fechaLimite: "2025-12-31",
      categoria: "Consistencia",
      estado: "activa",
    },
    {
      id: "2",
      titulo: "Alcanzar nivel 10",
      descripcion: "Subir al nivel 10 completando hábitos y ganando experiencia",
      valorObjetivo: 10,
      valorActual: 5,
      fechaLimite: "2025-11-30",
      categoria: "Progreso",
      estado: "activa",
    },
    {
      id: "3",
      titulo: "100 hábitos completados",
      descripcion: "Completar un total de 100 hábitos este mes",
      valorObjetivo: 100,
      valorActual: 67,
      fechaLimite: "2025-11-30",
      categoria: "Logros",
      estado: "activa",
    },
  ]);

  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    valorObjetivo: "",
    fechaLimite: "",
    categoria: "",
  });

  const crearMeta = (e) => {
    e.preventDefault();
    const nuevaMeta = {
      id: Date.now().toString(),
      ...formData,
      valorActual: 0,
      estado: "activa",
    };

    setMetas([...metas, nuevaMeta]);
    mostrarMensaje("¡Meta creada!", `${formData.titulo} ha sido añadida a tus metas.`);
    setFormData({ titulo: "", descripcion: "", valorObjetivo: "", fechaLimite: "", categoria: "" });
    setMostrarFormulario(false);
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
            <form className="formulario-meta" onSubmit={crearMeta}>
              <h3>Crear Nueva Meta</h3>
              <label>
                Título de la meta
                <input
                  type="text"
                  value={formData.titulo}
                  onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                  required
                />
              </label>
              <label>
                Descripción
                <textarea
                  value={formData.descripcion}
                  onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                  required
                />
              </label>
              <label>
                Valor objetivo
                <input
                  type="number"
                  value={formData.valorObjetivo}
                  onChange={(e) => setFormData({ ...formData, valorObjetivo: e.target.value })}
                  required
                />
              </label>
              <label>
                Categoría
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                  required
                />
              </label>
              <label>
                Fecha límite
                <input
                  type="date"
                  value={formData.fechaLimite}
                  onChange={(e) => setFormData({ ...formData, fechaLimite: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className="boton-guardar">Crear Meta</button>
            </form>
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
              <CheckCircle2 className="icon verde"  size={30}/>
              <p>Metas Completadas</p>
              </div>
              <h3>{metas.filter((m) => m.estado === "completada").length}</h3>
            </div>

            <div className="tarjeta-resumen">
              <div className="header">
              <TrendingUp className="icon naranja" size={30}/>
              <p>Progreso Total</p>
              </div>
              <h3>
                {Math.round(
                  (metas.reduce((acc, m) => acc + m.valorActual / m.valorObjetivo, 0) / metas.length) * 100
                )}
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
