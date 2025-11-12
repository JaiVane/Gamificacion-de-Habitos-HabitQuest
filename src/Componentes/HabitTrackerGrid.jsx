import "../Estilos/stylesComponentes/HabitTrackerGrid.css";



const HabitTrackerGrid = ({ frecuencia, historial }) => {
    const hoy = new Date();
    const fechasCumplidas = historial.map(r => new Date(r.fecha).toDateString());
  
    let dias = [];
  
    if (frecuencia === "Diaria" || frecuencia === "Semanal") {
      const inicioSemana = new Date(hoy);
      inicioSemana.setDate(hoy.getDate() - hoy.getDay()); // domingo
      for (let i = 0; i < 7; i++) {
        const dia = new Date(inicioSemana);
        dia.setDate(inicioSemana.getDate() + i);
        dias.push(dia);
      }
    } else if (frecuencia === "Mensual") {
      const totalDias = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 0).getDate();
      for (let i = 1; i <= totalDias; i++) {
        dias.push(new Date(hoy.getFullYear(), hoy.getMonth(), i));
      }
    }
  
    return (
      <div className="tracker-grid">
        {dias.map((dia, index) => {
          const marcado = fechasCumplidas.includes(dia.toDateString());
          return (
            <div key={index} className={`tracker-dia ${marcado ? "cumplido" : ""}`} title={dia.toLocaleDateString('es-ES', { dateStyle: 'full' })}>
              <span className="dia-mes">
                {dia.toLocaleDateString('es-ES', { month: 'short' }).replace('.', '')}
              </span>
              <span className="dia-numero">{dia.getDate()}</span>
            </div>
          );
        })}
      </div>
    );
  };
  
  export default HabitTrackerGrid;