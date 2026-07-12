import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';

const Proveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [nombre, setNombre] = useState('');
  const [contacto, setContacto] = useState('');

  // Cargar proveedores
  useEffect(() => {
    fetch('http://localhost:5000/api/proveedores')
      .then(res => res.json())
      .then(data => setProveedores(data))
      .catch(err => console.error('Error:', err));
  }, []);

  // Agregar proveedor
  const agregarProveedor = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5000/api/proveedores', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nombre, contacto })
    });
    const data = await res.json();
    setProveedores([...proveedores, data]);
    setNombre('');
    setContacto('');
  };

  // Eliminar proveedor
  const eliminarProveedor = async (id) => {
    await fetch(`http://localhost:5000/api/proveedores/${id}`, {
      method: 'DELETE'
    });
    setProveedores(proveedores.filter(p => p.id !== id));
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <h1>Proveedores</h1>

        <form onSubmit={agregarProveedor}>
          <input
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <input
            type="text"
            placeholder="Contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
          />
          <button type="submit">Agregar</button>
        </form>

        <ul>
          {proveedores.map(p => (
            <li key={p.id}>
              {p.nombre} - {p.contacto}
              <button onClick={() => eliminarProveedor(p.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Proveedores;