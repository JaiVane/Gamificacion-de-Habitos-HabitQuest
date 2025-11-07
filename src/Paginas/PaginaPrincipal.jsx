import DashboardHeader from "../Componentes/DashboardHeader";
import Sidebar from "../Componentes/Sidebar";
import Dashboard from "./Dashboard";
import Habitos from "./Habitos";
import Metas from "./Metas";
import TablaClasificacion from "./TablaClasificacion";
import Estadisticas from "./Estadisticas";
import Perfil from "./Perfil";
import {  Routes, Route } from "react-router-dom";
import "../Estilos/stylesPaginas/PaginaPrincipal.css";
import Configuracion from "./Configuracion";
import Logros from "./Logros";

function PaginaPrincipal() {

    return (
        <div className="pagina-container">
        <Sidebar/>
        <div className="pagina content">
            <DashboardHeader/>
        <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/habitos" element={<Habitos />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/tablaClasificacion" element={<TablaClasificacion />} />
            <Route path="/estadisticas" element={<Estadisticas />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/logros" element={<Logros />} />
            <Route path="/configuracion" element={<Configuracion />} />

        </Routes>
        </div>
        
        </div>

    );
}

export default PaginaPrincipal;