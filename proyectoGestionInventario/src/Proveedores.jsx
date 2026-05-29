import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const productOptions = [
  'Polos',
  'Casacas',
  'Pantalones',
  'Zapatillas',
  'Gorras',
  'Accesorios',
  'Mochilas',
  'Otros'
];

const Proveedores = () => {

  // FORMULARIO
  const [provider, setProvider] = useState({
    providerType: '',
    name: '',
    documentType: '',
    documentNumber: '',
    ruc: '',
    contact: '',
    products: [],
    otherProduct: ''
  });

  // DATOS INICIALES
  const [providers, setProviders] = useState([

    {
      providerType: 'Empresa',
      name: 'Textiles Perú SAC',
      documentType: '',
      documentNumber: '',
      ruc: '20605478963',
      contact: '+51 987 654 321',
      products: ['Polos', 'Casacas'],
      otherProduct: ''
    },

    {
      providerType: 'Persona',
      name: 'Juan Pérez',
      documentType: 'DNI',
      documentNumber: '74859632',
      ruc: '',
      contact: 'juanperez@gmail.com',
      products: ['Gorras', 'Accesorios'],
      otherProduct: ''
    },

    {
      providerType: 'Empresa',
      name: 'Moda Urbana SAC',
      documentType: '',
      documentNumber: '',
      ruc: '20547896321',
      contact: '+51 955 111 222',
      products: ['Pantalones', 'Zapatillas'],
      otherProduct: ''
    }

  ]);

  // FILTROS
  const [filterProduct, setFilterProduct] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');

  // INPUTS
  function handleChange(event) {

    setProvider({
      ...provider,
      [event.target.name]: event.target.value
    });

  }

  // CHECKBOX PRODUCTOS
  function handleProductChange(product) {

    if (provider.products.includes(product)) {

      setProvider({
        ...provider,
        products: provider.products.filter(function (p) {
          return p !== product;
        })
      });

    } else {

      setProvider({
        ...provider,
        products: [...provider.products, product]
      });

    }

  }

  // REGISTRAR
  function handleSubmit(event) {

    event.preventDefault();

    if (
      provider.providerType &&
      provider.name &&
      provider.contact &&
      provider.products.length > 0
    ) {

      setProviders([...providers, provider]);

      setProvider({
        providerType: '',
        name: '',
        documentType: '',
        documentNumber: '',
        ruc: '',
        contact: '',
        products: [],
        otherProduct: ''
      });

    } else {

      alert('Complete todos los campos');

    }

  }

  // ELIMINAR
  function handleDelete(index) {

    const updatedProviders = providers.filter(function (_, i) {
      return i !== index;
    });

    setProviders(updatedProviders);

  }

  // FILTRADO
  let filteredProviders = providers;

  // PRODUCTO
  if (filterProduct !== 'Todos') {

    filteredProviders = filteredProviders.filter(function (provider) {
      return provider.products.includes(filterProduct);
    });

  }

  // TIPO
  if (filterType !== 'Todos') {

    filteredProviders = filteredProviders.filter(function (provider) {
      return provider.providerType === filterType;
    });

  }

  return (

    <div className="app-shell">

      <Sidebar />

      <main className="main-content">

        <div style={{ marginBottom: '32px' }}>

          <h1 className="titulo-pagina">
            Gestión de Proveedores
          </h1>

          <p className="subtitulo-pagina">
            Administra los proveedores de la tienda.
          </p>

        </div>

        <div className="admin-grid">

          {/* FORMULARIO */}
          <section className="tarjeta">

            <h2
              className="titulo-seccion"
              style={{ marginBottom: '20px' }}
            >
              Registrar Proveedor
            </h2>

            <form
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >

              {/* TIPO */}
              <div>

                <label className="label-formulario">
                  Tipo de proveedor:
                </label>

                <select
                  name="providerType"
                  className="input-formulario"
                  value={provider.providerType}
                  onChange={handleChange}
                  required
                >

                  <option value="">
                    Seleccione
                  </option>

                  <option value="Persona">
                    Persona
                  </option>

                  <option value="Empresa">
                    Empresa
                  </option>

                </select>

              </div>

              {/* PERSONA */}
              {provider.providerType === 'Persona' && (

                <>

                  <div>

                    <label className="label-formulario">
                      Nombre:
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="input-formulario"
                      placeholder="Ej. Juan Pérez"
                      value={provider.name}
                      onChange={handleChange}
                    />

                  </div>

                  <div>

                    <label className="label-formulario">
                      Tipo de documento:
                    </label>

                    <select
                      name="documentType"
                      className="input-formulario"
                      value={provider.documentType}
                      onChange={handleChange}
                    >

                      <option value="">
                        Seleccione
                      </option>

                      <option value="DNI">
                        DNI
                      </option>

                      <option value="Carnet">
                        Carnet de Extranjería
                      </option>

                    </select>

                  </div>

                  <div>

                    <label className="label-formulario">
                      Número de documento:
                    </label>

                    <input
                      type="text"
                      name="documentNumber"
                      className="input-formulario"
                      placeholder="Ej. 74859632"
                      value={provider.documentNumber}
                      onChange={handleChange}
                    />

                  </div>

                </>

              )}

              {/* EMPRESA */}
              {provider.providerType === 'Empresa' && (

                <>

                  <div>

                    <label className="label-formulario">
                      Nombre de empresa:
                    </label>

                    <input
                      type="text"
                      name="name"
                      className="input-formulario"
                      placeholder="Ej. Textiles Perú SAC"
                      value={provider.name}
                      onChange={handleChange}
                    />

                  </div>

                  <div>

                    <label className="label-formulario">
                      Número de RUC:
                    </label>

                    <input
                      type="text"
                      name="ruc"
                      className="input-formulario"
                      placeholder="Ej. 20605478963"
                      value={provider.ruc}
                      onChange={handleChange}
                    />

                  </div>

                </>

              )}

              {/* CONTACTO */}
              <div>

                <label className="label-formulario">
                  Contacto:
                </label>

                <input
                  type="text"
                  name="contact"
                  className="input-formulario"
                  placeholder="Ej. +51 999 888 777"
                  value={provider.contact}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PRODUCTOS */}
              <div>

                <label className="label-formulario">
                  Productos suministrados:
                </label>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(2, 1fr)',
                    gap: '10px',
                    marginTop: '10px'
                  }}
                >

                  {productOptions.map(function (product) {

                    return (

                      <label
                        key={product}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >

                        <input
                          type="checkbox"
                          checked={provider.products.includes(product)}
                          onChange={function () {
                            handleProductChange(product);
                          }}
                        />

                        {product}

                      </label>

                    );

                  })}

                </div>

                {/* OTROS */}
                {provider.products.includes('Otros') && (

                  <input
                    type="text"
                    name="otherProduct"
                    className="input-formulario"
                    placeholder="Detalle el producto"
                    value={provider.otherProduct}
                    onChange={handleChange}
                    style={{ marginTop: '12px' }}
                  />

                )}

              </div>

              <button
                type="submit"
                className="btn-primario"
              >
                Registrar Proveedor
              </button>

            </form>

          </section>

          {/* TABLA */}
          <section
            className="tabla-card"
            style={{
              width: '100%',
              margin: '0',
              padding: '20px'
            }}
          >

            {/* FILTROS */}
            <div
              style={{
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}
            >

              <h2 className="titulo-seccion">
                Lista de Proveedores
              </h2>

              {/* PRODUCTOS */}
              <select
                value={filterProduct}
                onChange={function (e) {
                  setFilterProduct(e.target.value);
                }}
                className="input-formulario"
                style={{
                  width: '190px'
                }}
              >

                <option value="Todos">
                  Todos los productos
                </option>

                {productOptions.map(function (product) {

                  return (
                    <option
                      key={product}
                      value={product}
                    >
                      {product}
                    </option>
                  );

                })}

              </select>

              {/* TIPO */}
              <select
                value={filterType}
                onChange={function (e) {
                  setFilterType(e.target.value);
                }}
                className="input-formulario"
                style={{
                  width: '140px'
                }}
              >

                <option value="Todos">
                  Todos
                </option>

                <option value="Persona">
                  Persona
                </option>

                <option value="Empresa">
                  Empresa
                </option>

              </select>

            </div>

            {/* TABLA */}
            <table
              className="tabla-solicitudes"
              style={{
                width: '100%'
              }}
            >

              <thead>

                <tr>

                  <th>
                    Proveedor
                  </th>

                  <th>
                    Tipo
                  </th>

                  <th>
                    Documento
                  </th>

                  <th>
                    Contacto
                  </th>

                  <th>
                    Productos
                  </th>

                  <th>
                    Acción
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredProviders.length > 0 ? (

                  filteredProviders.map(function (item, index) {

                    return (

                      <tr key={index}>

                        <td style={{ fontWeight: '500' }}>
                          {item.name}
                        </td>

                        <td>
                          {item.providerType}
                        </td>

                        <td>

                          {item.providerType === 'Persona'
                            ? item.documentType + ': ' + item.documentNumber
                            : 'RUC: ' + item.ruc}

                        </td>

                        <td>
                          {item.contact}
                        </td>

                        <td>

                          {item.products.map(function (p, i) {

                            return (

                              <span key={i}>

                                {p === 'Otros'
                                  ? 'Otros: ' + item.otherProduct
                                  : p}

                                {i < item.products.length - 1 && ', '}

                              </span>

                            );

                          })}

                        </td>

                        {/* ELIMINAR */}
                        <td>

                          <button
                            onClick={function () {
                              handleDelete(index);
                            }}
                            style={{
                              backgroundColor: '#dc3545',
                              color: 'white',
                              border: 'none',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              fontSize: '12px'
                            }}
                          >
                            Eliminar
                          </button>

                        </td>

                      </tr>

                    );

                  })

                ) : (

                  <tr>

                    <td
                      colSpan="6"
                      style={{
                        padding: '24px'
                      }}
                    >
                      No hay proveedores registrados.
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

export default Proveedores;