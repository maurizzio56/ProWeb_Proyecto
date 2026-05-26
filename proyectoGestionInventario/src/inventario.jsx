
import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Inventario = () => {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    material: '',
    typeOfClothing: ''
  });
  const [products, setProducts] = useState([]);

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (product.name && product.quantity && product.material && product.typeOfClothing) {
      setProducts([...products, { ...product }]);
      setProduct({
        name: '',
        quantity: '',
        material: '',
        typeOfClothing: ''
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  const renderProductList = () => {
    return products.map((item, index) => (
      <div key={index}>
        <h3>{item.name}</h3>
        <p>Cantidad: {item.quantity}</p>
        <p>Material: {item.material}</p>
        <p>Tipo de Prenda: {item.typeOfClothing}</p>
      </div>
    ));
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '1rem' }}>
        <h2>Inventario</h2>
        <p>Bienvenido al sistema de gestión de inventario</p>

        <form onSubmit={handleSubmit}>
          <label>
            Nombre del Producto:
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Cantidad:
            <input
              type="number"
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Material:
            <input
              type="text"
              name="material"
              value={product.material}
              onChange={handleChange}
            />
          </label>
          <br />

          <label>
            Tipo de Prenda:
            <input
              type="text"
              name="typeOfClothing"
              value={product.typeOfClothing}
              onChange={handleChange}
            />
          </label>
          <br />

          <button type="submit">Crear Producto</button>
        </form>

        {renderProductList()}
      </div>
    </div>
  );
};

export default Inventario;