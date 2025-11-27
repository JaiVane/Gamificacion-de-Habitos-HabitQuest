  // import react, { useState, useEffect } from "react";
  // import "../Estilos/stylesPaginas/TablaClasificacion.css";
  // import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

  //  const TablaClasificacion = ({leaderboard }) => {
  //   const [datosClasificacion, setDatosClasificacion] = useState([]);

  //   useEffect(() => {
  //     const fetchClasificacion = async () => {
  //       try {
  //         const res = await fetch(`${import.meta.env.VITE_API_URL}/competencia/clasificacion`, {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}` // si tu API requiere autenticación
  //           }
  //         });
  //         if (!res.ok) throw new Error("Error al obtener la clasificación");
  //         const data = await res.json();
  //         setDatosClasificacion(data);
  //       } catch (error) {
  //         console.error("Error cargando clasificación:", error);
  //       }
  //     };

  //     fetchClasificacion();
  //   }, []);

  // //🔹If there is real-time data, use it; if not, show initials
  // const rows = datosClasificacion.map((jugador) => {
  //   const actualizado = leaderboard.find((r) => r.usuarioId === jugador.usuarioId);
  //   return actualizado ? { ...jugador, ...actualizado } : jugador;
  // });


  //   const obtenerIcono = (puesto) => {
  //     switch (puesto) {
  //       case 1: return <Trophy className="icono icono-oro" size={24} />;
  //       case 2: return <Medal className="icono icono-plata" size={24} />;
  //       case 3: return <Award className="icono icono-bronce" size={24} />;
  //       default: return <span className="puesto-numero">{puesto}</span>;
  //     }
  //   };

  //   const obtenerIniciales = (nombre) => {
  //     if (!nombre) return "??";
  //     const partes = nombre.split(" ");
  //     if (partes.length >= 2) {
  //       return (partes[0][0] + partes[1][0]).toUpperCase();
  //     }
  //     return nombre.slice(0, 2).toUpperCase();
  //   };
  // console.log(rows)
  //   return (
  //     <div className="contenedor-principal">
  //       <div className="contenido-dashboard">
  //         <main className="contenido-tabla">
  //           <div className="header-seccion">
  //             <h1 className="titulo-seccion">
  //               <Trophy className="icono-titulo" size={32} /> Tabla de Competición
  //             </h1>
  //             <p className="subtitulo">Los mejores guerreros del reino de HabitQuest</p>
  //           </div>
            // updated[idx] = {
  //           {/* Top 3 */}
  //           {/* <div className="tarjetas-top">
  //             {datosClasificacion.slice(0, 3).map((jugador) => (
  //               <div key={jugador.puesto} className={`tarjeta-top jugador-${jugador.puesto}`}>
  //                 <div className="tarjeta-icono">{obtenerIcono(jugador.puesto)}</div>
  //                 <h2 className="tarjeta-nombre">{jugador.nombre}</h2>
  //                 <p className="tarjeta-usuario">@{jugador.nombreUsuario}</p>
  //                 <div className="tarjeta-stats">
  //                   <div className="stat-item">
  //                     <span className="stat-label">Nivel</span>
  //                     <span className="badge-nivel">{jugador.nivel}</span>
  //                   </div>
  //                   <div className="stat-item">
  //                     <span className="stat-label">Total XP</span>
  //                     <span className="stat-value">{jugador.experiencia.toLocaleString()}</span>
  //                   </div>
  //                   <div className="stat-item">
  //                     <span className="stat-label">Racha</span>
  //                     <span className="stat-racha">{jugador.racha} días</span>
  //                   </div>
  //                 </div>
  //               </div>
  //             ))}
  //           </div> */}
  //           {/* top 3 */}
  // <div className="tarjetas-top">
  //   {rows.slice(0, 3).map((jugador) => (
  //     <div key={`${jugador.usuarioId ?? 'puesto'}-${jugador.puesto}`} className={`tarjeta-top jugador-${jugador.puesto}`}>
  //       <div className="tarjeta-icono">{obtenerIcono(jugador.puesto)}</div>
  //       <h2 className="tarjeta-nombre">{jugador.nombre}</h2>
  //       <p className="tarjeta-usuario">@{jugador.nombreUsuario}</p>
  //       <div className="tarjeta-stats">
  //         <div className="stat-item">
  //           <span className="stat-label">Nivel</span>
  //           <span className="badge-nivel">{jugador.nivel}</span>
  //         </div>
  //         <div className="stat-item">
  //           <span className="stat-label">Total XP</span>
  //           <span className="stat-value">{(jugador.experiencia ?? 0).toLocaleString()}</span>
  //         </div>
  //         <div className="stat-item">
  //           <span className="stat-label">Racha</span>
  //           <span className="stat-racha">{jugador.racha ?? 0} días</span>
  //         </div>
  //       </div>
  //     </div>
  //   ))}
  // </div>




  //           {/* Tabla general */}
  //           <div className="tabla-general">
  //             <h2 className="titulo-tabla">
  //               <TrendingUp size={20} /> Clasificación General
  //             </h2>
  //             <div className="tabla-contenedor">
  //               <table>
  //                 <thead>
  //                   <tr>
  //                     <th>Rank</th>
  //                     <th>Usuario</th>
  //                     <th>Nivel</th>
  //                     <th>XP Total</th>
  //                     <th>Hábitos</th>
  //                     <th>Racha</th>
  //                   </tr>
  //                 </thead>
  //                 {/* <tbody>
  //                   {datosClasificacion.map((jugador, index) => (
  //                     <tr key={jugador.puesto} className={index % 2 === 0 ? "fila-par" : "fila-impar"}>
  //                       <td className="columna-rank">{obtenerIcono(jugador.puesto)}</td>
  //                       <td>
  //                         <div className="usuario-info">
  //                           <div className="avatar">{obtenerIniciales(jugador.nombre)}</div>
  //                           <div className="usuario-datos">
  //                             <p className="usuario-nombre">{jugador.nombre}</p>
  //                             <span className="usuario-username">@{jugador.nombreUsuario}</span>
  //                           </div>
  //                         </div>
  //                       </td>
  //                       <td>
  //                         <span className={`badge-nivel-tabla nivel-${jugador.puesto <= 3 ? jugador.puesto : 'normal'}`}>
  //                           Nivel {jugador.nivel}
  //                         </span>
  //                       </td>
  //                       <td className="columna-xp">{jugador.experiencia.toLocaleString()}</td>
  //                       <td className="habitos">{jugador.habitosCompletados}</td>
  //                       <td className="columna-racha">{jugador.racha} días</td>
  //                     </tr>
  //                   ))}
  //                 </tbody> */}
  // <tbody>
  //   {rows.map((jugador, index) => (
  //     <tr key={`${jugador.usuarioId ?? 'puesto'}-${jugador.puesto}`} className={index % 2 === 0 ? "fila-par" : "fila-impar"}>
  //       <td className="columna-rank">{obtenerIcono(jugador.puesto)}</td>
  //       <td>
  //         <div className="usuario-info">
  //           <div className="avatar">{obtenerIniciales(jugador.nombre)}</div>
  //           <div className="usuario-datos">
  //             <p className="usuario-nombre">{jugador.nombre}</p>
  //             <span className="usuario-username">@{jugador.nombreUsuario}</span>
  //           </div>
  //         </div>
  //       </td>
  //       <td>
  //         <span className={`badge-nivel-tabla nivel-${jugador.puesto <= 3 ? jugador.puesto : 'normal'}`}>
  //           Nivel {jugador.nivel}
  //         </span>
  //       </td>
  //       <td className="columna-xp">{(jugador.experiencia ?? 0).toLocaleString()}</td>
  //       <td className="habitos">{jugador.habitosCompletados ?? 0}</td>
  //       <td className="columna-racha">{jugador.racha ?? 0} días</td>
  //     </tr>
  //   ))}
  // </tbody>


  //               </table>
  //             </div>
  //           </div>
  //         </main>
  //       </div>
  //     </div>
  //   );
  // };
  // export default TablaClasificacion;

  import react, { useState, useEffect } from "react";
  import "../Estilos/stylesPaginas/TablaClasificacion.css";
  import { Trophy, Medal, Award, TrendingUp } from "lucide-react";

  const TablaClasificacion = ({ leaderboard }) => {
    const [datosClasificacion, setDatosClasificacion] = useState([]);

    useEffect(() => {
      const fetchClasificacion = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/competencia/clasificacion`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          if (!res.ok) throw new Error("Error al obtener la clasificación");
          const data = await res.json();
          setDatosClasificacion(data);
        } catch (error) {
          console.error("Error cargando clasificación:", error);
        }
      };

      fetchClasificacion();
    }, []);

    // 🔹 Fusionar datos iniciales con actualizaciones en tiempo real
    const rows = [
      ...datosClasificacion.map((jugador) => {
        const actualizado = leaderboard.find((r) => r.usuarioId === jugador.usuarioId);
        return actualizado ? { ...jugador, ...actualizado } : jugador;
      }),
      // Agregar usuarios nuevos que no estaban en datosClasificacion
      ...leaderboard.filter((r) => !datosClasificacion.some((j) => j.usuarioId === r.usuarioId))
    ];

    // 🔹 Ordenar por XP y recalcular puesto dinámicamente
    const rowsOrdenados = [...rows]
      .sort((a, b) => (b.experiencia ?? 0) - (a.experiencia ?? 0))
      .map((jugador, index) => ({ ...jugador, puesto: index + 1 }));

    const obtenerIcono = (puesto) => {
      switch (puesto) {
        case 1: return <Trophy className="icono icono-oro" size={24} />;
        case 2: return <Medal className="icono icono-plata" size={24} />;
        case 3: return <Award className="icono icono-bronce" size={24} />;
        default: return <span className="puesto-numero">{puesto}</span>;
      }
    };

    const obtenerIniciales = (nombre) => {
      if (!nombre) return "??";
      const partes = nombre.split(" ");
      if (partes.length >= 2) {
        return (partes[0][0] + partes[1][0]).toUpperCase();
      }
      return nombre.slice(0, 2).toUpperCase();
    };

    return (
      <div className="contenedor-principal">
        <div className="contenido-dashboard">
          <main className="contenido-tabla">
            <div className="header-seccion">
              <h1 className="titulo-seccion">
                <Trophy className="icono-titulo" size={32} /> Tabla de Competición
              </h1>
              <p className="subtitulo">Los mejores guerreros del reino de HabitQuest</p>
            </div>

            {/* 🔹 Top 3 */}
            <div className="tarjetas-top">
              {rowsOrdenados.slice(0, 3).map((jugador) => (
                <div key={`${jugador.usuarioId}-${jugador.puesto}`} className={`tarjeta-top jugador-${jugador.puesto}`}>
                  <div className="tarjeta-icono">{obtenerIcono(jugador.puesto)}</div>
                  <h2 className="tarjeta-nombre">{jugador.nombre}</h2>
                  <p className="tarjeta-usuario">@{jugador.nombreUsuario}</p>
                  <div className="tarjeta-stats">
                    <div className="stat-item">
                      <span className="stat-label">Nivel</span>
                      <span className="badge-nivel">{jugador.nivel}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Total XP</span>
                      <span className="stat-value">{(jugador.experiencia ?? 0).toLocaleString()}</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-label">Racha</span>
                      <span className="stat-racha">{jugador.racha ?? 0} días</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* 🔹 Tabla general */}
            <div className="tabla-general">
              <h2 className="titulo-tabla">
                <TrendingUp size={20} /> Clasificación General
              </h2>
              <div className="tabla-contenedor">
                <table>
                  <thead>
                    <tr>
<th className="columna-rank">Rank</th>
<th className="columna-usuario">Usuario</th>
<th className="columna-nivel">Nivel</th>
<th className="columna-xp">XP Total</th>
<th className="columna-habitos">Hábitos</th>
<th className="columna-racha">Racha</th>

                    </tr>
                  </thead>
                  {/* <tbody>
                    {rowsOrdenados.map((jugador, index) => (
                      <tr key={`${jugador.usuarioId}-${jugador.puesto}`} className={index % 2 === 0 ? "fila-par" : "fila-impar"}>
                        <td className="columna-rank">{obtenerIcono(jugador.puesto)}</td>
                        <td>
                          <div className="usuario-info">
                            <div className="avatar">{obtenerIniciales(jugador.nombre)}</div>
                            <div className="usuario-datos">
                              <p className="usuario-nombre">{jugador.nombre}</p>
                              <span className="usuario-username">@{jugador.nombreUsuario}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`badge-nivel-tabla nivel-${jugador.puesto <= 3 ? jugador.puesto : 'normal'}`}>
                            Nivel {jugador.nivel}
                          </span>
                        </td>
                        <td className="columna-xp">{(jugador.experiencia ?? 0).toLocaleString()}</td>
                        <td className="habitos">{jugador.habitosCompletados ?? 0}</td>
                        <td className="columna-racha">{jugador.racha ?? 0} días</td>
                      </tr>
                    ))}
                  </tbody> */}
                  <tbody>
  {rowsOrdenados.map((jugador, index) => (
    <tr
      key={`${jugador.usuarioId}-${jugador.puesto}`}
      className={index % 2 === 0 ? "fila-par" : "fila-impar"}
    >
      <td className="columna-rank">{obtenerIcono(jugador.puesto)}</td>

      <td className="columna-usuario">
        <div className="usuario-info">
          <div className="avatar">{obtenerIniciales(jugador.nombre)}</div>
          <div className="usuario-datos">
            <p className="usuario-nombre">{jugador.nombre}</p>
            <span className="usuario-username">@{jugador.nombreUsuario}</span>
          </div>
        </div>
      </td>

      <td className="columna-nivel">
        <span
          className={`badge-nivel-tabla nivel-${jugador.puesto <= 3 ? jugador.puesto : "normal"}`}
        >
          Nivel {jugador.nivel}
        </span>
      </td>

      <td className="columna-xp">
        {(jugador.experiencia ?? 0).toLocaleString()}
      </td>

      <td className="columna-habitos">
        {jugador.habitosCompletados ?? 0}
      </td>

      <td className="columna-racha">
        {jugador.racha ?? 0} días
      </td>
    </tr>
  ))}
</tbody>

                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  };

  export default TablaClasificacion;
