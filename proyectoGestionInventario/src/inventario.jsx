import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';
import './inventario.css';

const Inventario = () => {
  const [product, setProduct] = useState({
    name: '',
    marca: '',
    type: ''
  });
  const [tempSizes, setTempSizes] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  // Cargar productos desde el backend
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/productos');
      const data = await res.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error al cargar productos:', error);
      setLoading(false);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({ ...product, [name]: value });

    if (name === 'type') {
      setTempSizes(getSize(value));
    }
  };

  const handleStockChange = (index, value) => {
    const updatedTempSizes = [...tempSizes];
    updatedTempSizes[index] = [updatedTempSizes[index][0], Number(value) || 0];
    setTempSizes(updatedTempSizes);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (product.name && product.marca && product.type) {
      const newProduct = {
        ...product,
        tallas: Object.fromEntries(tempSizes)
      };

      try {
        const res = await fetch('http://localhost:5000/api/productos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProduct)
        });
        const data = await res.json();
        setProducts([...products, data]);
        setProduct({ name: '', marca: '', type: '' });
        setTempSizes([]);
        setPopup(false);
      } catch (error) {
        console.error('Error al crear producto:', error);
        alert('Error al crear producto');
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const deleteProduct = async (index) => {
    const productToDelete = products[index];
    if (!window.confirm(`¿Eliminar ${productToDelete.name}?`)) return;

    try {
      const res = await fetch(`http://localhost:5000/api/productos/${productToDelete.id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
        setSelectedProduct(null);
      }
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      alert('Error al eliminar producto');
    }
  };

  const getSize = (type) => {
    switch(type) {
      case 'Pantalon':
      case 'Shorts':
        return [['28', 0], ['30', 0], ['32', 0], ['34', 0], ['36', 0], ['38', 0], ['40', 0], ['42', 0]];
      case 'Medias':
        return [['34-35', 0], ['35-36', 0], ['37-38', 0], ['39-40', 0], ['41-42', 0]];
      case 'Casaca':
      case 'Polera':
      case 'Polo':
        return [['S', 0], ['M', 0], ['L', 0], ['XL', 0]];
      default:
        return [];
    }
  };

  const renderProductList = () => {
    return products.map((item, index) => (
      <div key={item.id || index} className="product-item">
        <button onClick={() => setSelectedProduct(item)} className="btn-producto">
          {item.name} - {item.type} - {item.marca}
        </button>
      </div>
    ));
  };

  const cancelReg = () => {
    setProduct({ name: '', marca: '', type: '' });
    setTempSizes([]);
    setPopup(false);
  };

  if (loading) {
    return (
      <div className="app-shell">
        <Sidebar />
        <main className="main-content">
          <h2>Cargando productos...</h2>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell inventario-container">
      <Sidebar />
      <main className="main-content">
        <h2>Inventario</h2>
        <p>Bienvenido al sistema de gestión de inventario</p>

        <div className="two-columns">
          <div className="left-column">
            <div className="product-list-header">
              <h3>Lista de Productos</h3>
              <button onClick={() => setPopup(true)} className="btn-primario">+ Agregar Producto</button>
            </div>
            <div className="product-list">
              {renderProductList()}
              {products.length === 0 && (
                <p className="empty-message">No hay productos. Agrega uno nuevo.</p>
              )}
            </div>
          </div>

          <div className="right-column">
            {selectedProduct ? (
              <div className="product-detail-section">
                <h3>Detalles del Producto</h3>
                <div className="product-detail">
                  <h3>{selectedProduct.name}</h3>
                  <p>Marca: {selectedProduct.marca}</p>
                  <p>Tipo: {selectedProduct.type}</p>
                  <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                      <tr>
                        <th>Talla</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedProduct.tallas && Object.entries(selectedProduct.tallas).map(([talla, cantidad]) => (
                        <tr key={talla}>
                          <td>{talla}</td>
                          <td>{cantidad}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <br />
                  <button 
                    className='btn-secundario' 
                    onClick={() => {
                      const index = products.findIndex(p => p.id === selectedProduct.id);
                      deleteProduct(index);
                    }}
                  >
                    Eliminar Producto
                  </button>
                </div>
              </div>
            ) : (
              <div className="empty-state">
                <p>Selecciona un producto para ver sus detalles</p>
              </div>
            )}
          </div>
        </div>

        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content" style={{ maxWidth: '500px', maxHeight: '85vh', overflowY: 'auto' }}>
              <h2>Registro de Productos</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre del Producto:
                  <input type="text" name="name" value={product.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                  Marca:
                  <input type="text" name="marca" value={product.marca} onChange={handleChange} required />
                </label>
                <br />
                <label>Tipo de Prenda: </label>
                <select name="type" value={product.type} onChange={handleChange} required>
                  <option value="" disabled>Seleccione tipo</option>
                  <option value="Casaca">Casaca</option>
                  <option value="Medias">Medias</option>
                  <option value="Pantalon">Pantalon</option>
                  <option value="Polera">Polera</option>
                  <option value="Polo">Polo</option>
                  <option value="Shorts">Shorts</option>
                </select>
                <br /><br />

                {tempSizes.length > 0 && (
                  <div style={{ background: '#f8f9fa', padding: '16px', borderRadius: '8px', marginBottom: '15px' }}>
                    <h4 style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#374151' }}>Ingresar Cantidades por Talla:</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                      {tempSizes.map((sizeTuple, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Talla {sizeTuple[0]}:</span>
                          <input 
                            type="number" 
                            min="0"
                            style={{ width: '70px', padding: '6px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
                            value={sizeTuple[1]} 
                            onChange={(e) => handleStockChange(idx, e.target.value)} 
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="popup-buttons">
                  <button type="submit" className="btn-primario">Crear</button>
                  <button type="button" onClick={cancelReg} className='btn-secundario'>Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Inventario;