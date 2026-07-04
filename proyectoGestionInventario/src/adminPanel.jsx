import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';

const AdminPanel = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('Empleado');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/usuarios');
      const data = await res.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (password.length < 4) {
      alert('La contraseña debe tener al menos 4 caracteres');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: userName || email.split('@')[0],
          email,
          password,
          rol: role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Usuario creado exitosamente');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setRole('Empleado');
        setUserName('');
        fetchUsers(); // Recargar la lista
      } else {
        alert(data.error || 'Error al crear usuario');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`¿Eliminar al usuario ${email}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/usuarios/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        alert('Usuario eliminado');
        fetchUsers();
      } else {
        alert('Error al eliminar usuario');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
    }
  };

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <h2>Cargando usuarios...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 className="titulo-pagina">Administrar Usuarios</h1>
          <p className="subtitulo-pagina">Crea y gestiona las cuentas de acceso de los empleados.</p>
        </div>

        <div className="admin-grid">
          <section className="tarjeta">
            <h2 className="titulo-seccion" style={{ marginBottom: '20px' }}>Nuevo Usuario</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label-formulario">Nombre (opcional)</label>
                <input
                  type="text"
                  className="input-formulario"
                  placeholder="Nombre del usuario"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>

              <div>
                <label className="label-formulario">Correo Electrónico</label>
                <input
                  type="email"
                  className="input-formulario"
                  placeholder="usuario@ejemplo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Contraseña</label>
                <input
                  type="password"
                  className="input-formulario"
                  placeholder="Mínimo 4 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="4"
                />
              </div>

              <div>
                <label className="label-formulario">Confirmar Contraseña</label>
                <input
                  type="password"
                  className="input-formulario"
                  placeholder="Repite la contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Rol</label>
                <select
                  className="select-formulario"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="Administrador">Administrador</option>
                  <option value="Empleado">Empleado</option>
                </select>
              </div>

              <button type="submit" className="btn-primario" style={{ marginTop: '8px' }}>
                Crear usuario
              </button>
            </form>
          </section>

          <section className="tabla-card" style={{ width: '100%', margin: '0' }}>
            <h2 className="titulo-seccion" style={{ marginBottom: '20px', textAlign: 'left' }}>
              Usuarios Registrados
            </h2>
            <table className="tabla-solicitudes">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Email</th>
                  <th>Rol</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id}>
                      <td style={{ textAlign: 'left', fontWeight: '500' }}>{user.email}</td>
                      <td>
                        <span
                          className={`badge ${user.rol === 'Administrador' ? 'pendiente' : 'proceso'}`}
                          style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}
                        >
                          {user.rol}
                        </span>
                      </td>
                      <td>
                        <button
                          onClick={() => handleDelete(user.id, user.email)}
                          style={{
                            backgroundColor: '#dc3545',
                            color: 'white',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontSize: '12px',
                          }}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" style={{ color: 'var(--text-muted)' }}>
                      No hay usuarios creados.
                    </td>
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