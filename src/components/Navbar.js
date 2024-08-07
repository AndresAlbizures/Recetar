import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Navbar = ({ onGenerateCalendar }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="logo-container">
            <img src={`${process.env.PUBLIC_URL}/supermercado.png`} alt="Logo" className="logo" />
            <span className="logo-text">Recetar</span>
          </div>
          <Link to="/" className="nav-button">Planificador</Link>
          <Link to="/planner" className="nav-button">Calendario</Link>
          <button onClick={onGenerateCalendar} className="nav-button">Generar Calendario</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
