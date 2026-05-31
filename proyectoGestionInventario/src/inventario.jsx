import React, { useState } from 'react';
import Sidebar from './BarraLateral';
import './inventario.css';

const Inventario = () => {
  const [product, setProduct] = useState({
    name: '',
    marca: '',
    type: '',
    sizes: ''
  }); 
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null); 
  const [showPopup, setPopup] = useState(false);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };
    
  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.name && product.marca && product.type) {
      const sizesArray = getSize(product.type);
      const newProduct = {
        ...product,           
        sizes: sizesArray     
      };
      setProducts([...products, newProduct]);
      setProduct({
        name: '',
        marca: '',
        type: '',
        sizes: ''  
      });
      setPopup(false);
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const displayProduct = (item) => {
    const index = products.findIndex(p => p === item);
    return (
      <div className="product-detail">
        <h3>{item.name}</h3>
        <p>Marca: {item.marca}</p>
        <p>Tipo: {item.type}</p>
        
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Talla</th>
              <th>Stock</th>
            </tr>
          </thead>
          <tbody>
            {item.sizes.map((sizeTuple, index) => (
              <tr key={index}>
                <td>{sizeTuple[0]}</td>
                <td>{sizeTuple[1]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
        <button className='btn-secundario' onClick={() => deleteProduct(index)} >Eliminar Producto</button>
      </div>
    );
  };

  const getSize = (type) => {
    switch(type) {
      case 'Pantalon':
      case 'Shorts':
        return [
          ['28', 0], 
          ['30', 0],
          ['32', 0], 
          ['34', 0],
          ['36', 0], 
          ['38', 0], 
          ['40', 0], 
          ['42', 0]
        ];
      case 'Medias':
        return [
          ['34-35', 0], 
          ['35-36', 0], 
          ['37-38', 0], 
          ['39-40', 0], 
          ['41-42', 0]
        ];
      case 'Casaca':
      case 'Polera':
      case 'Polo':
        return [
          ['S', 0], 
          ['M', 0], 
          ['L', 0], 
          ['XL', 0]
        ];
      default:
        return [];
    }
  };

  const renderProductList = () => {
    return products.map((item, index) => (
      <div key={index} className="product-item">
        <button onClick={() => setSelectedProduct(item)} className="btn-producto">
          {item.name} - {item.type} - {item.marca}
        </button>
      </div>
    ));
  };

  const deleteProduct = (del) => {
    const updatedProducts = products.filter((_, index) => index !== del);
    setProducts(updatedProducts);
    setSelectedProduct(null);
  };

  const cancelReg = () => {
    setProduct({
      name: '',
      marca: '',
      type: '',
      sizes: ''  
    });
    setPopup(false);
  }

  return (
    <div className="app-shell inventario-container">
      <Sidebar />
      <main className="main-content">
        <h2>Inventario</h2>
        <p>Bienvenido al sistema de gestión de inventario</p>

        {/* TWO COLUMN LAYOUT */}
        <div className="two-columns">
          
          {/* LEFT COLUMN - Product List */}
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

          {/* RIGHT COLUMN - Product Details & Other Content */}
          <div className="right-column">
            {selectedProduct ? (
              <div className="product-detail-section">
                <h3>Detalles del Producto</h3>
                {displayProduct(selectedProduct)}
              </div>
            ) : (
              <div className="empty-state">
                <p>Selecciona un producto para ver sus detalles</p>
              </div>
            )}
          </div>

        </div>

        {/* POPUP - stays the same */}
        {showPopup && (
          <div className="popup-overlay">
            <div className="popup-content">
              <h2>Registro de Productos</h2>
              <form onSubmit={handleSubmit}>
                <label>
                  Nombre del Producto:
                  <input type="text" name="name" value={product.name} onChange={handleChange} />
                </label>
                <br />
          
                <label>
                  Marca:
                  <input type="text" name="marca" value={product.marca} onChange={handleChange} />
                </label>
                <br />

                <label>Tipo de Prenda: </label>
                <select name="type" value={product.type} onChange={handleChange}>
                  <option value="" disabled></option>
                  <option value="Casaca">Casaca</option>
                  <option value="Medias">Medias</option>
                  <option value="Pantalon">Pantalon</option>
                  <option value="Polera">Polera</option>
                  <option value="Polo">Polo</option>
                  <option value="Shorts">Shorts</option>
                </select>
                <br />
                <div className="popup-buttons">
                  <button type="submit" className="btn-primario">Crear</button>
                  <button onClick={() => cancelReg()} className='btn-secundario'>Cancelar</button>
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