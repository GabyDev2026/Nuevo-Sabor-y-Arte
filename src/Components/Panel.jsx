import React from 'react';
import { Link } from 'react-router-dom';

export const Panel = () => {
  return (
    // Contenedor general con margen superior para que no choque con la barra de navegación superior
    <div className="d-flex min-vh-100" style={{ backgroundColor: '#121417', color: '#f8f9fa', paddingTop: '88px' }}>
      
      {/* 1. BARRA LATERAL (SIDEBAR) */}
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-dark border-end border-secondary" style={{ width: '260px', minHeight: 'calc(100vh - 88px)' }}>
        <div className="mb-3 px-2">
          <span className="fs-6 fw-bold" style={{ color: '#d4af37' }}>Sabor & Arte</span>
          <div className="text-muted" style={{ fontSize: '10px', letterSpacing: '1px' }}>PANEL DE ADMINISTRACIÓN</div>
        </div>
        <hr className="border-secondary my-2" />
        
        <ul className="nav nav-pills flex-column mb-auto gap-1">
          <li className="nav-item">
            <Link to="/panel" className="nav-link active text-dark fw-bold py-2" style={{ backgroundColor: '#d4af37' }}>
              📊 Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/panel" className="nav-link text-light py-2">
              Reservas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/panel" className="nav-link text-light py-2">
              Platos <span className="small text-muted d-block" style={{ fontSize: '11px' }}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/panel" className="nav-link text-light py-2">
              Mesas <span className="small text-muted d-block" style={{ fontSize: '11px' }}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/panel" className="nav-link text-light py-2">
              Ordenes <span className="small text-muted d-block" style={{ fontSize: '11px' }}></span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/panel" className="nav-link text-light py-2">
              📍 Contacto & Ubicación
            </Link>
          </li>
          <li className="nav-item mt-3">
            <Link to="/panel" className="nav-link text-light py-2">
              ⚙️ Ajustes de Cuenta
            </Link>
          </li>
        </ul>
        <hr className="border-secondary" />
        <div className="dropdown px-2">
          <a href="#!" className="d-flex align-items-center text-light text-decoration-none">
            <div className="rounded-circle bg-secondary text-dark d-flex align-items-center justify-content-center fw-bold me-2" style={{ width: '32px', height: '32px' }}>A</div>
            <strong>Admin</strong>
          </a>
        </div>
      </div>

      {/* 2. CONTENIDO PRINCIPAL DEL DASHBOARD (Con buen espaciado y separación) */}
      <div className="flex-grow-1 p-4 p-lg-5" style={{ overflowY: 'auto' }}>
        
        {/* Título superior */}
        <h3 className="fw-bold mb-4" style={{ color: '#f8f9fa', letterSpacing: '0.5px' }}>Panel de Control - Sabor & Arte</h3>

        {/* Tarjetas de Estadísticas (KPIs) con mejor separación (g-4) */}
        <div className="row g-4 mb-4">
          <div className="col-md-3">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 text-center shadow-sm">
              <span className="text-muted small">Reservas Hoy</span>
              <h2 className="fw-bold my-2" style={{ color: '#d4af37' }}>28</h2>
              <span className="text-success small">↗ Subiendo</span>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 text-center shadow-sm">
              <span className="text-muted small">Reservas Pendientes</span>
              <h2 className="fw-bold my-2 text-light">4</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 text-center shadow-sm">
              <span className="text-muted small">Pedidos Online</span>
              <h2 className="fw-bold my-2 text-light">12</h2>
            </div>
          </div>
          <div className="col-md-3">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 text-center shadow-sm">
              <span className="text-muted small">Platos Destacados</span>
              <h2 className="fw-bold my-2 text-light">5</h2>
            </div>
          </div>
        </div>

        {/* Banner de Imagen Superior con respiro */}
        <div className="card bg-dark border-secondary mb-4 overflow-hidden rounded-3 shadow-sm">
          <div className="p-3 text-center" style={{ background: 'linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url("https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1200") center/cover', height: '140px' }}>
          </div>
        </div>

        {/* Sección inferior dividida: Reservas Recientes y Edición Rápida con separación (g-4) */}
        <div className="row g-4">
          
          {/* Tabla de Reservas Recientes */}
          <div className="col-lg-8">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 shadow-sm h-100">
              <h5 className="fw-bold mb-3">Reservas Recientes</h5>
              <div className="table-responsive">
                <table className="table table-dark table-borderless align-middle mb-0">
                  <thead>
                    <tr className="text-muted border-bottom border-secondary">
                      <th className="pb-3">Hora</th>
                      <th className="pb-3">Cliente</th>
                      <th className="pb-3">Personas</th>
                      <th className="pb-3">Mesa</th>
                      <th className="pb-3">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-bottom border-secondary border-opacity-25">
                      <td className="py-3">12:30 PM</td>
                      <td className="py-3">Carlos Rodríguez</td>
                      <td className="py-3">2</td>
                      <td className="py-3">Mesa 5</td>
                      <td className="py-3"><span className="text-success">Confirmada</span></td>
                    </tr>
                    <tr className="border-bottom border-secondary border-opacity-25">
                      <td className="py-3">1:00 PM</td>
                      <td className="py-3">Ana Fernández</td>
                      <td className="py-3">4</td>
                      <td className="py-3">Terraza 1</td>
                      <td className="py-3"><span className="text-success">Confirmada</span></td>
                    </tr>
                    <tr className="border-bottom border-secondary border-opacity-25">
                      <td className="py-3">1:30 PM</td>
                      <td className="py-3">Grupo García</td>
                      <td className="py-3">8</td>
                      <td className="py-3">Mesa 12</td>
                      <td className="py-3"><span className="text-warning">Pendiente</span></td>
                    </tr>
                    <tr>
                      <td className="py-3">1:30 PM</td>
                      <td className="py-3">Carlos Rodríguez</td>
                      <td className="py-3">2</td>
                      <td className="py-3">Mesa 5</td>
                      <td className="py-3"><span className="text-success">Confirmada</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Edición Rápida del Menú */}
          <div className="col-lg-4">
            <div className="card bg-dark border-secondary text-light p-4 rounded-3 shadow-sm h-100 d-flex flex-column justify-content-between">
              <div>
                <h5 className="fw-bold mb-3">Edición Rápida del Menú</h5>
                
                <div className="mb-3 p-3 bg-black rounded border border-secondary d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Lomo Saltado</div>
                    <small className="text-muted">[S/ 96]</small>
                  </div>
                  <button className="btn btn-sm btn-light px-2 py-1">✏️</button>
                </div>

                <div className="mb-3 p-3 bg-black rounded border border-secondary d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Ceviche Langostinos</div>
                    <small className="text-muted">[S/ 85]</small>
                  </div>
                  <button className="btn btn-sm btn-light px-2 py-1">✏️</button>
                </div>

                <div className="mb-3 p-3 bg-black rounded border border-secondary d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Volcán Chocolate</div>
                    <small className="text-muted">[S/ 45]</small>
                  </div>
                  <button className="btn btn-sm btn-light px-2 py-1">✏️</button>
                </div>
              </div>

              <div className="d-grid mt-3">
                <button className="btn fw-bold text-dark py-2" style={{ backgroundColor: '#d4af37' }}>
                  Guardar Cambios
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};