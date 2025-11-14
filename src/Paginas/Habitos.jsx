import React, { useState, useMemo, useEffect } from "react";
import "../Estilos/stylesPaginas/Habitos.css";
import  HabitCard  from "../Componentes/HabitCard";
import { Plus, FolderPlus, AlertCircle, X } from "lucide-react";
import { useHabits } from "../Context/HabitosContext";
import { useAuth } from "../Context/AuthContext";
import { crearCategoria, getCategorias } from "../Api/categoriaApi";
import { useNotificacion } from "../Hooks/useNotificacion";

export const Habitos = () => {
  
  //  Consumimos el contexto para obtener los hábitos y las funciones
  const {
    habitos,
    addHabit,
    updateHabit,
    removeHabit,
    toggleHabitCompletion,
    markDayForHabit, 
    getHistoryForHabit,
  } = useHabits();
  const { usuario } = useAuth();
  const { mostrarMensaje } = useNotificacion();
  
  const FORMULARIO_INICIAL = {
    nombre: "",
    descripcion: "",
    categoriaId: "",
    frequency: "Diaria",
  };
  

  const [dialogoAbierto, setDialogoAbierto] = useState(false);
  const [habitoEditando, setHabitoEditando] = useState(null);
  const [formulario, setFormulario] = useState(FORMULARIO_INICIAL);
  const [filtroActivo, setFiltroActivo] = useState("Todos");
  const [categorias, setCategorias] = useState([]);
  const [dialogoCategoriaAbierto, setDialogoCategoriaAbierto] = useState(false);
  const [formularioCategoria, setFormularioCategoria] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    const cargarCategorias = async () => {
      try {
        const categoriasObtenidas = await getCategorias(); // ✅ sin parámetros
        setCategorias(categoriasObtenidas);
      } catch (error) {
        console.error("Error al cargar las categorías:", error);
        mostrarMensaje("Error", "No se pudieron cargar las categorías.", "error");
      }
    };
    cargarCategorias();
  }, []); // 👈 no dependas de usuario, el token ya lo identifica

  

  const alternarCompletado = (id) => {
    const habito = habitos.find(h => h.id === id);
    toggleHabitCompletion(id);
  };
  
  const eliminarHabito = (id) => {
    removeHabit(id);
  };

  const marcarDiaHabito = (id) => {
    markDayForHabit(id);
  };

  const verHistorialHabito = async (id) => {
    return await getHistoryForHabit(id);
  };
  

  const enviarFormulario = async (e) => {
    e.preventDefault();
    let xpReward, xpPenalty;
    switch (formulario.frequency) {
      case "Semanal":
        xpReward = 100;
        xpPenalty = 40;
        break;
      case "Mensual":
        xpReward = 300;
        xpPenalty = 120;
        break;
      case "Diaria":
      default:
        xpReward = 25;
        xpPenalty = 10;
        break;
    }

    if (habitoEditando) {
      // 3. Usamos la función del contexto para actualizar
      await updateHabit(habitoEditando.id, {
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        frecuencia: formulario.frequency,
        categoriaId: formulario.categoriaId,
      });
    } else {
      // 4. Usamos la función del contexto para añadir
      await addHabit({
        nombre: formulario.nombre,
        descripcion: formulario.descripcion,
        frecuencia: formulario.frequency,
        xp: xpReward, // El backend debería asignar esto, pero lo enviamos si es necesario
        categoriaId: formulario.categoriaId,
      });
    }

    setFormulario(FORMULARIO_INICIAL);
    setHabitoEditando(null);
    setDialogoAbierto(false);
  };

  const abrirDialogoEdicion = (habito) => {
    const habitoCompleto = habitos.find(h => h.id === habito.id) || habito;
    setHabitoEditando(habitoCompleto);
    setFormulario({
      nombre: habitoCompleto.nombre || habito.name || habitoCompleto.nombre,
      descripcion: habitoCompleto.descripcion || habito.description || habitoCompleto.descripcion,
      frequency: habitoCompleto.frequency || "Diaria",
      categoriaId: habitoCompleto.categoriaId || "",
    });
    setDialogoAbierto(true);
  };

  const abrirDialogoNuevo = () => {
    setHabitoEditando(null);
    setFormulario(FORMULARIO_INICIAL);
    setDialogoAbierto(true);
  };

  const enviarFormularioCategoria = async (e) => {
    e.preventDefault();
    // 📋 Log para depuración
  console.log("📤 Enviando creación de categoría:", {
    nombre: formularioCategoria.nombre,
    descripcion: formularioCategoria.descripcion,
  });
    try {
      const nuevaCategoria = await crearCategoria({
        nombre: formularioCategoria.nombre,
        descripcion: formularioCategoria.descripcion,
      });
  
      setCategorias([...categorias, nuevaCategoria]);
      mostrarMensaje("Categoría Creada", `La categoría "${nuevaCategoria.nombre}" ha sido creada.`, "success");
  
      setFormularioCategoria({ nombre: "", descripcion: "" });
      setDialogoCategoriaAbierto(false);
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      mostrarMensaje("Error", "No se pudo crear la categoría.", "error");
    }
  };
  

  // Objeto para contar hábitos por frecuencia, usando useMemo para optimizar
  const conteoPorFrecuencia = useMemo(() => {
    const conteo = {
      "Todos": habitos.length,
      "Diaria": habitos.filter(h => h.frecuencia === 'Diaria').length,
      "Semanal": habitos.filter(h => h.frecuencia === 'Semanal').length,
      "Mensual": habitos.filter(h => h.frecuencia === 'Mensual').length,
    };
    return conteo;
  }, [habitos]);
  const habitosPendientes = habitos.filter(
    (h) => h.frecuencia === "Diaria" && !h.cumplido
  ).length;

  const categoriasFiltro = ["Todos", "Diaria", "Semanal", "Mensual"];

  const habitosFiltrados = useMemo(() => {
    if (filtroActivo === "Todos") {
      return habitos;
    }
    return habitos.filter((habito) => habito.frecuencia === filtroActivo);
  }, [habitos, filtroActivo]);





  

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
            <div>
              <h1 className="titulo">Mis Hábitos</h1>
              <p className="subtitulo">
                Gestiona y da seguimiento a tus hábitos diarios
              </p>
            </div>
            <div className="encabezado-acciones">
              <div className="contador-total-habitos">
                <span className="contador-etiqueta">Hábitos Totales</span>
                <span className="contador-valor">{habitos.length}</span>
              </div>
              <button className="boton-nueva-categoria" onClick={() => setDialogoCategoriaAbierto(true)}>
                <FolderPlus size={18} /> Crear Categoría
              </button>
              <button className="boton-nuevo" onClick={abrirDialogoNuevo}>
                <Plus size={18} /> Nuevo Hábito
              </button>
            </div>
          </div>

          <div className="filtros-habitos">
            {categoriasFiltro.map((categoria) => (
              <button
                key={categoria}
                className={`filtro-boton ${
                  filtroActivo === categoria ? "activo" : ""
                }`}
                onClick={() => setFiltroActivo(categoria)}
              >
                {categoria} ({conteoPorFrecuencia[categoria] || 0})
              </button>
            ))}
          </div>

            {/*MODAL HABITOS*/}
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
                      className="modal-textarea"
                      rows="4"
                    />
                  </label>

                  <label className="modal-label">
                    Categoría
                    <select
                      value={formulario.categoriaId}
                      onChange={(e) =>
                        setFormulario({
                          ...formulario,
                          categoriaId: e.target.value,
                        })
                      }
                      className="modal-select"
                    >
                      <option value="">Sin categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
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

          {dialogoCategoriaAbierto && (
            <div className="modal-fondo" onClick={() => setDialogoCategoriaAbierto(false)}>
              <div className="modal" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                  <div>
                    <h2 className="modal-titulo">Crear Nueva Categoría</h2>
                    <p className="modal-subtitulo">
                      Organiza tus hábitos en grupos personalizados.
                    </p>
                  </div>
                  <button
                    className="modal-cerrar"
                    onClick={() => setDialogoCategoriaAbierto(false)}
                    type="button"
                  >
                    <X size={20} />
                  </button>
                </div>
                <form onSubmit={enviarFormularioCategoria} className="modal-formulario">
                  <label className="modal-label">
                    Nombre de la categoría
                    <input
                      type="text"
                      value={formularioCategoria.nombre}
                      onChange={(e) =>
                        setFormularioCategoria({
                          ...formularioCategoria,
                          nombre: e.target.value,
                        })
                      }
                      placeholder="Ej: Salud y Bienestar"
                      required
                      className="modal-input"
                    />
                  </label>

                  <label className="modal-label">
                    Descripción (opcional)
                    <textarea
                      value={formularioCategoria.descripcion}
                      onChange={(e) =>
                        setFormularioCategoria({
                          ...formularioCategoria,
                          descripcion: e.target.value,
                        })
                      }
                      placeholder="Describe el propósito de esta categoría..."
                      className="modal-textarea"
                      rows="3"
                    />
                  </label>

                  <button type="submit" className="modal-boton-crear">
                    Crear Categoría
                  </button>
                </form>
              </div>
            </div>
            
          )}

{categorias.length === 0 ? (
  <p>Cargando categorías...</p>
) : (
  <div className="lista-habitos">
    {habitosFiltrados.map((habito) => {
      const categoriaNombre =
        categorias.find(
          (c) =>
            c.id?.trim().toLowerCase() === habito.categoriaId?.trim().toLowerCase()
        )?.nombre || "Sin categoría";

        
        console.log("🧩 Hábito con categoría:", {
          habito: habito.nombre,
          categoriaId: habito.categoriaId,
          categoriaNombre
        });
        
      return (
        <HabitCard
          key={habito.id}
          id={habito.id}
          name={habito.nombre}
          description={habito.descripcion}
          xp={habito.xp}
          xpReward={habito.xpReward}
          streak={habito.diasConsecutivos}
          completed={habito.cumplido}
          frequency={habito.frecuencia}
          xpPenalty={habito.xpPenalty || 0}
          onToggle={alternarCompletado}
          onEdit={abrirDialogoEdicion}
          onDelete={eliminarHabito}
          onMarkDay={marcarDiaHabito}
          onShowHistory={verHistorialHabito}
          categoriaNombre={categoriaNombre}
        />
      );
    })}
  </div>
)}


        </main>
      </div>
    </div>
  );
};

export default Habitos;
