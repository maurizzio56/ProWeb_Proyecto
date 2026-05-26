import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const storedUserData = localStorage.getItem(`user_${email}`);
    const storedUser = storedUserData ? JSON.parse(storedUserData) : null;

    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('userRole', 'Administrador');
      navigate('/Panel');
    } else if (storedUser && storedUser.password === password) {
      localStorage.setItem('userRole', storedUser.role);
      navigate('/Panel');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;