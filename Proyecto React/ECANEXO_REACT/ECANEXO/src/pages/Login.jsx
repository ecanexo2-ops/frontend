import { useState } from 'react'
import logo from '../assets/logo.jpeg'

const USERS = {
  caja:       { pass: '1234', role: 'Caja',       initials: 'CA' },
  planillero: { pass: '1234', role: 'Planillero', initials: 'PL' },
  admin:      { pass: 'admin', role: 'Admin',     initials: 'AD' },
}

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')

  const handleLogin = () => {
    const key = username.trim().toLowerCase()
    const found = USERS[key]
    if (found && found.pass === password) {
      setError('')
      onLogin({ username: key, role: found.role, initials: found.initials })
    } else {
      setError('Usuario o contraseña incorrectos.')
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-logo">
          <img src={logo} alt="ECANEXO" style={{ width: 130 }} />
        </div>
        <h2>Bienvenido a ECANEXO</h2>
        <p className="sub">Sistema de Gestión de Reciclaje</p>

        {error && <div className="login-error">{error}</div>}

        <div className="form-group">
          <label>Usuario</label>
          <input
            type="text"
            placeholder="caja / planillero / admin"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleLogin()}
          />
        </div>
        <button className="btn-primary full" onClick={handleLogin}>
          Iniciar sesión
        </button>
      </div>
    </div>
  )
}