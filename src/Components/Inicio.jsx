import React from 'react'
import { Link } from 'react-router-dom'
import bannerImg from '../img/banner.png';
import gorroImg from '../img/gorro.png';
import platoImg from '../img/plato.png';
import hojasImg from '../img/hojas.png';
import copaImg from  '../img/copa.png';
import carneImg from '../img/carne.png';
import pastaImg from '../img/pasta.png';
import salmonImg from '../img/salmon.png';
import postreImg from '../img/postre.png';
import restauranteImg from '../img/restaurante.png';

export default function Inicio() {
  return (
    <div>
      {/* 1. SECCIÓN HERO CON IMAGEN DE FONDO A ANCHO COMPLETO */}
    
      <div className="position-relative text-white overflow-hidden" style={{ minHeight: '600px', backgroundColor: '#121212' }}>
        
        {/* Imagen de fondo absoluta con oscurecimiento para que resalte el texto */}
        <img
          src={bannerImg}
          alt="Banner Sabor y Arte"
          className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
        />

        {/* Contenido alineado a la izquierda encima de la imagen */}
        <div className="position-relative z-1 container d-flex align-items-center" style={{ minHeight: '600px' }}>
          <div className="row justify-content-start w-100">
            <div className="col-lg-6 col-md-8 text-start ms-lg-4">
              <span className="text-warning text-uppercase small fw-bold" style={{ letterSpacing: '2px' }}>
                Buena comida &middot; Grandes momentos
              </span>
              <h1 className="display-4 fw-bold mt-2 text-white" style={{ fontFamily: 'Georgia, serif' }}>
                Una experiencia gastronómica única
              </h1>
              <p className="lead fs-6 mt-3 text-light opacity-85" style={{ maxWidth: '500px' }}>
                En Sabor & Arte combinamos ingredientes frescos, técnicas de alta cocina y un ambiente acogedor para que cada visita sea inolvidable.
              </p>
              <Link to="/menu" className="btn btn-warning btn-lg mt-3 px-4 fw-bold text-dark rounded-pill shadow">
                Ver nuestro menú &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SECCIÓN MEDIA CLARA (Iconos de características + Platos + Sobre Nosotros) */}
      <div>
        <div>
          
          {/* Barra de Características en fondo claro */}
          <div className="row text-center py-4 bg-white rounded shadow-sm border mb-5 mx-0">
            <div className="col-md-3 mb-3 mb-md-0 px-2 border-end">
              <img src={gorroImg} alt="ingredientes" className="mb-3" style={{ width: '100px', height: '100px' }} />
              <h6 className="fw-bold text-dark mb-1">Ingredientes frescos</h6>
              <p className="text-muted small mb-0">Seleccionamos lo mejor de cada temporada.</p>
            </div>
            <div className="col-md-3 mb-3 mb-md-0 px-2 border-end">
              <img src={platoImg} alt="receta" className="mb-3" style={{ width: '100px', height: '100px' }} />
              <h6 className="fw-bold text-dark mb-1">Alta cocina</h6>
              <p className="text-muted small mb-0">Recetas únicas con toque gourmet.</p>
            </div>
            <div className="col-md-3 mb-3 mb-md-0 px-2 border-end">
              <img src={hojasImg} alt="ambiente" className="mb-3" style={{ width: '100px', height: '100px' }} />
              <h6 className="fw-bold text-dark mb-1">Ambiente acogedor</h6>
              <p className="text-muted small mb-0">El lugar perfecto para compartir.</p>
            </div>
            <div className="col-md-3 px-2">
              <img src={copaImg} alt="vinos" className="mb-3" style={{ width: '100px', height: '100px' }} />
              <h6 className="fw-bold text-dark mb-1">Vinos selectos</h6>
              <p className="text-muted small mb-0">Maridajes que realzan cada sabor.</p>
            </div>
          </div>

          {/* Título de Platos */}
            <div className="row row-cols-1 row-cols-md-4 g-4 mb-5">
                        
              <div className="col">
                <div className="card h-100 bg-white text-dark border-0 shadow-sm overflow-hidden">
                  <img src={carneImg} alt="carne" className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="card-title fw-bold text-dark">Bife de res gourmet</h5>
                      <p className="card-text small text-muted">Jugoso corte de res acompañado de papas rústicas y vegetales salteados.</p>
                    </div>
                    <p className="fw-bold text-dark mt-3 mb-0">S/ 45.00</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 bg-white text-dark border-0 shadow-sm overflow-hidden">
                  <img src={pastaImg} alt="pasta" className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="card-title fw-bold text-dark">Pasta alfredo con langostinos</h5>
                      <p className="card-text small text-muted">Pasta fresca en salsa cremosa con langostinos y un toque de parmesano.</p>
                    </div>
                    <p className="fw-bold text-dark mt-3 mb-0">S/ 38.00</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 bg-white text-dark border-0 shadow-sm overflow-hidden">
                  <img src={salmonImg} alt="salmon" className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="card-title fw-bold text-dark">Salmón a la parrilla</h5>
                      <p className="card-text small text-muted">Salmón fresco con salsa de limón, espárragos y puré de camote.</p>
                    </div>
                    <p className="fw-bold text-dark mt-3 mb-0">S/ 42.00</p>
                  </div>
                </div>
              </div>

              <div className="col">
                <div className="card h-100 bg-white text-dark border-0 shadow-sm overflow-hidden">
                  <img src={postreImg} alt="postre" className="w-100" style={{ height: '180px', objectFit: 'cover' }} />
                  <div className="card-body d-flex flex-column justify-content-between p-3">
                    <div>
                      <h5 className="card-title fw-bold text-dark">Coulant de chocolate</h5>
                      <p className="card-text small text-muted">Suave por dentro, intenso por fuera. Acompañado de helado artesanal.</p>
                    </div>
                    <p className="fw-bold text-dark mt-3 mb-0">S/ 18.00</p>
                  </div>
                </div>
              </div>

            </div>

           {/* Sección Sobre Nosotros */}
            <div className="row align-items-center py-4 mt-5">
              <div className="col-md-6 mb-4 mb-md-0">
                <img 
                  src={restauranteImg} 
                  alt="Ambiente del Restaurante Sabor y Arte" 
                  className="w-100 rounded shadow-sm object-fit-cover" 
                  style={{ height: '320px' }} 
                />
              </div>
              <div className="col-md-6 ps-md-5">
                <span className="text-muted text-uppercase fw-bold small" style={{ letterSpacing: '2px' }}>Sobre Nosotros</span>
                <h2 className="fw-bold text-dark mt-2 mb-3">Más que un restaurante,<br/>una experiencia</h2>
                <p className="text-muted">
                  En Sabor & Arte creemos que la buena comida no solo se disfruta, se vive. Por eso, cada plato está pensado para despertar tus sentidos y hacer de cada visita un momento especial.
                </p>
                <Link to="/nosotros" className="btn btn-outline-dark mt-2 rounded-pill px-4">
                  Conoce más &rarr;
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  )
}