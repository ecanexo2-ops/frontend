import { useState } from 'react'
export default function Clientes() {
  const [msg, setMsg] = useState(false)
  const guardar = () => { setMsg(true); setTimeout(() => setMsg(false), 3000) }
  return (
    <>
      <div className="section-title">Gestión de clientes</div>
      <div className="section-sub">RF01 · RF02 — Registrar, consultar y editar clientes</div>
      {msg && <div className="success-msg">✅ Cliente guardado correctamente.</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Registrar / editar cliente</div>
          <div className="form-row">
            <div className="form-group"><label>Tipo documento</label><select><option>Cédula (CC)</option><option>NIT</option><option>Pasaporte</option></select></div>
            <div className="form-group"><label>N° documento</label><input type="text" placeholder="1000123456" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Primer nombre</label><input type="text" placeholder="Juan" /></div>
            <div className="form-group"><label>Primer apellido</label><input type="text" placeholder="Pérez" /></div>
          </div>
          <div className="form-row">
            <div className="form-group"><label>Email</label><input type="email" placeholder="correo@email.com" /></div>
            <div className="form-group"><label>Teléfono</label><input type="text" placeholder="300 123 4567" /></div>
          </div>
          <div className="form-group"><label>Tipo de cliente</label><select><option>Externo</option><option>Empresa</option><option>Interno</option></select></div>
          <div className="form-actions">
            <button className="btn-secondary">Limpiar</button>
            <button className="btn-primary" onClick={guardar}>Guardar cliente</button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Clientes registrados</div>
          <div className="form-group"><input type="text" placeholder="🔍 Buscar por nombre o documento..." /></div>
          <div className="table-wrap"><table>
            <thead><tr><th>Nombre</th><th>Documento</th><th>Tipo</th><th>Acción</th></tr></thead>
            <tbody>
              <tr><td>Juan Pérez</td><td>CC 1001234</td><td><span className="badge badge-blue">Externo</span></td><td><button className="btn-sm">Editar</button></td></tr>
              <tr><td>María López</td><td>CC 1005678</td><td><span className="badge badge-green">Empresa</span></td><td><button className="btn-sm">Editar</button></td></tr>
              <tr><td>Eco Reciclados SAS</td><td>NIT 900123</td><td><span className="badge badge-green">Empresa</span></td><td><button className="btn-sm">Editar</button></td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}