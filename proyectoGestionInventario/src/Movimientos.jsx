import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Movimientos = () => {
  const [movement, setMovement] = useState({
    product: '',
    type: 'Entrada',
    quantity: '',
    date: '',
    responsible: ''
  });

  const [movements, setMovements] = useState([]);

  const handleChange = (event) => {
    setMovement({
      ...movement,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      movement.product &&
      movement.quantity &&
      movement.date &&
      movement.responsible
    ) {
      setMovements([...movements, movement]);

      setMovement({
        product: '',
        type: 'Entrada',
        quantity: '',
        date: '',
        responsible: ''
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
          <h1 className="titulo-pagina">Movimientos de Inventario</h1>
          <p className="subtitulo-pagina">Kardex y registro detallado de entradas y salidas de mercadería.</p>
        </div>

        <div className="admin-grid">
          {/* Columna Izquierda: Formulario */}
          <section className="tarjeta">
            <h2 className="titulo-seccion" style={{ marginBottom: '20px' }}>Registrar Movimiento</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label htmlFor="product" className="label-formulario">Producto:</label>
                <input
                  type="text"
                  id="product"
                  name="product"
                  className="input-formulario"
                  placeholder="Ej. Jeans Slim Fit Dark"
                  value={movement.product}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="type" className="label-formulario">Tipo de Movimiento:</label>
                <select
                  id="type"
                  name="type"
                  className="select-formulario"
                  value={movement.type}
                  onChange={handleChange}
                >
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                </select>
              </div>

              <div>
                <label htmlFor="quantity" className="label-formulario">Cantidad / Unidades:</label>
                <input
                  type="number"
                  id="quantity"
                  name="quantity"
                  className="input-formulario"
                  placeholder="Ej. 15"
                  value={movement.quantity}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="label-formulario">Fecha del Movimiento:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  className="input-formulario"
                  value={movement.date}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label htmlFor="responsible" className="label-formulario">Responsable:</label>
                <input
                  type="text"
                  id="responsible"
                  name="responsible"
                  className="input-formulario"
                  placeholder="Ej. Admin StyleFlow"
                  value={movement.responsible}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primario" style={{ marginTop: '8px' }}>
                Registrar Movimiento
              </button>
            </form>
          </section>

          {/* Columna Derecha: Tabla de Historial */}
          <section className="tabla-card" style={{ width: '100%', margin: '0' }}>
            <h2 className="titulo-seccion" style={{ marginBottom: '20px', textAlign: 'left' }}>Historial de Movimientos</h2>
            <table className="tabla-solicitudes">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Fecha</th>
                  <th>Responsable</th>
                </tr>
              </thead>
              <tbody>
                {movements.length > 0 ? (
                  movements.map((item, index) => (
                    <tr key={index}>
                      <td style={{ textAlign: 'left', fontWeight: '500' }}>{item.product}</td>
                      <td>
                        {/* Render dinámico del badge según sea Entrada o Salida */}
                        <span className={`badge ${item.type === 'Entrada' ? 'pendiente' : 'alta'}`} style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
                          {item.type}
                        </span>
                      </td>
                      <td style={{ fontWeight: 'bold' }}>{item.quantity} unds</td>
                      <td>{item.date}</td>
                      <td>{item.responsible}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ color: 'var(--text-muted)', padding: '24px' }}>
                      No se han registrado movimientos de stock hoy.
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

export default Movimientos;