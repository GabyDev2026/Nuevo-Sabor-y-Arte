import React from 'react';
import { Link } from 'react-router-dom';
import HorarioAtencion from './HorarioAtencion';
import EstadoAbierto from './EstadoAbierto';
import { COLORES } from '../datos/colores';

const ENLACES = [
  { to: '/', label: 'Inicio' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/menu', label: 'Menú' },
  { to: '/galeria', label: 'Galería' },
  { to: '/contacto', label: 'Contacto' },
  { to: '/reservas', label: 'Reservas' },
];

const DATOS_CONTACTO = [
  { icono: '📍', texto: 'Av. Los Olivos 123, Lima - Perú' },
  { icono: '📞', texto: '+51 987 654 321' },
  { icono: '✉️', texto: 'contacto@saborarte.com' },
];

export default function Footer({ horarios }) {
  const anio = new Date().getFullYear();

  return (
    <footer className="text-light pt-5" style={{ backgroundColor: COLORES.negro }}>
      <div className="container">
        <div className="row g-4 pb-4">

          {/* MARCA */}
          <div className="col-lg-4 col-md-6">
            <div className="d-flex align-items-center mb-3">
              <img
                src={process.env.PUBLIC_URL + '/img/chef.png'}
                alt="Logo Chef"
                width="45"
                height="45"
              />
              <div className="ms-2">
                <div className="fw-bold fs-5 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                  Sabor & Arte
                </div>
                <small className="text-uppercase text-warning" style={{ fontSize: '10px' }}>
                  Restaurante Gourmet
                </small>
              </div>
            </div>
            <p className="small text-light opacity-75">
              Ingredientes frescos, alta cocina y un ambiente acogedor para que cada visita sea inolvidable.
            </p>
            <Link to="/reservas" className="btn btn-warning btn-sm rounded-pill px-4 fw-bold">
              Reservar mesa
            </Link>
          </div>

          {/* ENLACES */}
          <div className="col-lg-2 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: COLORES.doradoClaro, letterSpacing: '2px' }}>
              Explora
            </h6>
            <ul className="list-unstyled small mb-0">
              {ENLACES.map((enlace) => (
                <li key={enlace.to} className="mb-2">
                  <Link to={enlace.to} className="text-light text-decoration-none opacity-75">
                    {enlace.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="col-lg-3 col-md-6 col-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: COLORES.doradoClaro, letterSpacing: '2px' }}>
              Contacto
            </h6>
            <ul className="list-unstyled small mb-0">
              {DATOS_CONTACTO.map((dato) => (
                <li key={dato.texto} className="mb-2 opacity-75">
                  <span aria-hidden="true">{dato.icono}</span> {dato.texto}
                </li>
              ))}
            </ul>
          </div>

          {/* HORARIO (viene del panel) */}
          <div className="col-lg-3 col-md-6">
            <h6 className="text-uppercase fw-bold mb-3" style={{ color: COLORES.doradoClaro, letterSpacing: '2px' }}>
              Horario <EstadoAbierto horarios={horarios} />
            </h6>
            <HorarioAtencion horarios={horarios} className="small mb-0" />
          </div>

        </div>

        {/* DERECHOS */}
        <div className="border-top border-secondary py-3 d-flex flex-column flex-md-row justify-content-between gap-2">
          <small className="opacity-75">
            © {anio} Sabor & Arte. Todos los derechos reservados.
          </small>
        </div>
      </div>
    </footer>
  );
}