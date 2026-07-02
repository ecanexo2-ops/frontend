import { Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import Login from './pages/Login'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Clientes from './pages/Clientes'
import Solicitudes from './pages/Solicitudes'
import Pagos from './pages/Pagos'
import Ventas from './pages/Ventas'
import Planillero from './pages/Planillero'
import Productos from './pages/Productos'
import PagoReciclador from './pages/PagoReciclador'

export default function App() {
  const [user, setUser] = useState(null)

  if (!user) {
    return <Login onLogin={setUser} />
  }

  return (
    <div className="app-layout">
      <Sidebar user={user} onLogout={() => setUser(null)} />
      <div className="main">
        <div className="topbar">
          <span className="topbar-title">ECANEXO</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span className="badge-notif">3 alertas</span>
            <span style={{ fontSize: 13, color: '#888' }}>
              {new Date().toLocaleDateString('es-CO', { weekday: 'short', day: '2-digit', month: 'short' })}
            </span>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/solicitudes" element={<Solicitudes />} />
            <Route path="/pagos" element={<Pagos />} />
            <Route path="/ventas" element={<Ventas />} />
            <Route path="/planillero" element={<Planillero />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/pago-reciclador" element={<PagoReciclador />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}