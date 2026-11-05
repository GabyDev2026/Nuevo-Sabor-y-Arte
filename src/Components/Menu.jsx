import React from 'react';
import { Link } from 'react-router-dom';
import EncabezadoSeccion from './EncabezadoSeccion';
import { COLORES } from '../datos/colores';
import cartaSaborYArte from '../docs/Menú de Sabor & Arte.pdf';

export default function Menu() {
  return (
    <div style={{ backgroundColor: COLORES.crema, minHeight: '100vh' }}>
      <div className="container py-5">

        <EncabezadoSeccion
          etiqueta="Sabor & Arte · Lima"
          titulo="Nuestra carta"
          descripcion="Descubre nuestra propuesta gastronómica, mediante una experiencia única."
        />

        {/* VISOR DEL PDF */}
        <div className="card border-0 shadow-sm p-4 mx-auto" style={{ maxWidth: '1000px', borderRadius: '20px' }}>
          <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
            <a href={cartaSaborYArte} target="_blank" rel="noreferrer" className="btn btn-dark rounded-pill px-4 fw-semibold">
              ABRIR CARTA
            </a>
            <a href={cartaSaborYArte} download="Carta-Sabor-y-Arte.pdf" className="btn btn-outline-dark rounded-pill px-4 fw-semibold">
              DESCARGAR PDF
            </a>
          </div>

          <iframe
            src={cartaSaborYArte}
            title="Carta Sabor & Arte"
            className="w-100 rounded-4 border"
            style={{ height: '75vh', minHeight: '480px' }}
          />
        </div>

        {/* LLAMADO A RESERVAR */}
        <div className="text-center pt-5 mt-4">
          <span className="text-uppercase fw-semibold text-secondary small" style={{ letterSpacing: '2px' }}>
            ¿Listo para vivir Sabor & Arte?
          </span>
          <h2 className="fw-bold my-3">Elige tu experiencia y reserva tu mesa</h2>
          <Link
            to="/reservas"
            className="btn rounded-pill px-5 py-3 fw-bold shadow-sm mt-2"
            style={{ backgroundColor: COLORES.negro, color: '#ffc107', border: '1px solid #ffc107' }}
          >
            RESERVAR MESA
          </Link>
        </div>

      </div>
    </div>
  );
}