import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../firebase';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import '../styles.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/');
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="logo-container">
  
        <span className="logo-text">Recetar</span>
      </div>
      <h2>Registro</h2>
      <form onSubmit={handleSignUp}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <button className="google-button" onClick={handleGoogleSignUp}>
        Registrarse con Google
      </button>
      <p>
        ¿Ya tienes una cuenta? <Link to="/signin">Iniciar sesión</Link>
      </p>
    </div>
  );
};

export default SignUp;
