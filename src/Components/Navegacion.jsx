import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { COLORES } from '../datos/colores';

const ENLACES = [
  { to: '/', label: 'INICIO' },
  { to: '/nosotros', label: 'NOSOTROS' },
  { to: '/menu', label: 'MENÚ' },
  { to: '/galeria', label: 'GALERÍA' },
  { to: '/contacto', label: 'CONTACTO' },
  { to: '/reservas', label: 'RESERVA' },
];

export default function Navegacion() {
  const { pathname } = useLocation();
  const [abierto, setAbierto] = useState(false);

  const cerrarMenu = () => setAbierto(false);

  return (
    <nav
      aria-label="Principal"
      className="navbar navbar-expand-lg navbar-dark sticky-top py-2 border-bottom border-secondary"
      style={{ backgroundColor: COLORES.negro }}
    >
      <div className="container">

        {/* LOGO */}
        <Link to="/" className="navbar-brand d-flex align-items-center" onClick={cerrarMenu}>
          <img
            src={process.env.PUBLIC_URL + '/img/chef.png'}
            alt="Logo Chef"
            width="45"
            height="45"
          />
          <div className="d-flex flex-column ms-2">
            <span className="fw-bold fs-4 text-white" style={{ fontFamily: 'Georgia, serif' }}>
              Sabor & Arte
            </span>
            <small className="text-uppercase text-warning fw-semibold" style={{ fontSize: '10px' }}>
              Restaurante Gourmet
            </small>
          </div>
        </Link>

        {/* BOTÓN MÓVIL */}
        <button
          className="navbar-toggler border-0"
          type="button"
          aria-controls="menu-sabor-arte"
          aria-expanded={abierto}
          aria-label="Abrir menú"
          onClick={() => setAbierto(!abierto)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ENLACES */}
        <div className={`collapse navbar-collapse ${abierto ? 'show' : ''}`} id="menu-sabor-arte">
          <div className="navbar-nav ms-auto align-items-lg-center gap-2">

            {ENLACES.map((enlace) => {
              const activo = pathname === enlace.to;
              return (
                <Link
                  key={enlace.to}
                  to={enlace.to}
                  onClick={cerrarMenu}
                  aria-current={activo ? 'page' : undefined}
                  className={`nav-link px-2 ${activo ? 'text-warning fw-bold' : 'text-light'}`}
                  style={{ borderBottom: `2px solid ${activo ? COLORES.doradoClaro : 'transparent'}` }}
                >
                  {enlace.label}
                </Link>
              );
            })}

            <Link
              to="/login"
              onClick={cerrarMenu}
              className="btn btn-outline-warning rounded-pill px-4 py-2 fw-bold ms-lg-2"
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