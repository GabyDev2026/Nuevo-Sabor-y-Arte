import React from 'react';
import { COLORES, RESERVA } from '../datos/colores';

export default function PasosReserva({ pasos, paso, puedeIr, alIr }) {
  if (!pasos || pasos.length === 0) return null;

  const total = pasos.length;
  const terminada = paso > total;
  const posicion = Math.min(paso, total);
  const porcentaje = terminada ? 100 : (posicion / total) * 100;
  const pasoActual = pasos[posicion - 1];

  return (
    <div className="container pt-5">
      <nav
        aria-label="Pasos de la reserva"
        className="bg-white rounded-4 shadow-sm p-3 p-md-4 mx-auto"
        style={{ maxWidth: '960px' }}
      >

        {/* TEXTO: EN QUÉ PASO VAS */}
        <div className="d-flex justify-content-between align-items-baseline mb-3">
          <span className="small text-secondary">
            {terminada ? 'Reserva completada' : `Paso ${posicion} de ${total}`}
          </span>
          {!terminada && <span className="fw-bold">{pasoActual.nombre}</span>}
        </div>

        {/* CÍRCULOS */}
        <ol className="list-unstyled d-flex justify-content-between m-0 p-0">
          {pasos.map((p, i) => {
            const numero = i + 1;
            const actual = numero === paso;
            const hecho = numero < paso;

            let fondo = '#fff';
            let colorTexto = '#6c757d';
            let borde = '#ced4da';
            if (actual) {
              fondo = RESERVA.acento;
              colorTexto = COLORES.negro;
              borde = RESERVA.acento;
            } else if (hecho) {
              fondo = COLORES.negro;
              colorTexto = RESERVA.acento;
              borde = COLORES.negro;
            }

            return (
              <li key={p.nombre} className="text-center flex-fill" aria-current={actual ? 'step' : undefined}>
                <button
                  type="button"
                  disabled={actual || !puedeIr(numero)}
                  onClick={() => alIr(numero)}
                  aria-label={`${p.nombre}${hecho ? ' (completado)' : actual ? ' (paso actual)' : ''}`}
                  className="btn border-0 p-1 d-inline-flex flex-column align-items-center"
                  style={{ background: 'transparent', opacity: 1 }}
                >
                  <span
                    className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
                    style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: fondo,
                      color: colorTexto,
                      border: `2px solid ${borde}`,
                      boxShadow: actual ? '0 0 0 4px rgba(255, 193, 7, 0.35)' : 'none',
                      transition: 'all 0.3s',
                    }}
                  >
                    {hecho ? '✓' : numero}
                  </span>
                  <span
                    className={`small mt-1 ${actual ? 'fw-bold' : 'd-none d-sm-inline'}`}
                    style={{ color: actual ? COLORES.negro : '#6c757d' }}
                  >
                    {p.nombre}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* BARRA DE PROGRESO */}
        <div
          className="progress mt-3"
          style={{ height: '6px' }}
          role="progressbar"
          aria-label="Progreso de la reserva"
          aria-valuenow={Math.round(porcentaje)}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          <div
            className="progress-bar"
            style={{
              width: `${porcentaje}%`,
              backgroundColor: RESERVA.acento,
              transition: 'width 0.4s ease',
            }}
          ></div>
        </div>

      </nav>
    </div>
  );
}