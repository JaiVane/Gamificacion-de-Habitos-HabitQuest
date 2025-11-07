import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificacion } from "../Hooks/useNotificacion";
import { Sparkles } from "lucide-react";
import "../Estilos/stylesPaginas/Autenticacion.css";

const Autenticacion = () => {
  const navegar = useNavigate();
  const { toast } = useNotificacion();
  const [cargando, setCargando] = useState(false);
  const [modoRegistro, setModoRegistro] = useState(false);

  const [datosRegistro, setDatosRegistro] = useState({
    nombreCompleto: "",
    usuario: "",
    correo: "",
    contrasena: "",
  });

  const manejarInicioSesion = (e) => {
    e.preventDefault();
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      toast({
        title: "¡Bienvenido de vuelta!",
        description: "Has iniciado sesión correctamente.",
      });
      navegar("/dashboard");
    }, 1000);
  };

  const manejarRegistro = (e) => {
    e.preventDefault();
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      toast({
        title: "¡Cuenta creada!",
        description: `Bienvenido ${datosRegistro.nombreCompleto}! Tu aventura comienza ahora.`,
      });
      navegar("/dashboard");
    }, 1000);
  };

  return (
    <div className="contenedor-auth">
      <div className="auth-card">
        <div className="auth-encabezado">
          <div className="icono-container">
            <div className="icono-fondo">
              <Sparkles size={32} color="white" />
            </div>
          </div>
          <h1 className="titulo">HabitQuest</h1>
          <p className="subtitulo">Tu aventura de hábitos comienza aquí</p>
        </div>

        <div className="tabs">
          <button
            className={`tab ${!modoRegistro ? "activo" : ""}`}
            onClick={() => setModoRegistro(false)}
          >
            Iniciar Sesión
          </button>
          <button
            className={`tab ${modoRegistro ? "activo" : ""}`}
            onClick={() => setModoRegistro(true)}
          >
            Registrarse
          </button>
        </div>

        <div className="contenedor-formulario">
          <div className="card">
            <div className="formulario-contenido">
              {!modoRegistro ? (
                <form onSubmit={manejarInicioSesion} className="formulario">
                  <h2>Bienvenido de vuelta</h2>
                  <p>Ingresa tus credenciales para continuar tu aventura</p>

                  <div className="campo">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input type="email" id="correo" placeholder="tu@email.com" required />
                  </div>

                  <div className="campo">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input type="password" id="contrasena" placeholder="••••••••" required />
                  </div>

                  <button type="submit" disabled={cargando}>
                    {cargando ? "Iniciando sesión..." : "Iniciar Sesión"}
                  </button>
                </form>
              ) : (
                <form onSubmit={manejarRegistro} className="formulario">
                  <h2>Crea tu cuenta</h2>
                  <p>Únete a la comunidad de HabitQuest</p>

                  <div className="campo">
                    <label htmlFor="nombre">Nombre completo</label>
                    <input
                      type="text"
                      id="nombre"
                      value={datosRegistro.nombreCompleto}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, nombreCompleto: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="usuario">Nombre de usuario</label>
                    <input
                      type="text"
                      id="usuario"
                      value={datosRegistro.usuario}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, usuario: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="correo">Correo electrónico</label>
                    <input
                      type="email"
                      id="correo"
                      value={datosRegistro.correo}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, correo: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                      type="password"
                      id="contrasena"
                      value={datosRegistro.contrasena}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, contrasena: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button type="submit" disabled={cargando}>
                    {cargando ? "Creando cuenta..." : "Comenzar aventura"}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="volver-inicio">
            <button className="btn-ghost" onClick={() => navegar("/")}>
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Autenticacion;