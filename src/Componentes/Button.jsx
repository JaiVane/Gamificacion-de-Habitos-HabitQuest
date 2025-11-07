import React from "react";
import "../Estilos/stylesComponentes/Button.css";

const Button = ({ children, onClick, tipo = "primario", grande = false }) => {
  const clases = `boton ${tipo} ${grande ? "grande" : ""}`;
  return (
    <button className={clases} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
