import React, { useState, useEffect } from 'react';
import Sidebar from './BarraLateral';

const Panel = ({ products = [] }) => {
  const [inventoryValue, setInventoryValue] = useState(0);
  const [lowStockProductsCount, setLowStockProductsCount] = useState(0);
  const [outOfStockProductsCount, setOutOfStockProductsCount] = useState(0);

  // Calcular el valor del inventario y los productos con bajo stock
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

  // Filtrar productos con bajo stock
  const lowStockProducts = products.filter(product => product.quantity < 10);

  useEffect(() => {
    calculateInventoryValueAndLowStock();
  }, [products]);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div style={{ marginLeft: '250px', padding: '1rem' }}>
        <h2>Panel</h2>

        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <div style={{ width: '50%', padding: '1rem', border: '1px solid #ccc', textAlign: 'center' }}>
            Valor de Inventario
            <p>${inventoryValue}</p>
          </div>

          <div style={{ width: '25%', padding: '1rem', border: '1px solid #ccc', textAlign: 'center' }}>
            Stock Bajo
            <p>{lowStockProductsCount} productos</p>
          </div>

          <div style={{ width: '25%', padding: '1rem', border: '1px solid #ccc', textAlign: 'center' }}>
            Productos Agotados
            <p>{outOfStockProductsCount} productos</p>
          </div>

          <div style={{ width: '100%', padding: '1rem', border: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
            Productos con Bajo Stock
            <ul>
              {lowStockProducts.map((product, index) => (
                <li key={index}>{product.name}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;