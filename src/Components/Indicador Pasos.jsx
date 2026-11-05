import React from 'react';
import { COLORES } from '../datos/colores';

export default function IndicadorPasos({ paso, etiquetas }) {
  return (
    <ol className="list-unstyled d-flex justify-content-between mx-auto mb-5" style={{ maxWidth: '640px' }}>
      {etiquetas.map((etiqueta, i) => {
        const numero = i + 1;
        const hecho = numero < paso;
        const actual = numero === paso;
        const activo = hecho || actual;

        return (
          <li key={etiqueta} className="text-center flex-fill" aria-current={actual ? 'step' : undefined}>
            <div
              className="rounded-circle d-inline-flex align-items-center justify-content-center fw-bold"
              style={{
                width: '36px',
                height: '36px',
                backgroundColor: activo ? COLORES.negro : '#e9e4d8',
                color: activo ? COLORES.doradoClaro : '#6c757d',
                border: actual ? `2px solid ${COLORES.doradoClaro}` : '2px solid transparent',
                transition: 'all 0.3s',
              }}
            >
              {hecho ? '✓' : numero}
            </div>
            <div className={`small mt-1 ${actual ? 'fw-bold text-dark' : 'text-secondary'}`}>{etiqueta}</div>
          </li>
        );
      })}
    </ol>
  );
}