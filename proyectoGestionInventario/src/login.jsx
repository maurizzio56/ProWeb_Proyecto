// Importa React y useNavigate para navegar entre rutas
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(''); // Estado para el email del usuario
  const [password, setPassword] = useState(''); // Estado para la contraseña del usuario
  const navigate = useNavigate(); // Hook para navegar entre rutas

  // Maneja el envío del formulario de inicio de sesión
  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUserData = localStorage.getItem(`user_${email}`);
    const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'Administrador');
      navigate('/panel');
    } else if (storedUser && storedUser.password === password) {
      localStorage.setItem('userRole', storedUser.role);
      navigate('/panel');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <br />
        <label>Contraseña:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;