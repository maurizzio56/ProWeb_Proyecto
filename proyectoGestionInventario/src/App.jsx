import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './login';
import Inventario from './inventario';
import Panel from './Panel';
import AdminPanel from './adminPanel';

const App = () => {
  const userRole = localStorage.getItem('userRole');

  return (
    <Router>
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
          path="/admin"
          element={userRole === 'Administrador' ? <AdminPanel /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;