import React from "react";
import "../Estilos/stylesComponentes/ContadorRacha.css";

const ContadorRacha = ({ Icono, etiqueta, valor, descripcion }) => {
  return (
    <div className="contador-racha">
      <div className="contador-contenido-racha">
        <div className="contador-texto-contenedor">
          <div className="encabezado-racha">
            <Icono className="icono-inline" />
            <p className="contador-etiqueta">{etiqueta}</p>
          </div>
          <p className="contador-valor">{valor}</p>
          {descripcion && <p className="contador-descripcion">{descripcion}</p>}
        </div>
      </div>
    </div>
  );
};

export default ContadorRacha;
