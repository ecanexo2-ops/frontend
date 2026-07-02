import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Ventas() {
  const [solicitudes, setSolicitudes] = useState([])
  const [ventas, setVentas] = useState([])
  const [tarifas, setTarifas] = useState({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [solicitudId, setSolicitudId] = useState('')
  const [mat, setMat] = useState('carton')
  const [kg, setKg] = useState(50)
  const [precioKg, setPrecioKg] = useState(350)
  const [msg, setMsg] = useState(false)
  const [error, setError] = useState('')

  const cargar = () => {
    setLoading(true)
    Promise.all([api.getSolicitudes(), api.getVentas(), api.getTarifas()])
      .then(([ss, vs, ts]) => {
        setSolicitudes(ss)
        setVentas(vs)
        setTarifas(ts)
        if (ss[0]) setSolicitudId(String(ss[0].id))
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }

  useEffect(cargar, [])

  useEffect(() => {
    if (tarifas[mat]) setPrecioKg(tarifas[mat].precioKg)
  }, [mat, tarifas])

  const total = (Number(kg) * Number(precioKg)).toLocaleString('es-CO')
  const solicitud = solicitudes.find(s => String(s.id) === solicitudId)

  const confirmar = async () => {
    setError('')
    setSaving(true)
    try {
      await api.crearVenta({
        cliente: solicitud?.cliente || '—',
        material: tarifas[mat]?.nombre?.replace(/^\S+\s/, '') || mat,
        kg: Number(kg),
        precioKg: Number(precioKg),
        solicitudId: solicitudId ? Number(solicitudId) : undefined,
      })
      setMsg(true)
      cargar()
      setTimeout(() => setMsg(false), 3000)
    } catch (e) {
      setError(e.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <>
      <div className="section-title">Confirmación de ventas</div>
      <div className="section-sub">RF05 — Confirmar venta y actualizar inventario</div>
      {msg && <div className="success-msg">✅ Venta confirmada. Factura generada.</div>}
      {error && <div className="login-error">{error}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Nueva venta</div>
          <div className="form-group">
            <label>Solicitud</label>
            <select value={solicitudId} onChange={e => setSolicitudId(e.target.value)}>
              {solicitudes.map(s => <option key={s.id} value={s.id}>#{String(s.id).padStart(4, '0')} — {s.cliente}</option>)}
            </select>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Producto</label>
              <select value={mat} onChange={e => setMat(e.target.value)}>
                {Object.entries(tarifas).map(([key, t]) => (
                  <option key={key} value={key}>{t.nombre.replace(/^\S+\s/, '')}</option>
                ))}
              </select>
            </div>
            <div className="form-group"><label>Cantidad (kg)</label><input type="number" value={kg} onChange={e => setKg(e.target.value)} /></div>
          </div>
          <div className="form-group"><label>Precio acordado ($/kg)</label><input type="number" value={precioKg} onChange={e => setPrecioKg(e.target.value)} /></div>
          <div className="pago-total">
            <div className="pago-total-label">Total factura</div>
            <div className="pago-total-value">${total}</div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={confirmar} disabled={saving}>
              {saving ? 'Procesando...' : 'Confirmar y generar factura'}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Transacciones</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Factura</th><th>Cliente</th><th>Material</th><th>Total</th></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={4}>Cargando...</td></tr>}
              {!loading && ventas.slice().reverse().map(v => (
                <tr key={v.id}>
                  <td>{v.factura}</td>
                  <td>{v.cliente}</td>
                  <td>{v.material} {v.kg}kg</td>
                  <td>${v.total.toLocaleString('es-CO')}</td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}
