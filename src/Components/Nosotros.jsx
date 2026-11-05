import React from 'react';
import './styles.css';

export default function Nosotros() {
  return (
    <div className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#f5f2eb', paddingTop: '100px' }}>
        
        {/* Cabecera de la sección */}
        <div className="text-center mb-5">
          <span className="text-uppercase small fw-semibold" style={{ color: '#b8973b', letterSpacing: '3px' }}>Nuestra Historia</span>
          <h1 className="fw-bold display-5 mt-2 text-dark">Más que un restaurante, una experiencia</h1>
          <p className="mx-auto mt-3 text-secondary" style={{ maxWidth: '700px', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Lo que comenzó como la pasión por fusionar la alta cocina peruana con técnicas contemporáneas es hoy un punto de encuentro para quienes buscan momentos inolvidables.
          </p>
        </div>

        {/* Bloque Principal: Imagen y Texto descriptivo */}
        <div className="row align-items-center g-5 my-3">
          <div className="col-lg-6">
            <div className="position-relative">
              <div 
                className="rounded shadow-sm border border-secondary border-opacity-25" 
                style={{ 
                  height: '380px', 
                  backgroundColor: '#e9ecef',
                  backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              ></div>
            </div>
          </div>

          <div className="col-lg-6">
            <h3 className="fw-bold mb-3 text-dark">Tradición, Arte y Sabor en Lima</h3>
            <p className="mb-3 text-secondary" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
              En <strong>Sabor & Arte</strong> creemos que la buena comida no solo se disfruta, se vive. Cada plato está minuciosamente pensado para despertar tus sentidos, honrando los insumos locales de nuestra tierra y elevándolos a un nivel gastronómico superior.
            </p>
            <p className="mb-4 text-secondary" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
              Nuestro ambiente cálido y sofisticado está diseñado para ofrecerte quietud y elegancia, convirtiendo cada almuerzo o cena en una celebración memorable para ti y los tuyos.
            </p>
            <div className="p-3 rounded border-start border-4 border-dark bg-light shadow-sm">
              <p className="fst-italic mb-0 text-dark" style={{ fontSize: '0.95rem' }}>
                &ldquo;En nuestra cocina, cuidamos la esencia de cada producto; porque el verdadero arte culinario nace del respeto por el sabor genuino.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* SECCIÓN: Nuestro Equipo */}
        <div className="py-5 my-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2 text-dark" style={{ letterSpacing: '1px' }}>Nuestro Equipo</h2>
            <p className="text-secondary small">El talento y la dedicación detrás de cada plato</p>
          </div>

          <div className="row g-4 text-center justify-content-center">
            
            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="p-3 rounded bg-light border border-secondary border-opacity-10 h-100 shadow-sm">
                <div className="rounded mb-3 bg-secondary" style={{ height: '140px', backgroundImage: 'url("https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Chef Juan Pérez</h6>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>Maestro Culinario</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="p-3 rounded bg-light border border-secondary border-opacity-10 h-100 shadow-sm">
                <div className="rounded mb-3 bg-secondary" style={{ height: '140px', backgroundImage: 'url("https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Ana Díaz</h6>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>Sommelier en Vinos</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="p-3 rounded bg-light border border-secondary border-opacity-10 h-100 shadow-sm">
                <div className="rounded mb-3 bg-secondary" style={{ height: '140px', backgroundImage: 'url("https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Carlos Ruiz</h6>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>Experto en Vinos</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="p-3 rounded bg-light border border-secondary border-opacity-10 h-100 shadow-sm">
                <div className="rounded mb-3 bg-secondary" style={{ height: '140px', backgroundImage: 'url("https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Sofía Morales</h6>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>Jefe de Sala</p>
              </div>
            </div>

            <div className="col-lg-2 col-md-4 col-sm-6">
              <div className="p-3 rounded bg-light border border-secondary border-opacity-10 h-100 shadow-sm">
                <div className="rounded mb-3 bg-secondary" style={{ height: '140px', backgroundImage: 'url("https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
                <h6 className="fw-bold text-dark mb-1" style={{ fontSize: '0.95rem' }}>Miguel Ángel</h6>
                <p className="small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>Sous Chef</p>
              </div>
            </div>

          </div>
        </div>

        {/* SECCIÓN: Nuestra Cocina */}
        <div className="row align-items-center g-5 my-4">
          <div className="col-lg-6 order-lg-2">
            <div 
              className="rounded shadow-sm border border-secondary border-opacity-25" 
              style={{ 
                height: '380px', 
                backgroundColor: '#e9ecef',
                backgroundImage: 'url("https://images.unsplash.com/photo-1507048331137-7a3c987ea6a3?q=80&w=1000&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-4 text-dark" style={{ letterSpacing: '0.5px' }}>Nuestra Cocina</h2>
            <p className="text-secondary mb-3" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
              Equipada con tecnología de vanguardia y un ambiente donde impera el orden y la disciplina, nuestra cocina es el laboratorio creativo de donde surgen verdaderas obras de arte culinarias.
            </p>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.7', fontSize: '1.05rem' }}>
              Cuidamos cada estándar de calidad e higiene para garantizar que cada plato cumpla con las altas expectativas de nuestros visitantes.
            </p>
            <a 
              href="/reservas" 
              className="btn text-uppercase px-4 py-2 fw-semibold rounded-0 text-white bg-dark shadow-sm" 
              style={{ letterSpacing: '1px', transition: '0.3s' }}
            >
              Reservar tu mesa →
            </a>
          </div>
        </div>

        {/* SECCIÓN: Tarjetas Reducidas a la Mitad (Ancho col-lg-4 y centradas) */}
        <div className="row g-4 mt-5 justify-content-center">
          
          {/* Tarjeta 1: Conoce nuestra carta */}
          <div className="col-lg-4 col-md-6">
            <div className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#f5f0e6', border: '1px solid #e6dec9', minHeight: '240px' }}>
              <div>
                <h4 className="fw-bold mb-3 fs-5" style={{ color: '#4a3b32', fontFamily: 'serif' }}>Conoce nuestra carta</h4>
                <p className="small mb-4" style={{ color: '#665c54', lineHeight: '1.5', fontSize: '0.85rem' }}>
                  Disfrute del sabor y aromas de la tradicional alta cocina en un ambiente cálido y estimulante.
                </p>
              </div>
              <div>
                <a 
                  href="/menu" 
                  className="btn btn-sm text-uppercase px-3 py-1 fw-semibold rounded-0" 
                  style={{ backgroundColor: 'transparent', border: '1px solid #4a3b32', color: '#4a3b32', letterSpacing: '1px', fontSize: '0.75rem' }}
                >
                  Ver la carta
                </a>
              </div>
            </div>
          </div>

          {/* Tarjeta 2: Reservas en local */}
          <div className="col-lg-4 col-md-6">
            <div className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#f5f0e6', border: '1px solid #e6dec9', minHeight: '240px' }}>
              <div>
                <h4 className="fw-bold mb-3 fs-5" style={{ color: '#4a3b32', fontFamily: 'serif' }}>Reservas en local</h4>
                
                <ul className="list-unstyled small mb-4" style={{ color: '#665c54' }}>
                  <li className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10" style={{ fontSize: '0.8rem' }}>
                    <span>Lunes - Sábado</span> 
                    <span className="fw-semibold text-dark">12:30pm - 3:30pm</span>
                  </li>
                  <li className="d-flex justify-content-between py-1 border-bottom border-secondary border-opacity-10" style={{ fontSize: '0.8rem' }}>
                    <span>Lunes - Sábado</span> 
                    <span className="fw-semibold text-dark">6:30pm - 11:00pm</span>
                  </li>
                  <li className="d-flex justify-content-between py-1" style={{ fontSize: '0.8rem' }}>
                    <span>Domingo</span> 
                    <span className="fw-semibold text-dark">12:30pm - 5:00pm</span>
                  </li>
                </ul>
              </div>

              <div>
                <a 
                  href="/reservas" 
                  className="btn btn-sm text-uppercase px-3 py-1 fw-semibold rounded-0" 
                  style={{ backgroundColor: 'transparent', border: '1px solid #4a3b32', color: '#4a3b32', letterSpacing: '1px', fontSize: '0.75rem' }}
                >
                  Reservar tu mesa
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
  );
}