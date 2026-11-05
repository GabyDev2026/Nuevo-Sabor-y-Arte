import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Navegacion() {
  const location = useLocation();

  // Función auxiliar para saber qué enlace está activo y ponerle la línea dorada
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark sticky-top py-2 border-bottom border-secondary" style={{ backgroundColor: '#121212' }}>
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center text-decoration-none">
          <img 
            src={process.env.PUBLIC_URL + "/img/chef.png"}
            alt="Logo Chef" 
            width="45" 
            height="45" 
          />
          <div className="d-flex flex-column ms-2">
            <span className="fw-bold fs-4 text-white font-serif">
              Sabor & Arte
            </span>
            <small className="text-uppercase text-warning fw-semibold" style={{ fontSize: '10px' }}>
              RESTAURANTE GOURMET
            </small>
          </div>
        </Link>

        {/* BOTÓN MOBILE */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuSabor&Arte"
          aria-controls="menuSabor&Arte"
          aria-expanded="false"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* MENÚ */}
        <div
          className="collapse navbar-collapse"
          id="menuSabor&Arte"
        >
          <div className="navbar-nav ms-auto align-items-lg-center gap-2">

            {/* INICIO */}
            <Link
              className={`nav-link px-2 ${isActive('/') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/"
              style={{ borderBottom: isActive('/') ? '2px solid #d4af37' : 'none' }}
            >
              INICIO
            </Link>

            {/* NOSOTROS / EXPERIENCIA */}
            <Link
              className={`nav-link px-2 ${isActive('/nosotros') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/nosotros"
              style={{ borderBottom: isActive('/nosotros') ? '2px solid #d4af37' : 'none' }}
            >
              NOSOTROS
            </Link>

            {/* MENÚ / CARTA */}
            <Link
              className={`nav-link px-2 ${isActive('/menu') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/menu"
              style={{ borderBottom: isActive('/menu') ? '2px solid #d4af37' : 'none' }}
            >
              MENÚ
            </Link>

            {/* GALERÍA */}
            <Link
              className={`nav-link px-2 ${isActive('/galeria') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/galeria"
              style={{ borderBottom: isActive('/galeria') ? '2px solid #d4af37' : 'none' }}
            >
              GALERÍA
            </Link>

            {/* CONTACTO */}
            <Link
              className={`nav-link px-2 ${isActive('/contacto') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/contacto"
              style={{ borderBottom: isActive('/contacto') ? '2px solid #d4af37' : 'none' }}
            >
              CONTACTO
            </Link>

            {/* RESERVAS */}
            <Link
              className={`nav-link px-2 ${isActive('/reservas') ? 'text-warning fw-bold' : 'text-light'}`}
              to="/reservas"
              style={{ borderBottom: isActive('/reservas') ? '2px solid #d4af37' : 'none' }}
            >
              RESERVA
            </Link>

            {/* INTRANET */}
            <Link
              className="btn btn-outline-warning rounded-pill px-4 py-2 fw-bold ms-lg-2"
              to="/login"
              style={{ fontSize: '14px' }}
            >
              INTRANET
            </Link>

          </div>
        </div>

      </div>
    </nav>
  );
}