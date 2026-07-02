const BASE_URL = 'http://localhost:4000/api'

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const json = await res.json()
  if (!res.ok || json.success === false) {
    throw new Error(json.message || 'Error de red')
  }
  return json.data
}

export const api = {
  login: (username, password) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  getClientes: (q) => request(`/clientes${q ? `?q=${encodeURIComponent(q)}` : ''}`),
  crearCliente: (cliente) => request('/clientes', { method: 'POST', body: JSON.stringify(cliente) }),
  actualizarCliente: (id, cambios) => request(`/clientes/${id}`, { method: 'PUT', body: JSON.stringify(cambios) }),

  getRecicladores: () => request('/recicladores'),
  crearReciclador: (r) => request('/recicladores', { method: 'POST', body: JSON.stringify(r) }),

  getSolicitudes: () => request('/solicitudes'),
  crearSolicitud: (s) => request('/solicitudes', { method: 'POST', body: JSON.stringify(s) }),

  getPagos: () => request('/pagos'),
  crearPago: (p) => request('/pagos', { method: 'POST', body: JSON.stringify(p) }),

  getVentas: () => request('/ventas'),
  crearVenta: (v) => request('/ventas', { method: 'POST', body: JSON.stringify(v) }),

  getProductos: () => request('/productos'),
  registrarEntradaProducto: (e) => request('/productos/entrada', { method: 'POST', body: JSON.stringify(e) }),

  getPagosReciclador: () => request('/pagos-reciclador'),
  crearPagoReciclador: (p) => request('/pagos-reciclador', { method: 'POST', body: JSON.stringify(p) }),

  getTarifas: () => request('/tarifas'),
  getDashboard: () => request('/dashboard'),
}
