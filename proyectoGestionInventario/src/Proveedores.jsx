import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Proveedores = () => {
  const [provider, setProvider] = useState({
    name: '',
    contact: '',
    products: '',
    relationship: ''
  });

  const [providers, setProviders] = useState([]);

  const handleChange = (event) => {
    setProvider({
      ...provider,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      provider.name &&
      provider.contact &&
      provider.products &&
      provider.relationship
    ) {
      setProviders([...providers, provider]);

      setProvider({
        name: '',
        contact: '',
        products: '',
        relationship: ''
      });
    } else {
      alert('Complete todos los campos');
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '250px', padding: '1rem', width: '100%' }}>
        <h2>Gestión de Proveedores</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={provider.name}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Contacto:
            <input
              type="text"
              name="contact"
              value={provider.contact}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Productos suministrados:
            <input
              type="text"
              name="products"
              value={provider.products}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Relación comercial:
            <input
              type="text"
              name="relationship"
              value={provider.relationship}
              onChange={handleChange}
            />
          </label>

          <br />
          <br />

          <button type="submit">Registrar Proveedor</button>
        </form>

        <hr />

        <h3>Lista de proveedores</h3>

        {providers.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem'
            }}
          >
            <p><strong>Nombre:</strong> {item.name}</p>
            <p><strong>Contacto:</strong> {item.contact}</p>
            <p><strong>Productos:</strong> {item.products}</p>
            <p><strong>Relación:</strong> {item.relationship}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Proveedores;