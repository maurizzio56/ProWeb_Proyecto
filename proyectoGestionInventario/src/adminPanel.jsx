import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Empleado');
  const [users, setUsers] = useState([]);

  useEffect(() => {
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

  return (
    <div className="app-shell">
      <Sidebar />
      
      <main className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 className="titulo-pagina">Administrar Usuarios</h1>
          <p className="subtitulo-pagina">Crea y gestiona las cuentas de acceso de los empleados.</p>
        </div>

        <div className="admin-grid">
          {/* Columna Izquierda: Formulario */}
          <section className="tarjeta">
            <h2 className="titulo-seccion" style={{ marginBottom: '20px' }}>Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="email" className="label-formulario">Correo Electrónico:</label>
                <input type="email" id="email" className="input-formulario" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              
              <div>
                <label htmlFor="password" className="label-formulario">Contraseña:</label>
                <input type="password" id="password" className="input-formulario" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="label-formulario">Confirmar Contraseña:</label>
                <input type="password" id="confirmPassword" className="input-formulario" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
              </div>

              <div>
                <label htmlFor="role" className="label-formulario">Rol del Sistema:</label>
                <select id="role" className="select-formulario" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>

              <button type="submit" className="btn-primario" style={{ marginTop: '8px' }}>Crear usuario</button>
            </form>
          </section>

          {/* Columna Derecha: Tabla de usuarios registrados */}
          <section className="tabla-card" style={{ width: '100%', margin: '0' }}>
            <h2 className="titulo-seccion" style={{ marginBottom: '20px', textAlign: 'left' }}>Usuarios Registrados</h2>
            <table className="tabla-solicitudes">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Email</th>
                  <th>Rol Asignado</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'left', fontWeight: '500' }}>{user.email}</td>
                      <td>
                        <span className={`badge ${user.role === 'Administrador' ? 'pendiente' : 'proceso'}`} style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ color: 'var(--text-muted)' }}>No hay usuarios creados.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;