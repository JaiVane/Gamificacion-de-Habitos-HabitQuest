import {Routes, Route } from "react-router-dom";
import Inicio from './Paginas/Inicio';
import Autenticacion from './Paginas/Autenticacion';
import NoEncontrado from './Paginas/NoEncontrado';
import PaginaPrincipal from './Paginas/PaginaPrincipal'


function App() {
  return (
      <Routes>
        {/* Página de inicio */}
        <Route path="/" element={<Inicio />} />
        <Route path="/autenticacion" element={<Autenticacion />} />
        <Route path="/*" element={<PaginaPrincipal />} />
        <Route path="*" element={<NoEncontrado />} />
      </Routes>
  );
}

export default App;
