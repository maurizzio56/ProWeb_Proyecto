import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';
import './reabastecimiento.css';

const Reabastecimiento = () => {
  const [solicitudes, setSolicitudes] = useState([]);
  const userRole = localStorage.getItem('userRole');
useEffect(() => {
  const datosGuardados = localStorage.getItem('solicitudes');

  if (datosGuardados) {
    setSolicitudes(JSON.parse(datosGuardados));
  }
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

const completarReposicion = (indexAprobada) => {
  const solicitudAprobada = solicitudesAprobadas[indexAprobada];

  const solicitudesActualizadas = solicitudes.map((item) => {
    if (
      item.producto === solicitudAprobada.producto &&
      item.talla === solicitudAprobada.talla &&
      item.estado === 'Aprobada'
    ) {
      return { ...item, estado: 'Completada' };
    }

    return item;
  });

  setSolicitudes(solicitudesActualizadas);
  localStorage.setItem('solicitudes', JSON.stringify(solicitudesActualizadas));
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
            {solicitudesAprobadas.map((item, index) => (
            <tr key={index}>
            <td>{item.producto}</td>
            <td>{item.talla}</td>
            <td>{item.cantidad}</td>
            <td>{item.prioridad}</td>
            <td>{item.estado}</td>
            <td>
              {userRole === 'Administrador' ? (
                <button
                  className="btn-completar"
                  onClick={() => completarReposicion(index)}> Completar
                </button>
              ) : (
                <span>-</span>
              )}
            </td>
    </tr>
  ))}
</tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Reabastecimiento;