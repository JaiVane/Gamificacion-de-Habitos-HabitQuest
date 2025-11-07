import React from "react";
import "../Estilos/stylesComponentes/TarjetaEstadistica.css";

const TarjetaEstadistica = ({ Icono, etiqueta, valor, descripcion , claseExtra}) => {
  return (
    <div className={`tarjeta-estadistica ${claseExtra || ""}`}>
      <div className="contenido-tarjeta">
        <div className="texto-contenedor">
          <div className="encabezado-contenedor">
            <div className="icon-contenedor"><Icono className="icono" /></div>
            <h2 className="tarjeta-etiqueta">{etiqueta}</h2>
          </div>
          <p className="tarjeta-valor">{valor}</p>
          {descripcion && <p className="tarjeta-descripcion">{descripcion}</p>}
        </div>
      </div>
    </div>
  );
};

export default TarjetaEstadistica;
