import React, { useEffect, useState } from 'react';
import Sidebar from './BarraLateral';
import {
  getSolicitudes,
  createSolicitud,
  updateSolicitud,
} from './api';
import './solicitudes.css';

const Solicitudes = () => {
  const userRole = localStorage.getItem('userRole');

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [producto, setProducto] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [prioridad, setPrioridad] = useState('Alta');
  const [talla, setTalla] = useState('');
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const cargarSolicitudes = async () => {
    try {
      setCargando(true);
      setMensajeError('');

      const datos = await getSolicitudes();
      setSolicitudes(datos);
    } catch (error) {
      console.error('Error al cargar solicitudes:', error);
      setMensajeError('No se pudieron cargar las solicitudes.');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const guardarSolicitud = async () => {
    if (!producto.trim() || !talla.trim() || !cantidad) {
      alert('Completa producto, talla y cantidad.');
      return;
    }

    if (Number(cantidad) <= 0) {
      alert('La cantidad debe ser mayor que cero.');
      return;
    }

    try {
      const nuevaSolicitud = {
        producto: producto.trim(),
        talla: talla.trim(),
        cantidad: Number(cantidad),
        prioridad,
        usuario_id: 1,
      };

      await createSolicitud(nuevaSolicitud);
      await cargarSolicitudes();

      setProducto('');
      setCantidad('');
      setPrioridad('Alta');
      setTalla('');
      setMostrarFormulario(false);
    } catch (error) {
      console.error('Error al crear la solicitud:', error);
      alert('No se pudo guardar la solicitud.');
    }
  };

  const cambiarEstado = async (id, nuevoEstado) => {
    try {
      await updateSolicitud(id, {
        estado: nuevoEstado,
      });

      await cargarSolicitudes();
    } catch (error) {
      console.error('Error al cambiar el estado:', error);
      alert('No se pudo actualizar el estado.');
    }
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

        {mensajeError && <p>{mensajeError}</p>}

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
              {cargando ? (
                <tr>
                  <td
                    colSpan={userRole === 'Administrador' ? 6 : 5}
                  >
                    Cargando solicitudes...
                  </td>
                </tr>
              ) : solicitudes.length === 0 ? (
                <tr>
                  <td
                    colSpan={userRole === 'Administrador' ? 6 : 5}
                  >
                    No hay solicitudes registradas.
                  </td>
                </tr>
              ) : (
                solicitudes.map((item) => (
                  <tr key={item.id}>
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
                              onClick={() =>
                                cambiarEstado(item.id, 'Aprobada')
                              }
                            >
                              Aprobar
                            </button>

                            <button
                              className="btn-rechazar"
                              onClick={() =>
                                cambiarEstado(item.id, 'Rechazada')
                              }
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
                ))
              )}
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
                min="1"
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
                  onClick={guardarSolicitud}
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