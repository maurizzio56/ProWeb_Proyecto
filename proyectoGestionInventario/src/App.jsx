// Importa React y los componentes necesarios para manejar rutas
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Importa los componentes de la aplicación
import Login from './login';
import Inventario from './inventario';
import Panel from './Panel';
import AdminPanel from './adminPanel';
import DashboardDiego from './DashboardDiego';
import Movimientos from './Movimientos';
import Proveedores from './Proveedores';
import Solicitudes from './solicitudes';
import Reabastecimiento from './reabastecimiento';

const App = () => {
  const userRole = localStorage.getItem('userRole'); // Obtiene el rol del usuario desde el almacenamiento local

  return (
    <Router>
      {/* Configura las rutas de la aplicación */}
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/inventario"
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <Inventario /> : <Navigate to="/login" />}
        />
        <Route
          path="/panel"
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <Panel /> : <Navigate to="/login" />}
        />
        <Route 
          path="/movimientos" 
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <Movimientos /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/proveedores" 
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <Proveedores /> : <Navigate to="/login" />} 
        />
        <Route
          path="/dashboard"
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <DashboardDiego /> : <Navigate to="/login" />}
        />
        <Route
          path="/solicitudes"
          element={
            userRole === 'Administrador' || userRole === 'Empleado'
              ? <Solicitudes />
              : <Navigate to="/login" />
          }
        />
        <Route
          path="/reabastecimiento"
          element={userRole === 'Administrador' || userRole === 'Empleado' ? <Reabastecimiento /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin"
          element={userRole === 'Administrador' ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;