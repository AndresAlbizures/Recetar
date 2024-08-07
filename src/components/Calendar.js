import React from 'react';
import '../styles.css';

const Calendar = ({ calendar }) => {
  const dates = Object.keys(calendar);
  
  return (
    <div className="calendar-container">
      {dates.map((date) => (
        <div key={date} className="calendar-day">
          <h3>{date}</h3>
          <ul>
            {calendar[date].map((meal, index) => (
              <li key={index}>{meal.name} - {meal.type}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Calendar;
