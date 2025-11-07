import React from "react";
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
  ResponsiveContainer,Bar,BarChart,PieChart, Pie, Cell
} from "recharts";
import { useState } from "react";

const Stats = () => {
  const [vista, setVista] = useState("semanal");
  const datosSemanales = [
    { dia: "Lun", completados: 9, fallidos: 3 },
    { dia: "Mar", completados: 6, fallidos: 2 },
    { dia: "Mié", completados: 9, fallidos: 3 },
    { dia: "Jue", completados: 7, fallidos: 2 },
    { dia: "Vie", completados: 6, fallidos: 2 },
    { dia: "Sáb", completados: 4, fallidos: 1 },
    { dia: "Dom", completados: 3, fallidos: 1 },
  ];
  
  const datosMensuales = [
    { dia: "Semana 1", completados: 45, fallidos: 10 },
    { dia: "Semana 2", completados: 50, fallidos: 8 },
    { dia: "Semana 3", completados: 42, fallidos: 12 },
    { dia: "Semana 4", completados: 48, fallidos: 9 },
  ];
  const datosGrafico = vista === "semanal" ? datosSemanales : datosMensuales;
  const estadisticasCategorias = [
    { nombre: "Salud", completados: 45, total: 60, color: "#10b981" },
    { nombre: "Productividad", completados: 38, total: 50, color: "#3b82f6" },
    { nombre: "Desarrollo Personal", completados: 28, total: 40, color: "#8b5cf6" },
    { nombre: "Ejercicio", completados: 32, total: 35, color: "#f97316" },
  ];
  const datosCircular = [
    { nombre: "Completados", valor: 79, color: "#10b981" },
    { nombre: "Fallidos", valor: 21, color: "#ef4444" },
  ];

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
              <div className="card-header"><span className="iconoExito"> <Target /></span> Tasa de Éxito</div>
              <div className="card-content">
                <div className="valor">87%</div>
                <div className="detalle">+5% vs mes anterior</div>
              </div>
            </div>

            <div className="card card-activos">
              <div className="card-header"><span className="iconoActivos"><Calendar /></span> Días Activos</div>
              <div className="card-content">
                <div className="valor">28</div>
                <div className="detalle">Este mes</div>
              </div>
            </div>

            <div className="card card-xp">
              <div className="card-header"><span className="iconoXp"><Zap /></span> XP Promedio</div>
              <div className="card-content">
                <div className="valor">245</div>
                <div className="detalle">XP por día</div>
              </div>
            </div>

            <div className="card card-racha">
              <div className="card-header"><span className="iconoRacha"><Award /> </span>Mejor Racha</div>
              <div className="card-content">
                <div className="valor">45</div>
                <div className="detalle">días consecutivos</div>
              </div>
            </div>
          </div>
          {/* Reporte de Evolución */}
          <div className="card card-evolucion">
            <div className="reporte"><span className="encabezado-repo">
            <TrendingUp /> 
            </span>
              Reporte de Evolución
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
                      {/*Grafico de Barras */}
            <div className="card card-barras">
              <div className="header">Hábitos: Cumplidos vs Fallidos</div>
              <div className="card-content grafico-barras">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={datosSemanales}>
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
