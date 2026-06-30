import { useState } from 'react'
const TARIFAS = { carton: 350, metales: 1200, vidrio: 150, cobre: 18000, plastico: 400 }
export default function Pagos() {
  const [mat, setMat] = useState('carton')
  const [kg, setKg]   = useState(50)
  const [msg, setMsg] = useState(false)
  const total = (TARIFAS[mat] * kg).toLocaleString('es-CO')
  const confirmar = () => { setMsg(true); setTimeout(() => setMsg(false), 3000) }
  return (
    <>
      <div className="section-title">Módulo de pago</div>
      <div className="section-sub">RF04 — Registro de pagos en efectivo</div>
      {msg && <div className="success-msg">✅ Pago registrado. Comprobante generado.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Registrar pago</div>
          <div className="form-group"><label>Cliente</label><select><option>Juan Pérez</option><option>Eco Reciclados SAS</option></select></div>
          <div className="form-row">
            <div className="form-group"><label>Material</label>
              <select value={mat} onChange={e => setMat(e.target.value)}>
                <option value="carton">Cartón — $350/kg</option>
                <option value="metales">Metales — $1,200/kg</option>
                <option value="vidrio">Vidrio — $150/kg</option>
                <option value="cobre">Cobre — $18,000/kg</option>
                <option value="plastico">Plástico — $400/kg</option>
              </select>
            </div>
            <div className="form-group"><label>Peso (kg)</label><input type="number" value={kg} onChange={e => setKg(Number(e.target.value))} /></div>
          </div>
          <div className="form-group"><label>Método de pago</label><select><option>💵 Efectivo</option></select></div>
          <div className="pago-total">
            <div><div className="pago-total-label">Total a pagar</div></div>
            <div className="pago-total-value">${total}</div>
          </div>
          <div className="form-actions">
            <button className="btn-secondary">Cancelar</button>
            <button className="btn-primary" onClick={confirmar}>Confirmar pago</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Historial de pagos</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Recibo</th><th>Cliente</th><th>Monto</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>#R001</td><td>Juan P.</td><td>$17,500</td><td><span className="badge badge-green">Pagado</span></td></tr>
              <tr><td>#R002</td><td>Eco SAS</td><td>$1,620,000</td><td><span className="badge badge-green">Pagado</span></td></tr>
              <tr><td>#R003</td><td>María L.</td><td>$12,000</td><td><span className="badge badge-yellow">Pendiente</span></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}