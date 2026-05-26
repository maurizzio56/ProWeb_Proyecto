import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Empleado');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUsers = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.email) {
            storedUsers.push(userData);
          }
        } catch (error) {
          // skip invalid entries
        }
      }
    });
    setUsers(storedUsers);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userKey = `user_${email}`;
    if (localStorage.getItem(userKey)) {
      alert('Ya existe un usuario con ese email');
      return;
    }

    const newUser = { email, password, role };
    localStorage.setItem(userKey, JSON.stringify(newUser));
    setUsers([...users, newUser]);
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setRole('Empleado');
    alert('Usuario creado exitosamente');
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div style={{ padding: '2rem', marginLeft: '250px' }}>
      <h2>Administrar Usuarios</h2>
      <p>Desde aquí el administrador puede crear cuentas nuevas de Administrador o Empleado.</p>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
          </select>
        </div>
        <button type="submit">Crear usuario</button>
      </form>

      <div>
        <h3>Usuarios registrados</h3>
        <ul>
          {users.length > 0 ? (
            users.map((user, index) => (
              <li key={index}>{user.email} - {user.role}</li>
            ))
          ) : (
            <li>No hay usuarios creados.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPanel;