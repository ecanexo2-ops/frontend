import { useEffect, useState } from 'react'
import { api } from '../services/api'

const badgeClass = { Externo: 'badge-blue', Empresa: 'badge-green', Interno: 'badge-gray' }

const emptyForm = { tipoDoc: 'Cédula (CC)', documento: '', nombre: '', apellido: '', email: '', telefono: '', tipo: 'Externo' }

export default function Clientes() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [msg, setMsg] = useState(false)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [form, setForm] = useState(emptyForm)

  const cargar = () => {
    setLoading(true)
    api.getClientes().then(setClientes).catch(e => setError(e.message)).finally(() => setLoading(false))
  }

  useEffect(cargar, [])

  const update = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const guardar = async () => {
    if (!form.documento || !form.nombre) {
      setError('Documento y nombre son obligatorios.')
      return
    }
    setError('')
    setSaving(true)
    try {
      await api.crearCliente({
        nombre: `${form.nombre} ${form.apellido}`.trim(),
        documento: `${form.tipoDoc.includes('NIT') ? 'NIT' : 'CC'} ${form.documento}`,
        tipo: form.tipo,
        email: form.email,
        telefono: form.telefono,
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

  const filtrados = search
    ? clientes.filter(c =>
        c.nombre.toLowerCase().includes(search.toLowerCase()) ||
        c.documento.toLowerCase().includes(search.toLowerCase()))
    : clientes

  return (
    <>
      <div className="section-title">Gestión de clientes</div>
      <div className="section-sub">RF01 · RF02 — Registrar, consultar y editar clientes</div>
      {msg && <div className="success-msg">✅ Cliente guardado correctamente.</div>}
      {error && <div className="login-error">{error}</div>}
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Registrar / editar cliente</div>
          <div className="form-row">
            <div className="form-group">
              <label>Tipo documento</label>
              <select value={form.tipoDoc} onChange={update('tipoDoc')}>
                <option>Cédula (CC)</option>
                <option>NIT</option>
                <option>Pasaporte</option>
              </select>
            </div>
            <div className="form-group">
              <label>N° documento</label>
              <input type="text" placeholder="1000123456" value={form.documento} onChange={update('documento')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Primer nombre</label>
              <input type="text" placeholder="Juan" value={form.nombre} onChange={update('nombre')} />
            </div>
            <div className="form-group">
              <label>Primer apellido</label>
              <input type="text" placeholder="Pérez" value={form.apellido} onChange={update('apellido')} />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="correo@email.com" value={form.email} onChange={update('email')} />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input type="text" placeholder="300 123 4567" value={form.telefono} onChange={update('telefono')} />
            </div>
          </div>
          <div className="form-group">
            <label>Tipo de cliente</label>
            <select value={form.tipo} onChange={update('tipo')}>
              <option>Externo</option>
              <option>Empresa</option>
              <option>Interno</option>
            </select>
          </div>
          <div className="form-actions">
            <button className="btn-secondary" onClick={() => setForm(emptyForm)}>Limpiar</button>
            <button className="btn-primary" onClick={guardar} disabled={saving}>
              {saving ? 'Guardando...' : 'Guardar cliente'}
            </button>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Clientes registrados</div>
          <div className="form-group">
            <input
              type="text"
              placeholder="🔍 Buscar por nombre o documento..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="table-wrap"><table>
            <thead><tr><th>Nombre</th><th>Documento</th><th>Tipo</th><th>Acción</th></tr></thead>
            <tbody>
              {loading && <tr><td colSpan={4}>Cargando...</td></tr>}
              {!loading && filtrados.length === 0 && <tr><td colSpan={4}>Sin resultados.</td></tr>}
              {filtrados.map(c => (
                <tr key={c.id}>
                  <td>{c.nombre}</td>
                  <td>{c.documento}</td>
                  <td><span className={'badge ' + (badgeClass[c.tipo] || 'badge-gray')}>{c.tipo}</span></td>
                  <td><button className="btn-sm">Editar</button></td>
                </tr>
              ))}
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}
