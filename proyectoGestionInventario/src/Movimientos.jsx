import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Movimientos = () => {

  // FORMULARIO
  const [movement, setMovement] = useState({
    product: '',
    type: 'Entrada',
    quantity: '',
    price: '',
    currency: 'Soles',
    date: '',
    responsible: ''
  });

  // LISTA DE MOVIMIENTOS
  const [movements, setMovements] = useState([
  {
    product: 'Polo Oversize Negro',
    type: 'Entrada',
    quantity: 25,
    price: 45,
    currency: 'Soles',
    date: '2026-05-20',
    responsible: 'Carlos Ramírez'
  },
  {
    product: 'Casaca Denim Blue',
    type: 'Salida',
    quantity: 8,
    price: 120,
    currency: 'Soles',
    date: '2026-05-22',
    responsible: 'Andrea Torres'
  },
  {
    product: 'Jeans Slim Fit Dark',
    type: 'Entrada',
    quantity: 15,
    price: 95,
    currency: 'Dólares',
    date: '2026-05-24',
    responsible: 'Miguel Castro'
  },
  {
    product: 'Hoodie Urban Gray',
    type: 'Salida',
    quantity: 5,
    price: 150,
    currency: 'Euros',
    date: '2026-05-26',
    responsible: 'Lucía Mendoza'
  }
]);

  // FILTROS
  const [filterType, setFilterType] = useState('Todos');
  const [filterCurrency, setFilterCurrency] = useState('Todas');

  const [showDateFilters, setShowDateFilters] = useState(false);

  const [filterYear, setFilterYear] = useState('');
  const [filterMonth, setFilterMonth] = useState('');
  const [filterDay, setFilterDay] = useState('');

  // CAMBIOS EN INPUTS
  const handleChange = (event) => {
    setMovement({
      ...movement,
      [event.target.name]: event.target.value
    });
  };

  // REGISTRAR MOVIMIENTO
  const handleSubmit = (event) => {
    event.preventDefault();

    if (
      movement.product &&
      movement.quantity &&
      movement.price &&
      movement.date &&
      movement.responsible
    ) {

      setMovements([...movements, movement]);

      setMovement({
        product: '',
        type: 'Entrada',
        quantity: '',
        price: '',
        currency: 'Soles',
        date: '',
        responsible: ''
      });

    } else {
      alert('Complete todos los campos');
    }
  };

  // FILTRAR MOVIMIENTOS
  const filteredMovements = movements.filter((item) => {

    const itemYear = item.date.slice(0, 4);
    const itemMonth = item.date.slice(5, 7);
    const itemDay = item.date.slice(8, 10);

    // FILTRO TIPO
    const matchesType =
      filterType === 'Todos' ||
      item.type === filterType;

    // FILTRO MONEDA
    const matchesCurrency =
      filterCurrency === 'Todas' ||
      item.currency === filterCurrency;

    // FILTRO AÑO
    const matchesYear =
      !filterYear ||
      itemYear === filterYear;

    // FILTRO MES
    const matchesMonth =
      !filterMonth ||
      itemMonth === filterMonth;

    // FILTRO DÍA
    const matchesDay =
      !filterDay ||
      itemDay === filterDay;

    return (
      matchesType &&
      matchesCurrency &&
      matchesYear &&
      matchesMonth &&
      matchesDay
    );
  });

  // ORDENAR POR FECHA
  const sortedMovements = [...filteredMovements].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <div style={{ marginBottom: '32px' }}>

          <h1 className="titulo-pagina">
            Movimientos de Inventario
          </h1>

          <p className="subtitulo-pagina">
            Kardex y registro detallado de entradas y salidas de mercadería.
          </p>

        </div>

        <div className="admin-grid">

          {/* FORMULARIO */}
          <section className="tarjeta">

            <h2
              className="titulo-seccion"
              style={{ marginBottom: '20px' }}
            >
              Registrar Movimiento
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >

              {/* PRODUCTO */}
              <div>

                <label
                  htmlFor="product"
                  className="label-formulario"
                >
                  Producto:
                </label>

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

              {/* TIPO */}
              <div>

                <label
                  htmlFor="type"
                  className="label-formulario"
                >
                  Tipo de Movimiento:
                </label>

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

              {/* CANTIDAD */}
              <div>

                <label
                  htmlFor="quantity"
                  className="label-formulario"
                >
                  Cantidad / Unidades:
                </label>

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

              {/* PRECIO */}
              <div>

                <label
                  htmlFor="price"
                  className="label-formulario"
                >
                  Precio:
                </label>

                <input
                  type="number"
                  id="price"
                  name="price"
                  className="input-formulario"
                  placeholder="Ej. 150"
                  value={movement.price}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* MONEDA */}
              <div>

                <label
                  htmlFor="currency"
                  className="label-formulario"
                >
                  Moneda:
                </label>

                <select
                  id="currency"
                  name="currency"
                  className="select-formulario"
                  value={movement.currency}
                  onChange={handleChange}
                >
                  <option value="Soles">Soles</option>
                  <option value="Dólares">Dólares</option>
                  <option value="Euros">Euros</option>
                </select>

              </div>

              {/* FECHA */}
              <div>

                <label
                  htmlFor="date"
                  className="label-formulario"
                >
                  Fecha del Movimiento:
                </label>

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

              {/* RESPONSABLE */}
              <div>

                <label
                  htmlFor="responsible"
                  className="label-formulario"
                >
                  Responsable:
                </label>

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

              {/* BOTÓN */}
              <button
                type="submit"
                className="btn-primario"
                style={{ marginTop: '8px' }}
              >
                Registrar Movimiento
              </button>

            </form>

          </section>

          {/* TABLA */}
          <section
            className="tabla-card"
            style={{
              width: '100%',
              margin: '0'
            }}
          >

            <h2
              className="titulo-seccion"
              style={{
                marginBottom: '20px',
                textAlign: 'left'
              }}
            >
              Historial de Movimientos
            </h2>

            {/* FILTROS */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                flexWrap: 'wrap',
                marginBottom: '20px'
              }}
            >

              {/* FILTRO TIPO */}
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="select-formulario"
                style={{
                  width: '130px',
                  padding: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="Todos">Todos</option>
                <option value="Entrada">Entradas</option>
                <option value="Salida">Salidas</option>
              </select>

              {/* FILTRO MONEDA */}
              <select
                value={filterCurrency}
                onChange={(e) => setFilterCurrency(e.target.value)}
                className="select-formulario"
                style={{
                  width: '130px',
                  padding: '8px',
                  fontSize: '14px'
                }}
              >
                <option value="Todas">Monedas</option>
                <option value="Soles">Soles</option>
                <option value="Dólares">Dólares</option>
                <option value="Euros">Euros</option>
              </select>

              {/* BOTÓN FECHA */}
              <button
                type="button"
                className="btn-primario"
                onClick={() =>
                  setShowDateFilters(!showDateFilters)
                }
                style={{
                  padding: '8px 14px',
                  fontSize: '14px'
                }}
              >
                Fecha
              </button>

            </div>

            {/* FILTROS FECHA */}
            {showDateFilters && (

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap',
                  marginBottom: '20px'
                }}
              >

                {/* AÑO */}
                <select
                  value={filterYear}
                  onChange={(e) => setFilterYear(e.target.value)}
                  className="select-formulario"
                  style={{
                    width: '110px',
                    padding: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Año</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                  <option value="2026">2026</option>
                </select>

                {/* MES */}
                <select
                  value={filterMonth}
                  onChange={(e) => setFilterMonth(e.target.value)}
                  className="select-formulario"
                  style={{
                    width: '130px',
                    padding: '8px',
                    fontSize: '14px'
                  }}
                >
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

                {/* DÍA */}
                <select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                  className="select-formulario"
                  style={{
                    width: '90px',
                    padding: '8px',
                    fontSize: '14px'
                  }}
                >
                  <option value="">Día</option>

                  {[...Array(31)].map((_, index) => {

                    const day = String(index + 1).padStart(2, '0');

                    return (
                      <option key={day} value={day}>
                        {day}
                      </option>
                    );
                  })}

                </select>

              </div>

            )}

            {/* TABLA */}
            <table className="tabla-solicitudes">

              <thead>

                <tr>

                  <th style={{ textAlign: 'left' }}>
                    Producto
                  </th>

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

                    <tr key={index}>

                      <td
                        style={{
                          textAlign: 'left',
                          fontWeight: '500'
                        }}
                      >
                        {item.product}
                      </td>

                      <td>

                        <span
                          className={`badge ${
                            item.type === 'Entrada'
                              ? 'pendiente'
                              : 'alta'
                          }`}
                          style={{
                            padding: '6px 12px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: 'bold'
                          }}
                        >
                          {item.type}
                        </span>

                      </td>

                      <td style={{ fontWeight: 'bold' }}>
                        {item.quantity} unds
                      </td>

                      <td>
                        {item.price}
                      </td>

                      <td>
                        {item.currency}
                      </td>

                      <td>
                        {item.date}
                      </td>

                      <td>
                        {item.responsible}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="7"
                      style={{
                        color: 'var(--text-muted)',
                        padding: '24px'
                      }}
                    >
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