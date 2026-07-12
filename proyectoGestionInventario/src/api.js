const API_URL = 'http://localhost:5000/api';

const handleResponse = async (res) => {
  const contentType = res.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await res.json() : await res.text();

  if (!res.ok) {
    throw new Error(typeof data === 'string' ? data : data?.error || 'Error en la solicitud');
  }

  return data;
};

// ========== PRODUCTOS ==========
export const getProductos = async () => {
  const res = await fetch(`${API_URL}/productos`);
  return handleResponse(res);
};

export const createProducto = async (producto) => {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return handleResponse(res);
};

export const updateProducto = async (id, producto) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  });
  return handleResponse(res);
};

export const deleteProducto = async (id) => {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(res);
};

// ========== PROVEEDORES ==========
export const getProveedores = async () => {
  const res = await fetch(`${API_URL}/proveedores`);
  return handleResponse(res);
};

export const createProveedor = async (proveedor) => {
  const res = await fetch(`${API_URL}/proveedores`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(proveedor)
  });
  return handleResponse(res);
};

export const deleteProveedor = async (id) => {
  const res = await fetch(`${API_URL}/proveedores/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(res);
};

// ========== USUARIOS ==========
export const loginUser = async (email, password) => {
  const res = await fetch(`${API_URL}/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  return handleResponse(res);
};

export const getUsuarios = async () => {
  const res = await fetch(`${API_URL}/usuarios`);
  return handleResponse(res);
};

export const createUsuario = async (usuario) => {
  const res = await fetch(`${API_URL}/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  return handleResponse(res);
};

export const deleteUsuario = async (id) => {
  const res = await fetch(`${API_URL}/usuarios/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(res);
};

// ========== DASHBOARD ==========
export const getDashboardResumen = async () => {
  const res = await fetch(`${API_URL}/dashboard/resumen`);
  return handleResponse(res);
};

// ========== MOVIMIENTOS ==========
export const getMovimientos = async () => {
  const res = await fetch(`${API_URL}/movimientos`);
  return handleResponse(res);
};

export const createMovimiento = async (movimiento) => {
  const res = await fetch(`${API_URL}/movimientos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movimiento)
  });
  return handleResponse(res);
};

// ========== SOLICITUDES ==========
export const getSolicitudes = async () => {
  const res = await fetch(`${API_URL}/solicitudes`);
  return handleResponse(res);
};

export const createSolicitud = async (solicitud) => {
  const res = await fetch(`${API_URL}/solicitudes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(solicitud)
  });
  return handleResponse(res);
};

export const updateSolicitud = async (id, data) => {
  const res = await fetch(`${API_URL}/solicitudes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return handleResponse(res);
};


export const getSolicitudes = async () => {
  const res = await fetch(`${API_URL}/solicitudes`);
  return res.json();
};

// Crear solicitud
export const createSolicitud = async (solicitud) => {
  const res = await fetch(`${API_URL}/solicitudes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(solicitud)
  });

  return res.json();
};


export const updateSolicitud = async (id, solicitud) => {
  const res = await fetch(`${API_URL}/solicitudes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(solicitud)
  });

  return res.json();
};


export const deleteSolicitud = async (id) => {
  const res = await fetch(`${API_URL}/solicitudes/${id}`, {
    method: "DELETE"
  });

  return res.json();
};


export const aprobarSolicitud = async (id) => {
  const res = await fetch(`${API_URL}/solicitudes/${id}/aprobar`, {
    method: "PUT"
  });

  return res.json();
};


export const completarSolicitud = async (id) => {
  const res = await fetch(`${API_URL}/solicitudes/${id}/completar`, {
    method: "PUT"
  });

  return res.json();
};