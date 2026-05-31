import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';
import solicitudesData from './data/solicitudes.json';
import './solicitudes.css';

const Solicitudes = () => {
  const userRole = localStorage.getItem('userRole');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [prioridad, setPrioridad] = useState('Alta');
  const [talla, setTalla] = useState('');
  const [solicitudes, setSolicitudes] = useState(() => {
    const datosGuardados = localStorage.getItem('solicitudes');
    return datosGuardados ? JSON.parse(datosGuardados) : solicitudesData;
    });
  useEffect(() => {
  localStorage.setItem('solicitudes', JSON.stringify(solicitudes));
  }, [solicitudes]);

  const cambiarEstado = (index, nuevoEstado) => {
    const solicitudesActualizadas = solicitudes.map((item, i) => {
      if (i === index) {
        return {
          ...item,
          estado: nuevoEstado,
        };
      }
      return item;
    });

    setSolicitudes(solicitudesActualizadas);
  };

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
                {userRole === 'Administrador' && <th>Acciones</th>}
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

                  {userRole === 'Administrador' && (
                    <td>
                      {item.estado === 'Pendiente de aprobación' ? (
                        <>
                          <button
                            className="btn-aprobar"
                            onClick={() => cambiarEstado(index, 'Aprobada')}
                          >
                            Aprobar
                          </button>

                          <button
                            className="btn-rechazar"
                            onClick={() => cambiarEstado(index, 'Rechazada')}
                          >
                            Rechazar
                          </button>
                        </>
                      ) : (
                        <span>Sin acciones</span>
                      )}
                    </td>
                  )}
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

              <select
                className="input-formulario"
                value={prioridad}
                onChange={(e) => setPrioridad(e.target.value)}
              >
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
                      estado: 'Pendiente de aprobación',
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