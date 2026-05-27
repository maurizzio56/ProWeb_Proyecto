// Importa React para crear componentes
import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';

const Panel = ({ products = [] }) => {
  const [inventoryValue, setInventoryValue] = useState(0); // Estado para el valor del inventario
  const [lowStockProductsCount, setLowStockProductsCount] = useState(0); // Estado para contar los productos con bajo stock
  const [outOfStockProductsCount, setOutOfStockProductsCount] = useState(0); // Estado para contar los productos agotados

  // Función para calcular el valor del inventario y los productos con bajo stock
  const calculateInventoryValueAndLowStock = () => {
    let value = 0;
    let lowStockCount = 0;
    let outOfStockCount = 0;

    products.forEach(product => {
      value += product.quantity * (product.price || 0);
      if (product.quantity < 10) lowStockCount++;
      if (product.quantity === 0) outOfStockCount++;
    });

    setInventoryValue(value.toFixed(2));
    setLowStockProductsCount(lowStockCount);
    setOutOfStockProductsCount(outOfStockCount);
  };

  // Filtra productos con bajo stock
  const lowStockProducts = products.filter(product => product.quantity < 10);

  useEffect(() => {
    calculateInventoryValueAndLowStock();
  }, [products]);

  return (
    <div className="app-shell">
      {/* Barra lateral */}
      <Sidebar />
      <main className="main-content">
        <h2>Panel</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {/* Valor del inventario */}
          <div style={{ width: '50%', padding: '1rem', border: '1px solid #000000', textAlign: 'center' }}>
            Valor de Inventario
            <p>${inventoryValue}</p>
          </div>

          {/* Productos con bajo stock */}
          <div style={{ width: '25%', padding: '1rem', border: '1px solid #000000', textAlign: 'center' }}>
            Stock Bajo
            <p>{lowStockProductsCount} productos</p>
          </div>

          {/* Productos agotados */}
          <div style={{ width: '25%', padding: '1rem', border: '1px solid #000000', textAlign: 'center' }}>
            Productos Agotados
            <p>{outOfStockProductsCount} productos</p>
          </div>

          {/* Lista de productos con bajo stock */}
          <div style={{ width: '100%', padding: '1rem', border: '1px solid #000000', backgroundColor: '#f9f9f9' }}>
            Productos con Bajo Stock
            <ul>
              {lowStockProducts.map((product, index) => (
                <li key={index}>{product.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Panel;