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
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <div style={{ marginLeft: '250px', padding: '1rem', width: '100%' }}>
        <h2>Movimientos de Inventario</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Producto:
            <input
              type="text"
              name="product"
              value={movement.product}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Tipo:
            <select
              name="type"
              value={movement.type}
              onChange={handleChange}
            >
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
            </select>
          </label>

          <br />

          <label>
            Cantidad:
            <input
              type="number"
              name="quantity"
              value={movement.quantity}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Fecha:
            <input
              type="date"
              name="date"
              value={movement.date}
              onChange={handleChange}
            />
          </label>

          <br />

          <label>
            Responsable:
            <input
              type="text"
              name="responsible"
              value={movement.responsible}
              onChange={handleChange}
            />
          </label>

          <br />
          <br />

          <button type="submit">Registrar Movimiento</button>
        </form>

        <hr />

        <h3>Historial de Movimientos</h3>

        {movements.map((item, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              padding: '1rem',
              marginBottom: '1rem'
            }}
          >
            <p><strong>Producto:</strong> {item.product}</p>
            <p><strong>Tipo:</strong> {item.type}</p>
            <p><strong>Cantidad:</strong> {item.quantity}</p>
            <p><strong>Fecha:</strong> {item.date}</p>
            <p><strong>Responsable:</strong> {item.responsible}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movimientos;