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
      navigate('/dashboard');
    } else if (storedUser && storedUser.password === password) {
      localStorage.setItem('userRole', storedUser.role);
      navigate('/dashboard');
    } else {
      alert('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="tarjeta" style={{ width: '100%', maxWidth: '400px', padding: '40px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1 className="titulo-pagina" style={{ fontSize: '24px', marginBottom: '8px' }}>StyleFlow</h1>
          <p className="subtitulo-pagina">Gestión de Inventario Profesional</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label htmlFor="email" className="label-formulario">USUARIO</label>
            <input 
              type="email" 
              id="email" 
              className="input-formulario"
              placeholder="admin@styleflow.com"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="label-formulario">CONTRASEÑA</label>
            <input 
              type="password" 
              id="password" 
              className="input-formulario"
              placeholder="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
            />
          </div>

          <button type="submit" className="btn-primario" style={{ width: '100%', marginTop: '8px' }}>
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;