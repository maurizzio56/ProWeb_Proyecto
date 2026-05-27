// Importa React y useNavigate para navegar entre rutas
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const userRole = localStorage.getItem('userRole');

  return (
    <aside className="sidebar">
      {/* Barra lateral con opciones de navegación */}
      <div className="sidebar-brand">Gestión</div>
      <nav>
        <ul className="sidebar-nav">
          <li>
            <button type="button" onClick={() => navigate('/login')}>Login</button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/inventario')}>Inventario</button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/panel')}>Panel</button>
          </li>
          <li>
            <button type="button" onClick={() => navigate('/dashboard')}>Dashboard</button>
          </li>
          {userRole === 'Administrador' && (
            <li>
              <button type="button" onClick={() => navigate('/admin')}>Administrar usuarios</button>
            </li>
          )}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;