// Importa React y useNavigate para navegar entre rutas
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './BarraLateral';

const AdminPanel = () => {
  const [email, setEmail] = useState(''); // Estado para el email del usuario a crear
  const [password, setPassword] = useState(''); // Estado para la contraseña del usuario a crear
  const [confirmPassword, setConfirmPassword] = useState(''); // Estado para confirmar la contraseña
  const [role, setRole] = useState('Empleado'); // Estado para el rol del usuario
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const navigate = useNavigate(); // Hook para navegar entre rutas

  useEffect(() => {
    // Carga los usuarios existentes desde el almacenamiento local
    const storedUsers = [];
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('user_')) {
        try {
          const userData = JSON.parse(localStorage.getItem(key));
          if (userData && userData.email) {
            storedUsers.push(userData);
          }
        } catch (error) {}
      }
    });
    setUsers(storedUsers);
  }, []);

  // Maneja el envío del formulario para crear un nuevo usuario
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

  // Maneja el cambio del rol seleccionado
  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  return (
    <div className="app-shell">
      {/* Barra lateral */}
      <Sidebar />
      <main className="main-content">
        <h2>Administrar Usuarios</h2>
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <label htmlFor="email">Correo:</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <br />
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <br />
          <label htmlFor="confirmPassword">Confirmar Contraseña:</label>
          <input type="password" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
          <br />
          <label htmlFor="role">Rol:</label>
          <select id="role" value={role} onChange={handleRoleChange}>
            <option value="Administrador">Administrador</option>
            <option value="Empleado">Empleado</option>
          </select>
          <button type="submit">Crear usuario</button>
        </form>

        {/* Lista de usuarios registrados */}
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
      </main>
    </div>
  );
};

export default AdminPanel;