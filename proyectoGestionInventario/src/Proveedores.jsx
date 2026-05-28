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
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 className="titulo-pagina">Gestión de Proveedores</h1>
          <p className="subtitulo-pagina">Administra los contactos y relaciones comerciales de la tienda.</p>
        </div>

        <div className="admin-grid">
          {/* Columna Izquierda: Formulario */}
          <section className="tarjeta">
            <h2 className="titulo-seccion" style={{ marginBottom: '20px' }}>Registrar Proveedor</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="name" className="label-formulario">Nombre / Empresa:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="input-formulario"
                  placeholder="Ej. Distribuidora Textil"
                  value={provider.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="contact" className="label-formulario">Contacto (Teléfono / Correo):</label>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  className="input-formulario"
                  placeholder="Ej. +51 999 888 777"
                  value={provider.contact}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="products" className="label-formulario">Productos suministrados:</label>
                <input
                  type="text"
                  id="products"
                  name="products"
                  className="input-formulario"
                  placeholder="Ej. Polos, Casacas, Pantalones"
                  value={provider.products}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="relationship" className="label-formulario">Relación comercial:</label>
                <input
                  type="text"
                  id="relationship"
                  name="relationship"
                  className="input-formulario"
                  placeholder="Ej. Contrato Anual / Crédito 30 días"
                  value={provider.relationship}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primario" style={{ marginTop: '8px' }}>
                Registrar Proveedor
              </button>
            </form>
          </section>

          {/* Columna Derecha: Tabla de Proveedores */}
          <section className="tabla-card" style={{ width: '100%', margin: '0' }}>
            <h2 className="titulo-seccion" style={{ marginBottom: '20px', textAlign: 'left' }}>Lista de Proveedores</h2>
            <table className="tabla-solicitudes">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Proveedor</th>
                  <th>Contacto</th>
                  <th>Productos</th>
                  <th>Relación</th>
                </tr>
              </thead>
              <tbody>
                {providers.length > 0 ? (
                  providers.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'left', fontWeight: '500' }}>{item.name}</td>
                      <td>{item.contact}</td>
                      <td>{item.products}</td>
                      <td>
                        <span className="badge proceso" style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
                          {item.relationship}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ color: 'var(--text-muted)', padding: '24px' }}>
                      No hay proveedores registrados.
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

export default Proveedores;