import { useEffect, useState } from 'react'
import { api } from '../services/api'

const emptyForm = { tipoDoc: 'Cédula (CC)', documento: '', nombre: '', apellido: '', telefono: '', usuario: '' }

export default function Planillero() {
  const [recicladores, setRecicladores] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState(emptyForm)

  const cargar = () => {
    setLoading(true)
    api.getRecicladores().then(setRecicladores).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(cargar, [])

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const registrar = async () => {
    if (!form.documento || !form.nombre) {
      setError('Documento y nombre son obligatorios.')
      return
    }
    setError('')
    setSaving(true)
    try {
      await api.crearReciclador({
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        documento: `CC ${form.documento}`,
        telefono: form.telefono,
        usuario: form.usuario,
      })
      setMsg(true)
      setForm(emptyForm)
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
      <div className="section-title">Registro de recicladores</div>
      <div className="section-sub">RF06 — Planillero: registrar y gestionar recicladores</div>
      {msg && <div className="success-msg">✅ Reciclador registrado en la base de datos.</div>}
      {error && <div className="login-error">{error}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Registrar reciclador</div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo documento</label>
              <select value={form.tipoDoc} onChange={update('tipoDoc')}>
                <option>Cédula (CC)</option>
                <option>Pasaporte</option>
              </select>
            </div>
            <div className="form-group">
              <label>N° documento</label>
              <input type="text" placeholder="1000999888" value={form.documento} onChange={update('documento')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Primer nombre</label>
              <input type="text" placeholder="Pedro" value={form.nombre} onChange={update('nombre')} />
            </div>
            <div className="form-group">
              <label>Primer apellido</label>
              <input type="text" placeholder="Gómez" value={form.apellido} onChange={update('apellido')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" placeholder="315 000 1111" value={form.telefono} onChange={update('telefono')} />
            </div>
            <div className="form-group">
              <label>Usuario sistema</label>
              <input type="text" placeholder="pedro.gomez" value={form.usuario} onChange={update('usuario')} />
            </div>
          </div>
          <div className="form-actions">
            <button className="btn-primary" onClick={registrar} disabled={saving}>
              {saving ? 'Guardando...' : 'Registrar reciclador'}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Recicladores registrados</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Nombre</th><th>Documento</th><th>Estado</th></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={3}>Cargando...</td></tr>}
              {!loading && recicladores.map(r => (
                <tr key={r.id}>
                  <td>{r.nombre}</td>
                  <td>{r.documento}</td>
                  <td><span className={'badge ' + (r.estado === 'Activo' ? 'badge-green' : 'badge-gray')}>{r.estado}</span></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}
