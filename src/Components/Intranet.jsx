import React from 'react';
import './Intranet.css';

const Intranet = ({ onLogout }) => {
  return (
    <div className="admin-container">
      {/* BARRA LATERAL (SIDEBAR) */}
      <aside className="admin-sidebar">
        <div className="sidebar-logo">Sabor&Arte</div>
        <ul className="sidebar-menu">
          <li className="active">Dashboard</li>
          <li>Calendario</li>
          <li>Reservas</li>
          <li>Mesas</li>
          <li>Platos</li>
          <li>Horarios</li>
          <li>Reportes</li>
        </ul>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="admin-main">
        {/* NAVBAR SUPERIOR */}
        <header className="admin-navbar">
          <div>
            <span className="navbar-subtitle">PANEL ADMINISTRATIVO</span>
            <h1>Gestión de Reservas</h1>
          </div>
          <div className="admin-user-info">
            <div className="user-avatar">A</div>
            <div className="user-details">
              <span className="user-name">Administrador</span>
              <span className="user-role">Sabor&Arte</span>
            </div>
            {/* Botón de cerrar sesión conectado a la función onLogout */}
            <button type="button" className="btn btn-outline" onClick={onLogout}>
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* CUERPO DEL DASHBOARD */}
        <div className="dashboard-content">
          <h2 className="section-title">PANEL DE RESERVAS</h2>

          {/* TARJETAS DE MÉTRICAS */}
          <div className="metrics-grid">
            <div className="metric-card"><strong>12</strong> Reservas</div>
            <div className="metric-card"><strong>8</strong> Confirmadas</div>
            <div className="metric-card"><strong>2</strong> Pendientes</div>
            <div className="metric-card"><strong>1</strong> En espera</div>
          </div>

          <div className="metrics-grid-secondary">
            <div className="metric-card highlight-green"><strong>5</strong> Mesas disponibles</div>
            <div className="metric-card highlight-red"><strong>3</strong> Mesas ocupadas</div>
          </div>

          {/* SECCIÓN CENTRAL: CALENDARIO Y ESTADO DE MESAS */}
          <div className="dashboard-grid-2">
            {/* CALENDARIO */}
            <div className="card calendar-card">
              <h3>CALENDARIO</h3>
              <div className="calendar-header">
                <span>&lt;</span>
                <strong>OCTUBRE 2026</strong>
                <span>&gt;</span>
              </div>
              <div className="calendar-table">
                <div className="cal-day-header">L</div>
                <div className="cal-day-header">M</div>
                <div className="cal-day-header">M</div>
                <div className="cal-day-header">J</div>
                <div className="cal-day-header">V</div>
                <div className="cal-day-header">S</div>
                <div className="cal-day-header">D</div>

                {/* Días de ejemplo */}
                {[...Array(31)].map((_, i) => (
                  <div key={i} className={`cal-day ${i + 1 === 21 ? 'active-date' : ''}`}>
                    {i + 1}
                  </div>
                ))}
              </div>
            </div>

            {/* ESTADO DE MESAS */}
            <div className="card tables-status-card">
              <h3>ESTADO DE MESAS</h3>
              
              <div className="table-row-item">
                <span className="table-name">MESA 1</span>
                <span className="status-text">Disponible</span>
                <span className="dot green"></span>
              </div>
              <div className="table-row-item">
                <span className="table-name">MESA 2</span>
                <span className="status-text">Ocupada</span>
                <span className="dot red"></span>
              </div>
              <div className="table-row-item">
                <span className="table-name">MESA 3</span>
                <span className="status-text">Disponible</span>
                <span className="dot green"></span>
              </div>
              <div className="table-row-item">
                <span className="table-name">MESA 4</span>
                <span className="status-text">Ocupada</span>
                <span className="dot red"></span>
              </div>

              {/* Leyenda inferior de mesas */}
              <div className="tables-legend">
                <div className="legend-item"><span className="dot green"></span> Disponible</div>
                <div className="legend-item"><span className="dot red"></span> Ocupada</div>
              </div>
            </div>
          </div>

          {/* TABLA: RESERVAS DE HOY */}
          <div className="card reservations-today-card">
            <h3>RESERVAS DE HOY</h3>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Hora</th>
                  <th>Cliente</th>
                  <th>Pers.</th>
                  <th>Mesa</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>7:00 PM</td>
                  <td>Amilcar Gamarra</td>
                  <td>2</td>
                  <td>M1</td>
                  <td><span className="badge green">Confirmado</span></td>
                  <td><button className="action-btn">VER</button></td>
                </tr>
                <tr>
                  <td>7:30 PM</td>
                  <td>Andre Araujo</td>
                  <td>4</td>
                  <td>M6</td>
                  <td><span className="badge yellow">Pendiente</span></td>
                  <td><button className="action-btn">EDITAR</button></td>
                </tr>
                <tr>
                  <td>8:00 PM</td>
                  <td>Gabriela Huamanchumo</td>
                  <td>6</td>
                  <td>M4</td>
                  <td><span className="badge green">Confirmado</span></td>
                  <td><button className="action-btn">CANCELAR</button></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* SECCIÓN DE REPORTES INFERIOR */}
          <div className="card reports-card">
            <div className="reports-header-row">
              <h3>REPORTES</h3>
              <button className="btn-generate-report">GENERAR REPORTE</button>
            </div>
            <div className="reports-buttons-grid">
              <button className="report-option-btn">RESERVAS</button>
              <button className="report-option-btn">OCUPACIÓN</button>
              <button className="report-option-btn">HORARIOS</button>
              <button className="report-option-btn">EXPERIENCIAS</button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default Intranet;