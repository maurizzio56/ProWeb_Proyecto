import React, { useEffect, useState } from 'react';
import Sidebar from './BarraLateral';
import {
  getSolicitudes,
  completarSolicitud,
} from './api';
import './reabastecimiento.css';

const Reabastecimiento = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [mensajeError, setMensajeError] = useState('');

  const userRole = localStorage.getItem('userRole');

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

  const solicitudesAprobadas = solicitudes.filter(
    (item) => item.estado === 'Aprobada'
  );

  const solicitudesPendientes = solicitudes.filter(
    (item) => item.estado === 'Pendiente de aprobación'
  );

  const solicitudesCompletadas = solicitudes.filter(
    (item) => item.estado === 'Completada'
  );

  const completarReposicion = async (id) => {
    try {
      await completarSolicitud(id);
      await cargarSolicitudes();
    } catch (error) {
      console.error('Error al completar la reposición:', error);
      alert('No se pudo completar la reposición.');
    }
  };

  return (
    <div className="reab-page">
      <Sidebar />

      <main className="reab-content">
        <div className="reab-header">
          <div>
            <h1>Reabastecimiento</h1>
          </div>
        </div>

        {mensajeError && <p>{mensajeError}</p>}

        <section className="reab-cards">
          <div className="reab-card">
            <span>Solicitudes Pendientes</span>
            <h2>{solicitudesPendientes.length}</h2>
          </div>

          <div className="reab-card">
            <span>Productos por Reponer</span>
            <h2>{solicitudesAprobadas.length}</h2>
          </div>

          <div className="reab-card">
            <span>Reposiciones Completadas</span>
            <h2>{solicitudesCompletadas.length}</h2>
          </div>
        </section>

        <section className="reab-table-card">
          <h2>Productos aprobados para reposición</h2>

          <table className="reab-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Talla</th>
                <th>Cantidad</th>
                <th>Prioridad</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {cargando ? (
                <tr>
                  <td colSpan="6">Cargando solicitudes...</td>
                </tr>
              ) : solicitudesAprobadas.length === 0 ? (
                <tr>
                  <td colSpan="6">
                    No hay productos aprobados para reposición.
                  </td>
                </tr>
              ) : (
                solicitudesAprobadas.map((item) => (
                  <tr key={item.id}>
                    <td>{item.producto}</td>
                    <td>{item.talla}</td>
                    <td>{item.cantidad}</td>
                    <td>{item.prioridad}</td>
                    <td>{item.estado}</td>
                    <td>
                      {userRole === 'Administrador' ? (
                        <button
                          className="btn-completar"
                          onClick={() => completarReposicion(item.id)}
                        >
                          Completar
                        </button>
                      ) : (
                        <span>-</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Reabastecimiento;