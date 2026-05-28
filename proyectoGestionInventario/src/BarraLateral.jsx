// Importa React y useNavigate para navegar entre rutas
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const userRole = localStorage.getItem('userRole');

  // Maneja el evento del botón "Cerrar Sesión"
  const handleLogout = () => {
    localStorage.removeItem('userRole');
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

return (
  <div className="sidebar">
    <ul className="sidebar-nav">
      <li><button type="button" onClick={() => navigate('/inventario')}>Inventario</button></li>
      <li><button type="button" onClick={() => navigate('/solicitudes')}>Solicitudes</button></li>
      <li><button type="button" onClick={() => navigate('/reabastecimiento')}>Reabastecimiento</button></li>
      <li><button type="button" onClick={() => navigate('/movimientos')}>Movimientos</button></li>
      <li><button type="button" onClick={() => navigate('/proveedores')}>Proveedores</button></li>
      <li><button type="button" onClick={() => navigate('/dashboard')}>Dashboard</button></li>
      {userRole === 'Administrador' && (
        <li><button type="button" onClick={() => navigate('/admin')}>Administrar usuarios</button></li>
      )}
    </ul>

    {userRole && (
      <div className="sidebar-footer">
        <button type="button" className="logout-btn" onClick={handleLogout}>
          Cerrar Sesión
        </button>
      </div>
    )}  
  </div>
);
};

export default Sidebar;