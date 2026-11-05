import React from 'react';
import { Link } from 'react-router-dom';
import EncabezadoSeccion from './EncabezadoSeccion';
import TarjetaPlato from './TarjetaPlato';
import { COLORES } from '../datos/colores';

const IMG = process.env.PUBLIC_URL + '/img/';

const CARACTERISTICAS = [
  { imagen: 'gorro.png', titulo: 'Ingredientes frescos', texto: 'Seleccionamos lo mejor de cada temporada.' },
  { imagen: 'plato.png', titulo: 'Alta cocina', texto: 'Recetas únicas con toque gourmet.' },
  { imagen: 'hojas.png', titulo: 'Ambiente acogedor', texto: 'El lugar perfecto para compartir.' },
  { imagen: 'copa.png', titulo: 'Vinos selectos', texto: 'Maridajes que realzan cada sabor.' },
];

export default function Inicio({ platos }) {
  return (
    <div>

      {/* HERO */}
      <section
        className="position-relative text-white overflow-hidden"
        style={{ minHeight: '600px', backgroundColor: COLORES.negro }}
      >
        <img
          src={IMG + 'banner.png'}
          alt="Banner Sabor y Arte"
          className="position-absolute top-0 start-0 w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-black opacity-50"></div>

        <div className="position-relative container d-flex align-items-center" style={{ minHeight: '600px' }}>
          <div className="row w-100">
            <div className="col-lg-6 col-md-8">
              <span className="text-warning text-uppercase small fw-bold" style={{ letterSpacing: '2px' }}>
                Buena comida &middot; Grandes momentos
              </span>
              <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: 'Georgia, serif' }}>
                Una experiencia gastronómica única
              </h1>
              <p className="lead fs-6 mt-3 text-light opacity-75" style={{ maxWidth: '500px' }}>
                En Sabor & Arte combinamos ingredientes frescos, técnicas de alta cocina y un ambiente
                acogedor para que cada visita sea inolvidable.
              </p>
              <Link to="/reservas" className="btn btn-warning btn-lg mt-3 me-2 px-4 fw-bold rounded-pill shadow">
                Reservar mesa
              </Link>
              <Link to="/menu" className="btn btn-outline-light btn-lg mt-3 px-4 rounded-pill">
                Ver menú &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CARACTERÍSTICAS */}
      <section className="container py-5">
        <div className="row text-center py-4 bg-white rounded shadow-sm border mx-0">
          {CARACTERISTICAS.map((c, i) => (
            <div
              key={c.titulo}
              className={`col-md-3 mb-3 mb-md-0 px-2 ${i < CARACTERISTICAS.length - 1 ? 'border-end' : ''}`}
            >
              <img src={IMG + c.imagen} alt={c.titulo} className="mb-3" width="100" height="100" />
              <h6 className="fw-bold text-dark mb-1">{c.titulo}</h6>
              <p className="text-muted small mb-0">{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PLATOS DESTACADOS */}
      <section className="container pb-5">
        <div className="text-center mb-5">
          <span className="text-uppercase small fw-semibold" style={{ color: COLORES.dorado, letterSpacing: '3px' }}>
            Nuestra carta
          </span>
          <h2 className="fw-bold mt-2 text-dark">Platos destacados</h2>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {platos.map((plato) => (
            <div className="col" key={plato.id}>
              <TarjetaPlato plato={plato} />
            </div>
          ))}
        </div>
      </section>

      {/* SOBRE NOSOTROS */}
      <section className="container pb-5">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src={IMG + 'restaurante.png'}
              alt="Ambiente del Restaurante Sabor y Arte"
              className="w-100 rounded shadow-sm"
              style={{ height: '320px', objectFit: 'cover' }}
            />
          </div>
          <div className="col-md-6 ps-md-5">
            <span className="text-muted text-uppercase fw-bold small" style={{ letterSpacing: '2px' }}>
              Sobre nosotros
            </span>
            <h2 className="fw-bold text-dark mt-2 mb-3">
              Más que un restaurante,<br />una experiencia
            </h2>
            <p className="text-muted">
              En Sabor & Arte creemos que la buena comida no solo se disfruta, se vive. Por eso, cada
              plato está pensado para despertar tus sentidos y hacer de cada visita un momento especial.
            </p>
            <Link to="/nosotros" className="btn btn-outline-dark mt-2 rounded-pill px-4">
              Conoce más &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}