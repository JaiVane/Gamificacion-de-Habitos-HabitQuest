import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotificacion } from "../Hooks/useNotificacion"; // Corregida la ruta de importación
import { Sparkles } from "lucide-react";
import "../Estilos/stylesPaginas/Autenticacion.css";
import { postData } from "../Api/api";
import { useAuth } from "../Context/AuthContext";

const Autenticacion = () => {
  const navegar = useNavigate();
  const { mostrarMensaje } = useNotificacion();  const { iniciarSesion } = useAuth(); // <-- Obtenemos la función del contexto
  const [errorPassword, setErrorPassword] = useState("");

  const [cargando, setCargando] = useState(false);
  const [modoRegistro, setModoRegistro] = useState(false);

    //------------------------Login e Registro-----------------------------------------------------------------------
  const [datosRegistro, setDatosRegistro] = useState({
    nombre: "",
    nombreUsuario: "",
    email: "",
    password: "",
  });
  const [datosLogin, setDatosLogin] = useState({
    email: "",
    password: "",
  });
  

  const manejarInicioSesion =  async(e) => {
    e.preventDefault();
    setCargando(true);
    try{
      await iniciarSesion(datosLogin.email, datosLogin.password);
      navegar("/dashboard");
    }catch(error){
      mostrarMensaje({
        title: "Error al iniciar sesión",
        description: error.message,
        tipo: "error"
      });
    }finally{
      setCargando(false);
    }
  };

  const manejarRegistro = async (e) => {
    e.preventDefault();
    setCargando(true);

    const datosCompletosRegistro = {
      ...datosRegistro,
      biografia: "Sin biografía aún",
      genero: "no definido",
      rol: "sin rol",
    };

    try {
      await postData("auth/register", datosCompletosRegistro);
      mostrarMensaje({
        title: "¡Cuenta creada!",
        description: `¡Bienvenido ${datosRegistro.nombre}! Tu aventura comienza ahora.`,
      });
      await iniciarSesion(datosRegistro.email, datosRegistro.password);
      navegar("/dashboard");
    } catch (error) {
      mostrarMensaje({
        title: "Error al registrarse",
        description: error.message,
      });
    } finally {
      setCargando(false);
    }
    
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
                    <label htmlFor="email">Correo electrónico</label>
                    <input 
                    type="email" 
                    id="email"  
                    value={datosLogin.email}
                    onChange={(e)=> setDatosLogin({...datosLogin,email:e.target.value})} 
                    placeholder="tu@email.com" required />
                  </div>

                  <div className="campo">
                    <label htmlFor="password">Contraseña</label>
                    <input 
                    type="password" 
                    id="password"
                    value={datosLogin.password}
                    onChange={(e)=> setDatosLogin({...datosLogin,password:e.target.value})}
                    placeholder="••••••••" required />
                    
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
                      value={datosRegistro.nombre}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, nombre: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="nombreUsuario">Nombre de Usuario</label>
                    <input
                      type="text"
                      id="nombreUsuario"
                      value={datosRegistro.nombreUsuario}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, nombreUsuario: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="email">Correo electrónico</label>
                    <input
                      type="email"
                      id="email"
                      value={datosRegistro.email}
                      onChange={(e) =>
                        setDatosRegistro({ ...datosRegistro, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="campo">
                    <label htmlFor="password">Contraseña</label>
                    <input
                      type="password"
                      id="password"
                      value={datosRegistro.password}
                      onChange={(e) => {
                        const value = e.target.value;
                        setDatosRegistro({ ...datosRegistro, password: value });
                        setErrorPassword(value.length < 6 ? "La contraseña debe tener al menos 6 caracteres." : "");
                      }}
                      required
                    />
                    {errorPassword && <p className="error-text">{errorPassword}</p>}
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