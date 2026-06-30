export default function Dashboard() {
  return (
    <>
      <div className="section-title">Panel de control</div>
      <div className="section-sub">Resumen general del sistema ECA</div>
      <div className="stat-grid">
        <div className="stat-card"><div className="stat-label">Clientes registrados</div><div className="stat-value green">142</div><div className="stat-sub">+8 este mes</div></div>
        <div className="stat-card"><div className="stat-label">Recicladores activos</div><div className="stat-value blue">67</div><div className="stat-sub">+3 esta semana</div></div>
        <div className="stat-card"><div className="stat-label">Ventas del mes</div><div className="stat-value">$4.2M</div><div className="stat-sub">COP</div></div>
        <div className="stat-card"><div className="stat-label">Inventario total</div><div className="stat-value green">1,840 kg</div><div className="stat-sub">5 tipos</div></div>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="card-title">Últimas solicitudes</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Cliente</th><th>Material</th><th>Estado</th></tr></thead>
            <tbody>
              <tr><td>Juan Pérez</td><td>Cartón</td><td><span className="badge badge-green">Confirmada</span></td></tr>
              <tr><td>María López</td><td>Plástico</td><td><span className="badge badge-yellow">Pendiente</span></td></tr>
              <tr><td>Eco Reciclados SAS</td><td>Cobre</td><td><span className="badge badge-blue">En proceso</span></td></tr>
            </tbody>
          </table></div>
        </div>
        <div className="card">
          <div className="card-title">Inventario actual</div>
          <div className="table-wrap"><table>
            <thead><tr><th>Material</th><th>Cantidad</th><th>Precio/kg</th></tr></thead>
            <tbody>
              <tr><td>🟫 Cartón</td><td>520 kg</td><td>$350</td></tr>
              <tr><td>⚙️ Metales</td><td>310 kg</td><td>$1,200</td></tr>
              <tr><td>🫙 Vidrio</td><td>180 kg</td><td>$150</td></tr>
              <tr><td>🔶 Cobre</td><td>90 kg</td><td>$18,000</td></tr>
              <tr><td>🧴 Plástico</td><td>740 kg</td><td>$400</td></tr>
            </tbody>
          </table></div>
        </div>
      </div>
    </>
  )
}