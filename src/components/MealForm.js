import React, { useState } from 'react';
import '../styles.css';

const MealForm = ({ addMeal }) => {
  const [meal, setMeal] = useState({ name: '', type: 'Desayuno' });

  const handleChange = (e) => {
    setMeal({ ...meal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMeal(meal);
    setMeal({ name: '', type: 'Desayuno' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        name="name" 
        value={meal.name} 
        onChange={handleChange} 
        placeholder="Nombre de la comida" 
      />
      <select name="type" value={meal.type} onChange={handleChange}>
        <option value="Desayuno">Desayuno</option>
        <option value="Almuerzo">Almuerzo</option>
        <option value="Cena">Cena</option>
      </select>
      <button type="submit">Agregar</button>
    </form>
  );
};

export default MealForm;
