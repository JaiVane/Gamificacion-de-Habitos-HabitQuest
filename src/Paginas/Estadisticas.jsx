import React, { useState, useEffect } from "react";
import "../Estilos/stylesPaginas/Estadisticas.css";
import { BarChart3, TrendingUp, Calendar, Target, Zap, Award } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { getEstadisticas } from "../Api/api";



const Stats = () => {
  const [vista, setVista] = useState("semanal");
  const [estadisticas, setEstadisticas] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const data = await getEstadisticas(userId); 
        setEstadisticas(data);
      } catch (error) {
        console.error("Error cargando estadísticas:", error);
      }
    };

    fetchData();
  }, []);

  if (!estadisticas) {
    return <p>Cargando estadísticas...</p>;
  }

  // Datos dinámicos desde el backend
  const datosGrafico = vista === "semanal" ? estadisticas.semanal : estadisticas.mensual;

  const datosCircular = [
    { nombre: "Completados", valor: estadisticas.totalCompletados, color: "#10b981" },
    { nombre: "Fallidos", valor: estadisticas.totalFallidos, color: "#ef4444" },
  ];

  const estadisticasCategorias = estadisticas.porCategoria;

  return (
    <div className="estadisticas">
      <div className="contenedor">
        <main className="main">
          <div className="encabezado-esta">
            <h1 className="titulo-principal">
              <BarChart3 className="icono" />
              Estadísticas
            </h1>
            <p className="subtitulo">Analiza tu progreso y mejora continuamente</p>
          </div>

          {/* Tarjetas resumen */}
          <div className="grid-cards">
            <div className="card card-exito">
              <div className="card-header"><Target /> Tasa de Éxito</div>
              <div className="card-content">
                <div className="valor">{estadisticas.tasaExito}%</div>
              </div>
            </div>

            <div className="card card-activos">
              <div className="card-header"><Calendar /> Días Activos</div>
              <div className="card-content">
                <div className="valor">{estadisticas.diasActivos}</div>
              </div>
            </div>

            <div className="card card-xp">
              <div className="card-header"><Zap /> XP Promedio</div>
              <div className="card-content">
                <div className="valor">{estadisticas.xpPromedioDiario}</div>
              </div>
            </div>

            <div className="card card-racha">
              <div className="card-header"><Award /> Mejor Racha</div>
              <div className="card-content">
                <div className="valor">{estadisticas.mejorRacha}</div>
              </div>
            </div>
          </div>

          {/* Reporte de Evolución */}
          <div className="card card-evolucion">
            <div className="reporte">
              <TrendingUp /> Reporte de Evolución
              <div className="vista-toggle">
                <button
                  className={vista === "semanal" ? "activo" : ""}
                  onClick={() => setVista("semanal")}
                >
                  Semanal
                </button>
                <button
                  className={vista === "mensual" ? "activo" : ""}
                  onClick={() => setVista("mensual")}
                >
                  Mensual
                </button>
              </div>
            </div>
            <div className="card-content grafico-evolucion">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={datosGrafico}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="dia" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="completados" stroke="#10b981" strokeWidth={3} name="Completados" />
                  <Line type="monotone" dataKey="fallidos" stroke="#ef4444" strokeWidth={3} name="Fallidos" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="graficas">
            {/* Gráfico de Barras */}
            <div className="card card-barras">
              <div className="header">Hábitos: Cumplidos vs Fallidos</div>
              <div className="card-content grafico-barras">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={estadisticas.semanal}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="dia" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="completados" fill="#10b981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="fallidos" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Gráfico Circular */}
            <div className="card card-circular">
              <div className="header">Proporción de Cumplimiento</div>
              <div className="card-content grafico-circular">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={datosCircular}
                      dataKey="valor"
                      nameKey="nombre"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      innerRadius={60}
                      paddingAngle={5}
                      startAngle={90}
                      endAngle={450}
                      label={({ nombre, percent }) =>
                        `${nombre}: ${(percent * 100).toFixed(0)}%`
                      }
                    >
                      {datosCircular.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Categorías */}
          <div className="card card-categorias">
            <div className="header">Estadísticas por Categoría</div>
            <div className="card-content grafico-categorias">
              {estadisticasCategorias.map((categoria) => {
                const porcentaje = Math.round((categoria.completados / categoria.total) * 100);
                return (
                  <div key={categoria.nombre} className="categoria">
                    <div className="categoria-header">
                      <span>{categoria.nombre}</span>
                      <span>{categoria.completados}/{categoria.total} ({porcentaje}%)</span>
                    </div>
                    <div className="barra-categoria">
                      <div
                        className="relleno-categoria"
                        style={{
                          width: `${porcentaje}%`,
                          backgroundColor: categoria.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Stats;
