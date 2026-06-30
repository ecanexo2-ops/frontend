import { useState } from 'react'
const TARIFAS = { carton: 350, metales: 1200, vidrio: 150, cobre: 18000, plastico: 400 }
export default function PagoReciclador() {
  const [mat, setMat]     = useState('carton')
  const [kg, setKg]       = useState(80)
  const [bonus, setBonus] = useState(0)
  const [msg, setMsg]     = useState(false)
  const base  = TARIFAS[mat] * kg
  const total = Math.round(base * (1 + bonus / 100)).toLocaleString('es-CO')
  return (
    <>
      <div className="section-title">Pago al reciclador</div>
      <div className="section-sub">RF08 — Gestión y procesamiento de pagos a recicladores</div>
      {msg && <div className="success-msg">✅ Pago procesado. Recibo generado.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Procesar pago</div>
          <div className="form-group"><label>Reciclador</label><select><option>Pedro Gómez</option><option>Luz Marina Díaz</option></select></div>
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
          <div className="form-group"><label>Bonificación por calidad (%)</label><input type="number" value={bonus} min={0} max={20} onChange={e => setBonus(Number(e.target.value))} /></div>
          <div className="form-group"><label>Modalidad</label><select><option>Efectivo</option><option>Transferencia bancaria</option></select></div>
          <div className="pago-total">
            <div>
              <div className="pago-total-label">Monto a pagar</div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{kg} kg × ${TARIFAS[mat].toLocaleString('es-CO')} + {bonus}% bonif.</div>
            </div>
            <div className="pago-total-value">${total}</div>
          </div>
          <div className="form-actions">
            <button className="btn-secondary">Cancelar</button>
            <button className="btn-primary" onClick={() => { setMsg(true); setTimeout(() => setMsg(false), 3000) }}>Procesar pago</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Reporte de pagos</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Reciclador</th><th>Material</th><th>Kg</th><th>Monto</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>Pedro G.</td><td>Cartón</td><td>120</td><td>$42,000</td><td><span className="badge badge-green">Pagado</span></td></tr>
              <tr><td>Luz M.</td><td>Plástico</td><td>80</td><td>$32,000</td><td><span className="badge badge-green">Pagado</span></td></tr>
              <tr><td>Pedro G.</td><td>Cobre</td><td>15</td><td>$270,000</td><td><span className="badge badge-yellow">Pendiente</span></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}