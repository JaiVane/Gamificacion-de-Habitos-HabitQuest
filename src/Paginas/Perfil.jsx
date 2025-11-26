import React, { useState, useEffect } from "react";
import "../Estilos/stylesPaginas/Perfil.css";
import { Edit, Heart, Shield, Sword, Swords, Trophy, Award, Star } from "lucide-react";
import { useAuth } from "../Context/AuthContext";
import { useNotificacion } from "../Hooks/useNotificacion";
import { getUsuario } from "../Api/api";


const Perfil = () => {
  const [habitos, setHabitos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [editableUsuario, setEditableUsuario] = useState(null);
  const [archivoImagen, setArchivoImagen] = useState(null);

  const { usuario, actualizarUsuario, setUsuario } = useAuth();
  const { mostrarMensaje } = useNotificacion();

  useEffect(() => {
    const cargarHabitos = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await getUsuario(userId);
        setHabitos(data.habitos || []);
      } catch (error) {
        console.error("Error cargando hábitos en perfil:", error);
      }
    };
    cargarHabitos();
  }, []);

  // Al entrar en modo edición, tomamos una copia local del usuario
  const entrarEdicion = () => {
    setEditableUsuario({
      id: usuario.id,
      nombre: usuario.nombre || "",
      nombreUsuario: usuario.nombreUsuario || "",
      email: usuario.email || "",
      biografia: usuario.biografia || "",
      genero: usuario.genero || "prefiero-no-decir",
      rol: usuario.rol || "Guerrero",
      imagenPerfil: usuario.imagenPerfil || null,
      nivel: usuario.nivel || 1,
    });
    setModoEdicion(true);
  };

  const guardarCambios = async () => {
    try {
      // 1) Actualiza datos básicos
      await actualizarUsuario(editableUsuario);

      // 2) Si hay imagen seleccionada, súbela
      if (archivoImagen) {
        const resultado = await subirFotoPerfil(archivoImagen);
        setEditableUsuario(prev => ({ ...prev, imagenPerfil: resultado.imagen }));
      }

      // 3) Refleja los cambios en el contexto (solo una vez)
      setUsuario(prev => ({
        ...prev,
        ...editableUsuario,
      }));

      setModoEdicion(false);
      setArchivoImagen(null);

      mostrarMensaje({
        title: "¡Perfil actualizado!",
        description: "Tus cambios han sido guardados correctamente.",
        tipo: "success",
      });
    } catch (err) {
      console.error("Error al guardar perfil:", err.message);
      mostrarMensaje({
        title: "Error al guardar",
        description: err.message || "No se pudieron guardar los cambios. Inténtalo de nuevo.",
        tipo: "error",
      });
    }
  };

  if (!usuario) return <div>Cargando perfil...</div>;

  const obtenerIconoLogro = (nombre) => {
    switch (nombre) {
      case "Primera Victoria": return <Trophy size={24} />;
      case "Racha de Fuego": return <Shield size={24} />;
      case "Maestro de Hábitos": return <Swords size={24} />;
      case "Corazón Inquebrantable": return <Heart size={24} />;
      default: return <Trophy size={24} />;
    }
  };

  const obtenerColorRareza = (rareza) => {
    switch (rareza) {
      case "común": return "etiqueta-comun";
      case "rara": return "etiqueta-rara";
      case "épica": return "etiqueta-epica";
      case "legendaria": return "etiqueta-legendaria";
      default: return "";
    }
  };

  const xpTotal = habitos.reduce((acc, h) => acc + (h.xp || 0), 0);
  const experienciaSiguienteNivel = (usuario.nivel || 1) * 300;
  const experienciaActual = xpTotal % experienciaSiguienteNivel;
  const progresoXP = (experienciaActual / experienciaSiguienteNivel) * 100;

  return (
    <div className="pagina-perfil">
      <div className="contenido-principal">
        <main className="perfil-contenido">
          <div className="perfil-encabezado">
            <h1 className="titulo-pagina">Mi Perfil</h1>
            <button
              type="button"
              className={modoEdicion ? "boton-guardar" : "boton-editar"}
              onClick={() => (modoEdicion ? guardarCambios() : entrarEdicion())}
            >
              <Edit className="w-5 h-5" />
              {modoEdicion ? "Guardar" : "Editar"}
            </button>
          </div>

          <section className="tarjeta-perfil">
            <h2 className="titulo-seccion">Información Personal</h2>

            <div className="perfil-detalles">
              <div className="avatar">
              <div className="avatar-fondo">
                    {usuario.nombre?.slice(0, 2).toUpperCase() || "??"}
                  </div>
              </div>



              <div className="perfil-info">
                <span className="etiqueta-rol">{usuario.rol}</span>

                {modoEdicion ? (
                  <input
                    className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                    value={editableUsuario?.nombre || ""}
                    onChange={(e) =>
                      setEditableUsuario((prev) => ({ ...prev, nombre: e.target.value }))
                    }
                  />
                ) : (
                  <>
                    <h2 className="nombre-perfil">{usuario.nombre}</h2>
                    <p className="usuario-perfil">@{usuario.nombreUsuario}</p>
                  </>
                )}
              </div>
            </div>

            <div className="campos-perfil">
              <div className="campo">
                

                <label>Nombre de Usuario</label>
                <input
                  className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                  value={(modoEdicion ? editableUsuario?.nombreUsuario : usuario.nombreUsuario) || ""}
                  onChange={(e) =>
                    setEditableUsuario((prev) => ({ ...prev, nombreUsuario: e.target.value }))
                  }
                  disabled={!modoEdicion}
                />
              </div>

              <div className="campo">
                <label>Correo Electrónico</label>
                <input
                  className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                  type="email"
                  value={(modoEdicion ? editableUsuario?.email : usuario.email) || ""}
                  onChange={(e) =>
                    setEditableUsuario((prev) => ({ ...prev, email: e.target.value }))
                  }
                  disabled={!modoEdicion}
                  required
                />
              </div>

              <div className="campo">
                <label>Biografía</label>
                <textarea
                  className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                  value={(modoEdicion ? editableUsuario?.biografia : usuario.biografia) || ""}
                  onChange={(e) =>
                    setEditableUsuario((prev) => ({ ...prev, biografia: e.target.value }))
                  }
                  disabled={!modoEdicion}
                  rows="4"
                />
              </div>

              <div className="descripcion">
                <div className="campo">
                  <label>Género</label>
                  <select
                    className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                    value={(modoEdicion ? editableUsuario?.genero : usuario.genero) || "prefiero-no-decir"}
                    onChange={(e) =>
                      setEditableUsuario((prev) => ({ ...prev, genero: e.target.value }))
                    }
                    disabled={!modoEdicion}
                  >
                    <option value="masculino">Masculino</option>
                    <option value="femenino">Femenino</option>
                    <option value="otro">Otro</option>
                    <option value="prefiero-no-decir">Prefiero no decir</option>
                  </select>
                </div>

                <div className="campo">
                  <label>Rol RPG</label>
                  <select
                    className={`campo-texto ${modoEdicion ? "modo-edicion" : ""}`}
                    value={(modoEdicion ? editableUsuario?.rol : usuario.rol) || "Guerrero"}
                    onChange={(e) =>
                      setEditableUsuario((prev) => ({ ...prev, rol: e.target.value }))
                    }
                    disabled={!modoEdicion}
                  >
                    <option value="Guerrero">Guerrero</option>
                    <option value="Mago">Mago</option>
                    <option value="Arquero">Arquero</option>
                    <option value="Paladín">Paladín</option>
                    <option value="Asesino">Asesino</option>
                    <option value="Druida">Druida</option>
                    <option value="Guerrera">Guerrera</option>
                    <option value="Hechicera">Hechicera</option>
                    <option value="Sacerdotisa">Sacerdotisa</option>
                    <option value="Valquiria">Valquiria</option>
                    <option value="Cazadora">Cazadora</option>
                  </select>
                </div>
              </div>
            </div>
          </section>

          <section className="tarjeta-progreso">
            <h2 className="titulo-seccion">
              <Sword className="icono-Trofeo" size={40} /> Progreso del Aventurero
            </h2>

            <div className="perfil-stats">
              <div className="stat-item">
                <Award size={40} className="stat-icon" />
                <span className="stat-valor">{usuario.nivel || 1}</span>
                <span className="stat-label">Nivel</span>
              </div>
              <div className="stat-item">
                <Star size={40} className="stat-icon" />
                <span className="stat-valor">{xpTotal}</span>
                <span className="stat-label">XP Acumulado</span>
              </div>
            </div>

            <div className="xp-progreso-container">
              <div className="xp-labels">
                <span>
                  XP en este nivel: {experienciaActual} / {experienciaSiguienteNivel}
                </span>
                <span>Siguiente Nivel</span>
              </div>
              <div className="xp-barra">
                <div className="xp-barra-progreso" style={{ width: `${progresoXP}%` }}></div>
              </div>
            </div>
          </section>

          <section className="tarjeta-logros">
            <h2 className="titulo-seccion">
              <Trophy className="icono-Trofeo" size={32} />Logros Desbloqueados
            </h2>
            <div className="lista-logros">
              {/* ... */}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Perfil;
