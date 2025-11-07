import { useEffect, useState } from "react";

const ANCHO_MOVIL = 768;

export function useEsMovil() {
  const [esMovil, setEsMovil] = useState(false);

  useEffect(() => {
    const verificarTamaño = () => {
      setEsMovil(window.innerWidth < ANCHO_MOVIL);
    };

    verificarTamaño(); // comprobación inicial
    window.addEventListener("resize", verificarTamaño);

    return () => {
      window.removeEventListener("resize", verificarTamaño);
    };
  }, []);

  return esMovil;
}
