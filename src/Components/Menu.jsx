import React from 'react';
import { Link } from 'react-router-dom';
import cartaSaborYArte from '../docs/Menú de Sabor & Arte.pdf';

export default function Menu() {
  return (
    <div className="text-dark min-vh-100 d-flex flex-column bg-white" style={{ paddingTop: '80px' }}>
      
      {/* =========================
          ENCABEZADO (Con fondo sutil crema/marfil)
      ========================= */}
      <section className="text-center py-5" style={{ backgroundColor: '#e7d1a4', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <span className="text-uppercase fw-semibold" style={{ color: '#b89728', letterSpacing: '4px', fontSize: '0.85rem' }}>
            SABOR & ARTE · LIMA
          </span>
          <h1 className="fw-bold display-4 mt-2 text-dark" style={{ fontFamily: 'serif', letterSpacing: '1px' }}>
            NUESTRA CARTA
          </h1>
          <p className="text-secondary mx-auto mt-3" style={{ maxWidth: '650px', fontSize: '1.1rem', lineHeight: '1.6' }}>
            Descubre nuestra propuesta gastronómica, inspirada en el territorio y los ingredientes del Perú.
          </p>
        </div>
      </section>

      {/* =========================
          VISOR Y ACCIONES DE PDF
      ========================= */}
      <section className="container my-5 flex-grow-1">
        <div className="card border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1005px', borderRadius: '20px', backgroundColor: '#ffffff', border: '1px solid #eaeaea' }}>
          
          {/* Botones de acción */}
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            
            {/* Botón 1: Sólido oscuro */}
            <a
              href={cartaSaborYArte}
              target="_blank"
              rel="noreferrer"
              className="btn rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{ 
                backgroundColor: '#121212', 
                color: '#ffffff', 
                border: '1px solid #121212',
                fontSize: '13px',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
            >
              ABRIR CARTA
            </a>

            {/* Botón 2: Contorno con borde y texto dorado */}
            <a
              href={cartaSaborYArte}
              download="Carta-Sabor-y-Arte.pdf"
              className="btn rounded-pill px-4 py-2 fw-semibold shadow-sm"
              style={{ 
                backgroundColor: 'transparent', 
                color: '#b89728', 
                border: '1px solid #b89728',
                fontSize: '13px',
                letterSpacing: '1px',
                transition: 'all 0.3s'
              }}
            >
              DESCARGAR PDF
            </a>
          </div>

          {/* Visor Iframe */}
          <div className="ratio ratio-16x9 shadow-sm rounded-4 overflow-hidden border border-secondary-subtle" style={{ minHeight: '680px' }}>
            <iframe
              src={cartaSaborYArte}
              title="Carta Sabor & Arte"
              className="w-100 h-100"
              style={{ border: 'none' }}
            />
          </div>

        </div>
      </section>

      {/* =========================
          CIERRE / LLAMADO A LA ACCIÓN (Con el mismo fondo sutil)
      ========================= */}
      <section className="text-center py-5 mt-auto text-dark" style={{ backgroundColor: '#e6cc99', borderTop: '1px solid #eee' }}>
        <div className="container">
          <span className="text-uppercase fw-semibold" style={{ color: '#121111', letterSpacing: '2px', fontSize: '0.85rem' }}>
            ¿LISTO PARA VIVIR SABOR & ARTE?
          </span>
          <h2 className="fw-bold my-3 text-dark" style={{ fontSize: '1.8rem', fontFamily: 'serif' }}>
            ELIGE TU EXPERIENCIA Y RESERVA TU MESA
          </h2>
          <div className="mt-4">
            <Link
              to="/reservas"
              className="btn rounded-pill px-5 py-3 fw-bold shadow-sm"
              style={{ 
                backgroundColor: '#121212', 
                color: '#ffc107', 
                border: '1px solid #ffc107',
                letterSpacing: '1px'
              }}
            >
              RESERVAR MESA
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}