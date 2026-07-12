import React, { useState, useEffect } from 'react';
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

  // DATOS
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  // FILTROS
  const [filterProduct, setFilterProduct] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');

  const [confirmDelete, setConfirmDelete] = useState(null);

  // CARGAR PROVEEDORES DESDE EL BACKEND
  useEffect(() => {
    fetch('http://localhost:5000/api/proveedores')
      .then(res => res.json())
      .then(data => {
        setProviders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar proveedores:', err);
        setLoading(false);
      });
  }, []);

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

  // REGISTRAR (con backend)
  function handleSubmit(event) {
    event.preventDefault();

    if (
      provider.providerType &&
      provider.name &&
      provider.contact &&
      provider.products.length > 0
    ) {
      const newProvider = {
        nombre: provider.name,
        tipo: provider.providerType,
        documento: provider.providerType === 'Persona' ? provider.documentNumber : provider.ruc,
        contacto: provider.contact,
        productos: provider.products,
        otros_productos: provider.otherProduct || null,
      };

      fetch('http://localhost:5000/api/proveedores', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProvider)
      })
        .then(res => res.json())
        .then(data => {
          setProviders([...providers, data]);
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
        })
        .catch(err => {
          console.error('Error al crear proveedor:', err);
          alert('Error al crear proveedor');
        });

    } else {
      alert('Complete todos los campos');
    }
  }

  // ELIMINAR (con backend)
  function handleDelete(index) {
    setConfirmDelete(index);
  }

  function confirmDeleteAction() {
    const providerToDelete = providers[confirmDelete];

    fetch(`http://localhost:5000/api/proveedores/${providerToDelete.id}`, {
      method: 'DELETE'
    })
      .then(() => {
        const updatedProviders = providers.filter(function (_, i) {
          return i !== confirmDelete;
        });
        setProviders(updatedProviders);
        setConfirmDelete(null);
      })
      .catch(err => {
        console.error('Error al eliminar proveedor:', err);
        alert('Error al eliminar proveedor');
        setConfirmDelete(null);
      });
  }

  function cancelDelete() {
    setConfirmDelete(null);
  }

  // FILTRADO
  let filteredProviders = providers;

  if (filterProduct !== 'Todos') {
    filteredProviders = filteredProviders.filter(function (provider) {
      return provider.productos?.includes(filterProduct);
    });
  }

  if (filterType !== 'Todos') {
    filteredProviders = filteredProviders.filter(function (provider) {
      return provider.tipo === filterType;
    });
  }

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <h2>Cargando proveedores...</h2>
        </main>
      </div>
    );
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

                      <tr key={item.id || index}>

                        <td style={{ fontWeight: '500' }}>
                          {item.nombre}
                        </td>

                        <td>
                          {item.tipo}
                        </td>

                        <td>

                          {item.documento || '-'}

                        </td>

                        <td>
                          {item.contacto}
                        </td>

                        <td>

                          {item.productos?.map(function (p, i) {

                            return (

                              <span key={i}>

                                {p === 'Otros'
                                  ? 'Otros: ' + item.otros_productos
                                  : p}

                                {i < item.productos.length - 1 && ', '}

                              </span>

                            );

                          })}

                        </td>

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

      {/* MODAL DE CONFIRMACIÓN */}
      {confirmDelete !== null && (

        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
          }}
        >

          <div
            style={{
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '400px',
              width: '90%',
              boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
              textAlign: 'center'
            }}
          >

            <div
              style={{
                fontSize: '48px',
                marginBottom: '16px'
              }}
            >
              ⚠️
            </div>

            <h3
              style={{
                margin: '0 0 12px 0',
                fontSize: '18px',
                fontWeight: '600',
                color: '#1a1a1a'
              }}
            >
              ¿Estás seguro?
            </h3>

            <p
              style={{
                margin: '0 0 28px 0',
                color: '#555',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              Estás a punto de eliminar al proveedor{' '}
              <strong>{providers[confirmDelete]?.nombre}</strong>.
              Esta acción no se puede deshacer.
            </p>

            <div
              style={{
                display: 'flex',
                gap: '12px',
                justifyContent: 'center'
              }}
            >

              <button
                onClick={cancelDelete}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  backgroundColor: 'white',
                  color: '#333',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Cancelar
              </button>

              <button
                onClick={confirmDeleteAction}
                style={{
                  padding: '10px 24px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '500'
                }}
              >
                Sí, eliminar
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

};

export default Proveedores;