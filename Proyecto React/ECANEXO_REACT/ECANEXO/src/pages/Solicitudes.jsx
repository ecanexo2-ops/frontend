import { useState } from 'react'
const MATS = ['🟫 Cartón','⚙️ Metales','🫙 Vidrio','🔶 Cobre','🧴 Plástico']
export default function Solicitudes() {
  const [sel, setSel] = useState([])
  const [msg, setMsg] = useState(false)
  const toggle = m => setSel(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])
  const guardar = () => { setMsg(true); setTimeout(() => setMsg(false), 3000) }
  return (
    <>
      <div className="section-title">Solicitud de producto</div>
      <div className="section-sub">RF03 — Registro de pedidos por tipo de material</div>
      {msg && <div className="success-msg">✅ Solicitud registrada correctamente.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Nueva solicitud</div>
          <div className="form-group"><label>Cliente</label><select><option>Juan Pérez</option><option>María López</option><option>Eco Reciclados SAS</option></select></div>
          <div className="form-row">
            <div className="form-group"><label>Fecha de entrega</label><input type="date" /></div>
            <div className="form-group"><label>Hora de entrega</label><input type="time" /></div>
          </div>
          <div className="form-group">
            <label>Materiales</label>
            <div className="material-tags">
              {MATS.map(m => <div key={m} className={'material-tag' + (sel.includes(m) ? ' sel' : '')} onClick={() => toggle(m)}>{m}</div>)}
            </div>
          </div>
          <div className="form-group"><label>Cantidad (kg)</label><input type="number" placeholder="50" /></div>
          <div className="form-actions">
            <button className="btn-primary" onClick={guardar}>Registrar solicitud</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Historial</div>
          <div className="table-wrap"><table>
            <thead><tr><th>ID</th><th>Cliente</th><th>Material</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>#0021</td><td>Juan P.</td><td>Cartón</td><td><span className="badge badge-green">Confirmada</span></td></tr>
              <tr><td>#0022</td><td>María L.</td><td>Plástico</td><td><span className="badge badge-yellow">Pendiente</span></td></tr>
              <tr><td>#0023</td><td>Eco SAS</td><td>Cobre</td><td><span className="badge badge-blue">En proceso</span></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}