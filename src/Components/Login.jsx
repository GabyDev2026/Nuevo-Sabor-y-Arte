import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

export const Login = () => {
  return (
    <div className="login-bg-container d-flex flex-column min-vh-100 justify-content-center align-items-center text-light" style={{ backgroundColor: '#121417', paddingTop: '100px', paddingBottom: '40px' }}>
      
      {/* Tarjeta central de inicio de sesión */}
      <div className="card p-4 p-md-5 shadow-lg border-0 rounded-4" style={{ backgroundColor: '#1a1d23', width: '100%', maxWidth: '480px', color: '#f8f9fa' }}>
        
        {/* Logo y título superior */}
        <div className="text-center mb-4">
          <div className="mb-2">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
          </div>
          <h4 className="fw-bold mb-1" style={{ letterSpacing: '1px' }}>Sabor & Arte</h4>
          <p className="text-muted small mb-0" style={{ letterSpacing: '2px' }}>RESTAURANTE GOURMET</p>
        </div>

        <h5 className="fw-bold mb-4 text-center" style={{ color: '#e2e8f0' }}>Iniciar Sesión - Sabor & Arte Admin</h5>

        <form>
          {/* Campo Usuario / Email */}
          <div className="mb-3">
            <label className="form-label small text-muted fw-semibold">Usuario (Email)</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                <i className="bi bi-person">👤</i>
              </span>
              <input 
                type="email" 
                className="form-control bg-dark border-secondary text-light shadow-none" 
                placeholder="usuario@sabor.pe" 
              />
            </div>
          </div>

          {/* Campo Contraseña */}
          <div className="mb-3">
            <label className="form-label small text-muted fw-semibold">Contraseña</label>
            <div className="input-group">
              <span className="input-group-text bg-dark border-secondary text-muted">
                🔒
              </span>
              <input 
                type="password" 
                className="form-control bg-dark border-secondary text-light shadow-none" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          {/* Opciones: Recordarme y Olvidaste contraseña */}
          <div className="d-flex justify-content-between align-items-center mb-4 small">
            <div className="form-check">
              <input type="checkbox" className="form-check-input shadow-none" id="rememberMe" />
              <label className="form-check-label text-muted" htmlFor="rememberMe">Recordarme</label>
            </div>
            <a href="#forgot" onClick={(e) => e.preventDefault()} className="text-decoration-none text-warning">¿Olvidaste tu contraseña?</a>
          </div>

          {/* Botón Iniciar Sesión enlazado al Panel */}
          <div className="d-grid">
            <Link to="/panel" className="btn fw-bold py-2 text-dark" style={{ backgroundColor: '#d4af37', transition: '0.3s' }}>
              Iniciar Sesión
            </Link>
          </div>
        </form>
      </div>

      {/* Pie de página institucional */}
      <footer className="mt-5 text-center text-muted small">
        <p className="mb-0">&copy; Sabor & Arte</p>
      </footer>
    </div>
  );
};