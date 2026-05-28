// Importa React y useNavigate para navegar entre rutas
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const userRole = localStorage.getItem('userRole');

  return (
    <div style={{ width: '250px', position: 'fixed', top: '0', bottom: '0', left: '0', backgroundColor: '#f4f4f4' }}>
      <ul style={{ listStyleType: 'none', padding: '0' }}>
        <li onClick={() => navigate('/login')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Login</li>
        <li onClick={() => navigate('/inventario')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Inventario</li>
        <li onClick={() => navigate('/panel')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Panel</li>
        {userRole === 'Administrador' && (
          <li onClick={() => navigate('/admin')} style={{ padding: '10px 20px', cursor: 'pointer' }}>Administrar usuarios</li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;