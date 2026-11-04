import React from 'react';

export default function Footer() {
  return (
    <footer className="text-light pt-5 border-top border-secondary border-opacity-25" style={{ backgroundColor: '#121417' }}>
      <div className="container py-4">
        <div className="row g-4 justify-content-between">
          
          {/* Columna 1: Marca y Redes Sociales */}
          <div className="col-lg-3 col-md-6">
            <h5 className="text-uppercase fw-bold mb-2" style={{ color: '#d4af37', letterSpacing: '1px' }}>Sabor & Arte</h5>
            <p className="small mb-3" style={{ color: '#cbd5e1' }}>RESTAURANTE GOURMET</p>
            <div className="d-flex gap-3 fs-5">
              <a href="#instagram" className="text-light hover-gold text-decoration-none">Iconos</a>
              <a href="#facebook" className="text-light hover-gold text-decoration-none">Iconos</a>
            </div>
          </div> 

          {/* Columna 2 */}
          <div className="col-lg-4 col-md-6">
            <h5 className="small fw-bold mb-3" style={{ color: '#d4af37', letterSpacing: '0.5px' }}>Visítanos</h5>
            <p className="small mb-3" style={{ color: '#cbd5e1' }}>📍 Av. Los Olivos 123, Lima</p>
            <ul className="list-unstyled small mb-0" style={{ color: '#e2e8f0' }}>
              <li className="py-1 border-bottom border-secondary border-opacity-25">
                <span className="text-white fw-semibold">Lunes - Sábado:</span> <span className="ms-2" style={{ color: '#cbd5e1' }}>12:30pm - 3:30pm</span>
              </li>
              <li className="py-1 border-bottom border-secondary border-opacity-25">
                <span className="text-white fw-semibold">Lunes - Sábado:</span> <span className="ms-2" style={{ color: '#cbd5e1' }}>6:30pm - 11:00pm</span>
              </li>
              <li className="py-1">
                <span className="text-white fw-semibold">Domingo:</span> <span className="ms-2" style={{ color: '#cbd5e1' }}>12:30pm - 5:00pm</span>
              </li>
            </ul>
          </div>

          {/* Columna 3: Nosotros / Enlaces */}
          <div className="col-lg-2 col-md-6">
            <h5 className="small fw-bold mb-3" style={{ color: '#d4af37', letterSpacing: '0.5px' }}>Nosotros</h5>
            <ul className="list-unstyled small mb-0">
              <li className="mb-2"><a href="/menu" className="text-decoration-none hover-gold" style={{ color: '#cbd5e1' }}>Nuestra carta</a></li>
              <li className="mb-2"><a href="/nosotros" className="text-decoration-none hover-gold" style={{ color: '#cbd5e1' }}>Nosotros</a></li>
              <li className="mb-2"><a href="/contacto" className="text-decoration-none hover-gold" style={{ color: '#cbd5e1' }}>Contacto</a></li>
              <li className="mb-0"><a href="/reservas" className="text-decoration-none hover-gold" style={{ color: '#cbd5e1' }}>Reservas</a></li>
            </ul>
          </div>

          {/* Columna 4: Contáctenos */}
          <div className="col-lg-3 col-md-6">
            <h5 className="small fw-bold mb-3" style={{ color: '#d4af37', letterSpacing: '0.5px' }}>Contáctenos</h5>
            <div className="small">
              <p className="mb-1 fw-bold fs-6" style={{ color: '#f8f9fa' }}>01 421 8549</p>
              <p className="mb-1 fw-bold fs-6" style={{ color: '#f8f9fa' }}>996 279 457</p>
              <p className="mb-0 fw-bold fs-6" style={{ color: '#f8f9fa' }}>995 740 880</p>
            </div>
          </div>

        </div> 
      </div>
      <div className="text-center py-3 border-top border-secondary border-opacity-10 small" style={{ backgroundColor: '#121417', color: '#cbd5e1' }}>
        &copy; 2026 Sabor & Arte. Todos los derechos reservados.
      </div>
    </footer>
  );
}