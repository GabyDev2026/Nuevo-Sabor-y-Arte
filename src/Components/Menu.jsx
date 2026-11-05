import React from 'react';
import { Link } from 'react-router-dom';
import cartaSaborYArte from '../docs/Menú de Sabor & Arte.pdf';

export default function Menu() {
  return (
    <div className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between" style={{ backgroundColor: '#f5f2eb', paddingTop: '100px' }}>
      <div className="container py-4"></div>
      
      {/* =========================
          ENCABEZADO
      ========================= */}
      <section className="text-center py-5">
        <div className="container">
          <span className="text-uppercase fw-semibold" style={{ color: '#b8973b', letterSpacing: '3px', fontSize: '1rem' }}>
            SABOR & ARTE · LIMA
          </span>
          <h1 className="fw-bold mt-2 text-dark" style={{ letterSpacing: '1px', fontSize: '2.2rem' }}>
            NUESTRA CARTA
          </h1>
          <p className="text-secondary mx-auto mt-3" style={{ maxWidth: '650px', fontSize: '1rem', lineHeight: '1.7' }}>
            Descubre nuestra propuesta gastronómica, mediante una experiencia unica.
          </p>
        </div>
      </section>

      {/* =========================
          VISOR Y ACCIONES DE PDF
      ========================= */}
      <section className="container my-4 flex-grow-1">
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
                border: '1px solid #e2dfb4',
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
                color: '#111112', 
                border: '1px solid #d6c41c',
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
          CIERRE / LLAMADO A LA ACCIÓN
      ========================= */}
      <section className="text-center py-5 mt-auto text-dark">
        <div className="container">
          <span className="text-uppercase fw-semibold text-secondary" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
            ¿LISTO PARA VIVIR SABOR & ARTE?
          </span>
          <h2 className="fw-bold my-3 text-dark" style={{ fontSize: '1.8rem' }}>
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