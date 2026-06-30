import { useState } from 'react'
export default function Ventas() {
  const [msg, setMsg] = useState(false)
  return (
    <>
      <div className="section-title">Confirmación de ventas</div>
      <div className="section-sub">RF05 — Confirmar venta y actualizar inventario</div>
      {msg && <div className="success-msg">✅ Venta confirmada. Factura generada.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Nueva venta</div>
          <div className="form-group"><label>Solicitud</label><select><option>#0021 — Juan Pérez</option><option>#0023 — Eco SAS</option></select></div>
          <div className="form-row">
            <div className="form-group"><label>Producto</label><select><option>Cartón</option><option>Metales</option><option>Vidrio</option><option>Cobre</option><option>Plástico</option></select></div>
            <div className="form-group"><label>Cantidad (kg)</label><input type="number" defaultValue={50} /></div>
          </div>
          <div className="form-group"><label>Precio acordado ($/kg)</label><input type="number" defaultValue={350} /></div>
          <div className="pago-total">
            <div className="pago-total-label">Total factura</div>
            <div className="pago-total-value">$17,500</div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={() => { setMsg(true); setTimeout(() => setMsg(false), 3000) }}>Confirmar y generar factura</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Transacciones</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Factura</th><th>Cliente</th><th>Material</th><th>Total</th></tr></thead>
            <tbody>
              <tr><td>F-001</td><td>Juan P.</td><td>Cartón 50kg</td><td>$17,500</td></tr>
              <tr><td>F-002</td><td>Eco SAS</td><td>Cobre 90kg</td><td>$1,620,000</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}