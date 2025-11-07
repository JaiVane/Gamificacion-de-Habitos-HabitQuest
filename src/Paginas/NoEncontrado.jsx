import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Estilos/stylesPaginas/NoEncontrado.css";

const NoEncontrado = () => {
  const ubicacion = useLocation();
  const navegar = useNavigate();

  useEffect(() => {
    console.error("Error 404: ruta no existente ->", ubicacion.pathname);
  }, [ubicacion.pathname]);

  return (
    <div className="pagina-no-encontrada">
      <div className="contenedor-error">
        <h1 className="codigo-error">404</h1>
        <p className="mensaje-error">¡Ups! La página que buscas no existe.</p>
        <button
          className="boton-volver"
          onClick={() => navegar("/")}
        >
          Volver al inicio
        </button>
      </div>
    </div>
  );
};

export default NoEncontrado;
