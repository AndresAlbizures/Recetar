import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore, auth } from '../firebase';


const MealList = () => {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      if (auth.currentUser) {
        const userMealsRef = collection(firestore, 'users', auth.currentUser.uid, 'meals');
        const snapshot = await getDocs(userMealsRef);
        const fetchedMeals = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Ordenar las comidas por tipo
        const sortedMeals = [...fetchedMeals].sort((a, b) => {
          const typeOrder = { 'Desayuno': 1, 'Almuerzo': 2, 'Cena': 3 };
          return typeOrder[a.type] - typeOrder[b.type];
        });

        setMeals(sortedMeals);
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  const handleDelete = async (id) => {
    if (auth.currentUser) {
      const mealDocRef = doc(firestore, 'users', auth.currentUser.uid, 'meals', id);
      await deleteDoc(mealDocRef);
      setMeals(meals.filter(meal => meal.id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="meal-list-container">
      <h2>Lista de Menús</h2>
      <ul>
        {meals.map(meal => (
          <li key={meal.id}>
            <span>{meal.name} - {meal.type}</span>
            <button onClick={() => handleDelete(meal.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
