import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Inventario = () => {
  const [product, setProduct] = useState({
    name: '',
    quantity: '',
    material: '',
    typeOfClothing: ''
  }); // Estado para almacenar los datos del producto a crear
  const [products, setProducts] = useState([]); // Estado para almacenar todos los productos

  // Maneja el cambio en los campos del formulario
  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  // Maneja el envio del formulario para crear un nuevo producto
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

  // Renderiza la lista de productos
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
    <div className="app-shell">
      {/* Barra lateral */}
      <Sidebar />
      <main className="main-content">
        <h2>Inventario</h2>
        <p>Bienvenido al sistema de gestión de inventario</p>

        {/* Formulario para crear nuevos productos */}
        <form onSubmit={handleSubmit}>
          <label>
            Nombre del Producto:
            <input type="text" name="name" value={product.name} onChange={handleChange} />
          </label>
          <br />

          <label>
            Cantidad:
            <input type="number" name="quantity" value={product.quantity} onChange={handleChange} />
          </label>
          <br />

          <label>
            Material:
            <input type="text" name="material" value={product.material} onChange={handleChange} />
          </label>
          <br />

          <label>
            Tipo de Prenda:
            <input type="text" name="typeOfClothing" value={product.typeOfClothing} onChange={handleChange} />
          </label>
          <br />

          <button type="submit">Crear Producto</button>
        </form>

        {/* Lista de productos */}
        {renderProductList()}
      </main>
    </div>
  );
};

export default Inventario;