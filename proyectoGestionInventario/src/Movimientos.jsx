import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';
import { getMovimientos, createMovimiento } from './api';

const Movimientos = () => {

  // FORMULARIO
  const [movement, setMovement] = useState({
    producto_id: '',
    tipo: 'Entrada',
    cantidad: '',
    precio: '',
    moneda: 'Soles',
    fecha: '',
    responsable: ''
  });

  const [movements, setMovements] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTROS
  const [filterType, setFilterType] = useState('Todos');
  const [filterCurrency, setFilterCurrency] = useState('Todas');
  const [showDateFilters, setShowDateFilters] = useState(false);
  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  // Cargar movimientos desde el backend
  useEffect(() => {
    getMovimientos()
      .then(data => {
        setMovements(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar movimientos:', err);
        setLoading(false);
      });
  }, []);

  const handleChange = (event) => {
    setMovement({
      ...movement,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      !movement.producto_id ||
      !movement.cantidad ||
      !movement.precio ||
      !movement.fecha ||
      !movement.responsable
    ) {
      alert('Complete todos los campos');
      return;
    }

    try {
      const data = await createMovimiento(movement);
      setMovements([data, ...movements]);
      setMovement({
        producto_id: '',
        tipo: 'Entrada',
        cantidad: '',
        precio: '',
        moneda: 'Soles',
        fecha: '',
        responsable: ''
      });
    } catch (error) {
      console.error('Error al registrar movimiento:', error);
      alert('Error al registrar movimiento');
    }
  };

  // FILTRAR MOVIMIENTOS
  const filteredMovements = movements.filter((item) => {
    const itemYear = item.fecha?.slice(0, 4);
    const itemMonth = item.fecha?.slice(5, 7);
    const itemDay = item.fecha?.slice(8, 10);

    const matchesType = filterType === 'Todos' || item.tipo === filterType;
    const matchesCurrency = filterCurrency === 'Todas' || item.moneda === filterCurrency;
    const matchesYear = !filterYear || itemYear === filterYear;
    const matchesMonth = !filterMonth || itemMonth === filterMonth;
    const matchesDay = !filterDay || itemDay === filterDay;

    return matchesType && matchesCurrency && matchesYear && matchesMonth && matchesDay;
  });

  const sortedMovements = [...filteredMovements].sort(
    (a, b) => new Date(b.fecha) - new Date(a.fecha)
  );

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <h2>Cargando movimientos...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <div style={{ marginBottom: '32px' }}>
          <h1 className="titulo-pagina">Movimientos de Inventario</h1>
          <p className="subtitulo-pagina">Kardex y registro detallado de entradas y salidas de mercadería.</p>
        </div>

        <div className="admin-grid">
          {/* FORMULARIO */}
          <section className="tarjeta">
            <h2 className="titulo-seccion" style={{ marginBottom: '20px' }}>Registrar Movimiento</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="label-formulario">ID del Producto:</label>
                <input
                  type="number"
                  name="producto_id"
                  className="input-formulario"
                  placeholder="Ej. 1"
                  value={movement.producto_id}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Tipo de Movimiento:</label>
                <select name="tipo" className="select-formulario" value={movement.tipo} onChange={handleChange}>
                  <option value="Entrada">Entrada</option>
                  <option value="Salida">Salida</option>
                </select>
              </div>

              <div>
                <label className="label-formulario">Cantidad:</label>
                <input
                  type="number"
                  name="cantidad"
                  className="input-formulario"
                  placeholder="Ej. 15"
                  value={movement.cantidad}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Precio:</label>
                <input
                  type="number"
                  name="precio"
                  className="input-formulario"
                  placeholder="Ej. 150"
                  value={movement.precio}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Moneda:</label>
                <select name="moneda" className="select-formulario" value={movement.moneda} onChange={handleChange}>
                  <option value="Soles">Soles</option>
                  <option value="Dólares">Dólares</option>
                  <option value="Euros">Euros</option>
                </select>
              </div>

              <div>
                <label className="label-formulario">Fecha:</label>
                <input
                  type="date"
                  name="fecha"
                  className="input-formulario"
                  value={movement.fecha}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label className="label-formulario">Responsable:</label>
                <input
                  type="text"
                  name="responsable"
                  className="input-formulario"
                  placeholder="Ej. Admin"
                  value={movement.responsable}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="btn-primario" style={{ marginTop: '8px' }}>
                Registrar Movimiento
              </button>
            </form>
          </section>

          {/* TABLA */}
          <section className="tabla-card" style={{ width: '100%', margin: '0' }}>
            <h2 className="titulo-seccion" style={{ marginBottom: '20px', textAlign: 'left' }}>
              Historial de Movimientos
            </h2>

            {/* FILTROS */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select-formulario"
                style={{ width: '130px', padding: '8px', fontSize: '14px' }}
              >
                <option value="Todos">Todos</option>
                <option value="Entrada">Entradas</option>
                <option value="Salida">Salidas</option>
              </select>

              <select
                value={filterCurrency}
                onChange={(e) => setFilterCurrency(e.target.value)}
                className="select-formulario"
                style={{ width: '130px', padding: '8px', fontSize: '14px' }}
              >
                <option value="Todas">Monedas</option>
                <option value="Soles">Soles</option>
                <option value="Dólares">Dólares</option>
                <option value="Euros">Euros</option>
              </select>

              <button
                type="button"
                className="btn-primario"
                onClick={() => setShowDateFilters(!showDateFilters)}
                style={{ padding: '8px 14px', fontSize: '14px' }}
              >
                Fecha
              </button>
            </div>

            {showDateFilters && (
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)} className="select-formulario" style={{ width: '110px', padding: '8px', fontSize: '14px' }}>
                  <option value="">Año</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>

                <select value={filterMonth} onChange={(e) => setFilterMonth(e.target.value)} className="select-formulario" style={{ width: '130px', padding: '8px', fontSize: '14px' }}>
                  <option value="">Mes</option>
                  <option value="01">Enero</option>
                  <option value="02">Febrero</option>
                  <option value="03">Marzo</option>
                  <option value="04">Abril</option>
                  <option value="05">Mayo</option>
                  <option value="06">Junio</option>
                  <option value="07">Julio</option>
                  <option value="08">Agosto</option>
                  <option value="09">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>

                <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)} className="select-formulario" style={{ width: '90px', padding: '8px', fontSize: '14px' }}>
                  <option value="">Día</option>
                  {[...Array(31)].map((_, i) => {
                    const day = String(i + 1).padStart(2, '0');
                    return <option key={day} value={day}>{day}</option>;
                  })}
                </select>
              </div>
            )}

            <table className="tabla-solicitudes">
              <thead>
                <tr>
                  <th style={{ textAlign: 'left' }}>Producto</th>
                  <th>Tipo</th>
                  <th>Cantidad</th>
                  <th>Precio</th>
                  <th>Moneda</th>
                  <th>Fecha</th>
                  <th>Responsable</th>
                </tr>
              </thead>
              <tbody>
                {sortedMovements.length > 0 ? (
                  sortedMovements.map((item, index) => (
                    <tr key={item.id || index}>
                      <td style={{ textAlign: 'left', fontWeight: '500' }}>
                        {item.producto?.nombre || item.producto_id || 'Producto'}
                      </td>
                      <td>
                        <span className={`badge ${item.tipo === 'Entrada' ? 'pendiente' : 'alta'}`}
                          style={{ padding: '6px 12px', borderRadius: '12px', fontSize: '13px', fontWeight: 'bold' }}>
                          {item.tipo}
                        </span>
                      </td>
                      <td style={{ fontWeight: 'bold' }}>{item.cantidad} unds</td>
                      <td>{item.precio}</td>
                      <td>{item.moneda}</td>
                      <td>{item.fecha}</td>
                      <td>{item.responsable}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" style={{ color: 'var(--text-muted)', padding: '24px' }}>
                      No hay movimientos registrados.
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