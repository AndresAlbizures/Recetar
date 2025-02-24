import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Planner from './pages/Planner';
import MealList from './components/MealList';
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import { auth, firestore } from './firebase';
import { onAuthStateChanged } from "firebase/auth";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { startOfMonth, endOfMonth, format, startOfWeek, endOfWeek, addWeeks, eachDayOfInterval } from 'date-fns';
import './styles.css';

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [meals, setMeals] = useState([]);
  const [calendar, setCalendar] = useState([]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addMeal = async (meal) => {
    if (user) {
      const userMealsRef = collection(firestore, 'users', user.uid, 'meals');
      await addDoc(userMealsRef, meal);
      setMeals([...meals, meal]);
    }
  };

  const generateCalendar = async () => {
    if (user) {
      const userMealsRef = collection(firestore, 'users', user.uid, 'meals');
      const snapshot = await getDocs(userMealsRef);
      const fetchedMeals = snapshot.docs.map(doc => doc.data());

      const weeks = [];
      let weekStart = startOfWeek(startOfMonth(new Date()));
      let weekEnd = endOfWeek(startOfMonth(new Date()));

      while (weekStart <= endOfMonth(new Date())) {
        weeks.push(
          eachDayOfInterval({ start: weekStart, end: weekEnd })
        );
        weekStart = addWeeks(weekStart, 1);
        weekEnd = endOfWeek(weekStart);
      }

      const calendarData = weeks.map(week => {
        return week.map(day => {
          const formattedDate = format(day, 'yyyy-MM-dd');
          const mealsForDay = {
            date: formattedDate,
            meals: []
          };
          const breakfast = fetchedMeals.filter(m => m.type === 'Desayuno');
          const lunch = fetchedMeals.filter(m => m.type === 'Almuerzo');
          const dinner = fetchedMeals.filter(m => m.type === 'Cena');

          mealsForDay.meals.push(breakfast[Math.floor(Math.random() * breakfast.length)]);
          mealsForDay.meals.push(lunch[Math.floor(Math.random() * lunch.length)]);
          mealsForDay.meals.push(dinner[Math.floor(Math.random() * dinner.length)]);

          return mealsForDay;
        });
      });

      setCalendar(calendarData);
    }
  };

  if (loading) {
    return <div>Cargando...</div>; // Puedes agregar un spinner o alguna animación de carga aquí
  }

  return (
    <Router>
      {user ? (
        <>
          <Navbar onGenerateCalendar={generateCalendar} />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home meals={meals} addMeal={addMeal} />} />
              <Route path="/planner" element={<Planner calendar={calendar} />} />
              <Route path="/meals" element={<MealList />} /> {/* Nueva ruta */}
              <Route path="*" element={<Navigate to="/" />} /> {/* Redirigir cualquier ruta no válida a la página principal */}
            </Routes>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="*" element={<Navigate to="/signin" />} /> {/* Redirigir cualquier ruta no válida a la página de inicio de sesión */}
        </Routes>
      )}
    </Router>
  );
};

export default App;
