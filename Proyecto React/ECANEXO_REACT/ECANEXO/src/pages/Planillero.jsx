import { useState } from 'react'
export default function Planillero() {
  const [msg, setMsg] = useState(false)
  return (
    <>
      <div className="section-title">Registro de recicladores</div>
      <div className="section-sub">RF06 — Planillero: registrar y gestionar recicladores</div>
      {msg && <div className="success-msg">✅ Reciclador registrado en la base de datos.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Registrar reciclador</div>
          <div className="form-row">
            <div className="form-group"><label>Tipo documento</label><select><option>Cédula (CC)</option><option>Pasaporte</option></select></div>
            <div className="form-group"><label>N° documento</label><input type="text" placeholder="1000999888" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Primer nombre</label><input type="text" placeholder="Pedro" /></div>
            <div className="form-group"><label>Primer apellido</label><input type="text" placeholder="Gómez" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Teléfono</label><input type="text" placeholder="315 000 1111" /></div>
            <div className="form-group"><label>Usuario sistema</label><input type="text" placeholder="pedro.gomez" /></div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={() => { setMsg(true); setTimeout(() => setMsg(false), 3000) }}>Registrar reciclador</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Recicladores registrados</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Nombre</th><th>Documento</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>Pedro Gómez</td><td>CC 1000111</td><td><span className="badge badge-green">Activo</span></td></tr>
              <tr><td>Luz Marina Díaz</td><td>CC 1000222</td><td><span className="badge badge-green">Activo</span></td></tr>
              <tr><td>Raúl Torres</td><td>CC 1000333</td><td><span className="badge badge-gray">Inactivo</span></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}