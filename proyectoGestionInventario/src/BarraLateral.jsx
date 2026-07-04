import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return (
    <div className="sidebar">
      {/* === SECCIÓN DEL USUARIO (NUEVA) === */}
      <div style={{ 
        padding: '16px 20px', 
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        marginBottom: '8px'
      }}>
        <p style={{ margin: 0, color: '#fff', fontWeight: 'bold', fontSize: '16px' }}>
          {userName || 'Usuario'}
        </p>
        <p style={{ margin: 0, fontSize: '12px', color: '#9ca3af' }}>
          {userEmail || ''}
        </p>
        <p style={{ margin: 0, fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
          {userRole || 'Sin rol'}
        </p>
      </div>
      {/* === FIN SECCIÓN USUARIO === */}

      <ul className="sidebar-nav">
        <li><button type="button" onClick={() => navigate('/dashboard')}>Panel de Control</button></li>
        <li><button type="button" onClick={() => navigate('/inventario')}>Inventario</button></li>
        <li><button type="button" onClick={() => navigate('/reabastecimiento')}>Reabastecimiento</button></li>
        <li><button type="button" onClick={() => navigate('/movimientos')}>Movimientos</button></li>
        <li><button type="button" onClick={() => navigate('/proveedores')}>Proveedores</button></li>
        <li><button type="button" onClick={() => navigate('/solicitudes')}>Solicitudes</button></li>
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