import { useState } from 'react'
const MATS = ['🟫 Cartón','⚙️ Metales','🫙 Vidrio','🔶 Cobre','🧴 Plástico']
export default function Productos() {
  const [sel, setSel] = useState(['🟫 Cartón'])
  const [msg, setMsg] = useState(false)
  const toggle = m => setSel(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  return (
    <>
      <div className="section-title">Registrar productos</div>
      <div className="section-sub">RF07 — Clasificación de materiales y registro de inventario</div>
      {msg && <div className="success-msg">✅ Material registrado. Inventario actualizado.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Entrada de material</div>
          <div className="form-group"><label>Reciclador</label><select><option>Pedro Gómez</option><option>Luz Marina Díaz</option></select></div>
          <div className="form-group">
            <label>Tipo de material</label>
            <div className="material-tags">
              {MATS.map(m => <div key={m} className={'material-tag' + (sel.includes(m) ? ' sel' : '')} onClick={() => toggle(m)}>{m}</div>)}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Peso (kg)</label><input type="number" placeholder="0.00" /></div>
            <div className="form-group"><label>Fecha recepción</label><input type="date" /></div>
          </div>
          <div className="form-group"><label>N° de lote</label><input type="text" placeholder="LOT-2024-001" /></div>
          <div className="form-actions">
            <button className="btn-primary" onClick={() => { setMsg(true); setTimeout(() => setMsg(false), 3000) }}>Registrar entrada</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Inventario</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Material</th><th>Stock</th><th>Precio/kg</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>🟫 Cartón</td><td>520 kg</td><td>$350</td><td><span className="badge badge-green">Disponible</span></td></tr>
              <tr><td>⚙️ Metales</td><td>310 kg</td><td>$1,200</td><td><span className="badge badge-green">Disponible</span></td></tr>
              <tr><td>🫙 Vidrio</td><td>180 kg</td><td>$150</td><td><span className="badge badge-yellow">Bajo stock</span></td></tr>
              <tr><td>🔶 Cobre</td><td>90 kg</td><td>$18,000</td><td><span className="badge badge-green">Disponible</span></td></tr>
              <tr><td>🧴 Plástico</td><td>740 kg</td><td>$400</td><td><span className="badge badge-green">Disponible</span></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}

