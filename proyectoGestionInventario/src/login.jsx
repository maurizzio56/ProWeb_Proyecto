import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Ingresa tu correo y contraseña.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5000/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password })
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('userRole', data.rol);
        localStorage.setItem('userName', data.nombre);
        localStorage.setItem('userEmail', data.email);
        localStorage.setItem('userId', data.id);
        navigate('/dashboard');
      } else {
        setError(data.error || 'Credenciales inválidas');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error al conectar con el servidor');
    } finally {
      setLoading(false);
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

          {error && <p style={{ margin: 0, color: '#dc2626', fontSize: '14px' }}>{error}</p>}

          <button type="submit" className="btn-primario" style={{ width: '100%', marginTop: '8px' }} disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;