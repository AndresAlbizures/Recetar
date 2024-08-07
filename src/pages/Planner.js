import React, { useRef } from 'react';
import { format, parseISO, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import html2canvas from 'html2canvas';
import './Planner.css';

const PrintableCalendar = React.forwardRef(({ calendar }, ref) => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  // Obtener todos los días del mes
  const daysInMonth = eachDayOfInterval({ start, end });

  return (
    <div ref={ref} className="printable-calendar">
      <h1>Planificador de Menú</h1>
      <h2>{format(today, 'MMMM yyyy')}</h2>
      <div className="planner-container">
        <div className="calendar-month">
          {daysInMonth.map(day => {
            const dateStr = format(day, 'yyyy-MM-dd');
            const currentDay = calendar.flat().find(d => parseISO(d.date).toDateString() === day.toDateString());
            const meals = currentDay ? currentDay.meals : [];

            return (
              <div key={dateStr} className="calendar-day">
                <h3>{format(day, 'd')}</h3>
                <p>{format(day, 'EEEE')}</p> {/* Nombre del día de la semana */}
                <ul>
                  {meals.map((meal, idx) => meal && <li key={idx}>{meal.name}</li>)}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

const Planner = ({ calendar }) => {
  const printableRef = useRef();

  const handleCapture = () => {
    html2canvas(printableRef.current).then(canvas => {
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = 'calendario-menus.png';
      link.click();
    });
  };

  return (
    <div className="planner-actions">
      <button className="print-button" onClick={handleCapture}>Guardar como Imagen</button>
      <PrintableCalendar ref={printableRef} calendar={calendar} />
    </div>
  );
};

export default Planner;
