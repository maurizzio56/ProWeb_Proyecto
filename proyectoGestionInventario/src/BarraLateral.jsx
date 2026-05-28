// Importa React y useNavigate para navegar entre rutas
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const userRole = localStorage.getItem('userRole');

  return (
    <div className="sidebar">
      <ul className="sidebar-nav">
        <li>
          <button type="button" onClick={() => navigate('/login')}>Login</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/inventario')}>Inventario</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/solicitudes')}>Solicitudes</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/reabastecimiento')}>Reabastecimiento</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/movimientos')}>Movimientos</button>
        </li>
        <li>
          <button type="button" onClick={() => navigate('/proveedores')}>Proveedores</button>
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
    </div>
  );
};

export default Sidebar;