import React from 'react';
import MealForm from '../components/MealForm';
import MealList from '../components/MealList';
import '../styles.css';

const Home = ({ meals, addMeal }) => {
  return (
    <div className="container">
      <h1>Planificador de Menús</h1>
      <MealForm addMeal={addMeal} />
      <MealList meals={meals} />
    </div>
  );
};

export default Home;
