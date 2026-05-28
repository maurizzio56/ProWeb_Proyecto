import React from 'react';
import Sidebar from './BarraLateral';

const Reabastecimiento = () => {
  return (
    <div className="reab-page">
      <Sidebar />

      <main className="reab-content">
        <div className="reab-header">
          <div>
            <h1>Solicitudes de Reabastecimiento</h1>
            <p>Gestiona productos que requieren reposición en la tienda.</p>
          </div>

          <button className="reab-btn">+ Nueva Solicitud</button>
        </div>

        <section className="reab-cards">
          <div className="reab-card">
            <span>Solicitudes Pendientes</span>
            <h2>3</h2>
          </div>

          <div className="reab-card">
            <span>Productos por Reponer</span>
            <h2>5</h2>
          </div>

          <div className="reab-card">
            <span>Reposiciones Completadas</span>
            <h2>8</h2>
          </div>
        </section>

        <section className="reab-table-card">
          <h2>Listado de Solicitudes</h2>

          <table className="reab-table">
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
              <tr>
                <td>Jeans Slim Fit Dark</td>
                <td>32</td>
                <td>20</td>
                <td><span className="badge alta">Alta</span></td>
                <td><span className="badge pendiente">Pendiente</span></td>
              </tr>

              <tr>
                <td>Chaqueta de Cuero Eco</td>
                <td>34</td>
                <td>10</td>
                <td><span className="badge media">Media</span></td>
                <td><span className="badge proceso">En proceso</span></td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default Reabastecimiento;