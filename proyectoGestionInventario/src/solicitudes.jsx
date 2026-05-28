import React, { useState } from 'react';
import Sidebar from './BarraLateral';
import './solicitudes.css';

const Solicitudes = () => {
const [mostrarFormulario, setMostrarFormulario] = useState(false);
const [producto, setProducto] = useState('');
const [cantidad, setCantidad] = useState('');
const [prioridad, setPrioridad] = useState('Alta');
const [talla, setTalla] = useState('');
const [solicitudes, setSolicitudes] = useState([
    {
      producto: 'Jeans Slim Fit Dark',
      talla: '32',
      cantidad: 20,
      prioridad: 'Alta',
      estado: 'Pendiente',
    },
    {
      producto: 'Chaqueta de Cuero Eco',
      talla: 'L',
      cantidad: 10,
      prioridad: 'Media',
      estado: 'En proceso',
    },
  ]);

  return (
  <div>
    <Sidebar />

    <div className="solicitudes-container">

      <div className="solicitudes-header">
        <h1>Solicitudes de Reabastecimiento</h1>

        <button
          className="btn-nueva"
          onClick={() => setMostrarFormulario(true)}
        >
          + Nueva Solicitud
        </button>
      </div>

      <div className="tabla-card">
        <table className="tabla-solicitudes">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Talla</th>
              <th>Cantidad</th>
              <th>Prioridad</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {solicitudes.map((item, index) => (
              <tr key={index}>
                <td>{item.producto}</td>
                <td>{item.talla}</td>
                <td>{item.cantidad}</td>
                <td>{item.prioridad}</td>
                <td>{item.estado}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {mostrarFormulario && (
        <div className="modal-fondo">
          <div className="modal-contenido">

            <h2>Nueva Solicitud</h2>

            <input
                type="text"
                placeholder="Producto"
                className="input-formulario"
                value={producto}
                onChange={(e) => setProducto(e.target.value)}
            />
            <input
                type="text"
                placeholder="Talla: S, M, L o 32"
                className="input-formulario"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
            />

            <input
                type="number"
                placeholder="Cantidad"
                className="input-formulario"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
            />

            <select className="input-formulario" value={prioridad} onChange={(e) => setPrioridad(e.target.value)}>

              <option>Alta</option>
              <option>Media</option>
              <option>Baja</option>
            </select>

            <div className="botones-modal">
              <button
                className="btn-guardar"
                onClick={() => {

                    const nuevaSolicitud = {
                    producto: producto,
                    talla: talla,
                    cantidad: cantidad,
                    prioridad: prioridad,
                    estado: 'Pendiente',
                    };

                    setSolicitudes([...solicitudes, nuevaSolicitud]);

                    setProducto('');
                    setCantidad('');
                    setPrioridad('Alta');
                    setTalla('');

                    setMostrarFormulario(false);
                }}
                >
                Guardar
            </button>
             <button
                    className="btn-cancelar"
                    onClick={() => setMostrarFormulario(false)}
                >
                    Cancelar
                </button>
            </div>

          </div>
        </div>
      )}

    </div>
  </div>
);
};

export default Solicitudes;