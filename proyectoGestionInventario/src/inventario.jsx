import React, { useState } from 'react';
import Sidebar from './BarraLateral';

const Inventario = () => {
  const [product, setProduct] = useState({
    name: '',
    marca: '',
    type: '',
    sizes: ''
  }); 
  const [products, setProducts] = useState([]); 
  const [selectedProduct, setSelectedProduct] = useState(null);  

  const handleChange = (event) => {
    setProduct({ ...product, [event.target.name]: event.target.value });
  };

  // Maneja el envio del formulario para crear un nuevo producto
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
  } else {
    alert('Por favor, complete todos los campos.');
  }
};

const displayProduct = (item) => {
  const index = products.findIndex(p => p === item);
  return (
    <div>
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
      <button onClick={()=>deleteProduct(index)}>Eliminar Producto</button>
    </div>
  );
  };
  const getSize = (type) =>{
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
    <p div key={index}>
    <button onClick={()=>setSelectedProduct(item)}>
      {item.name} - {item.type} - {item.marca}
    </button>
    <br/>
    </p>
  ));
};
const deleteProduct = (del) => {
  const updatedProducts = products.filter((_, index) => index !== del);
  setProducts(updatedProducts);
  setSelectedProduct(null);
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
            Marca:
            <input type="text" name="marca" value={product.marca} onChange={handleChange} />
          </label>
          <br />

          <label>
            Tipo de Prenda: </label>
            <select name="type" value={product.type} onChange={handleChange}>
              <option value="" disabled selected></option>
              <option value="Casaca">Casaca</option>
              <option value="Medias">Medias</option>
              <option value="Pantalon">Pantalon</option>
              <option value="Polera">Polera</option>
              <option value="Polo">Polo</option>
              <option value="Shorts">Shorts</option>
            </select>
          <br />

          <button type="submit">Crear Producto</button>
          <br />
        </form>

        {renderProductList()}
        
        {selectedProduct && displayProduct(selectedProduct)}
      </main>
    </div>
  );
};

export default Inventario;