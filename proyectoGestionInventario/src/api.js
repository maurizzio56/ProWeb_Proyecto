const API_URL = 'http://localhost:5000/api';

export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return res.json();
};

export const createProducto = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return res.json();
};

export const updateProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return res.json();
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE'
  });
  return res.json();
};