import React from 'react';
import { COLORES } from '../datos/colores';

export default function SelectorHoras({ horas, horaElegida, alElegir }) {
  if (horas.length === 0) {
    return (
      <div className="alert alert-light border small mb-0">
        No hay horarios disponibles para este día.
      </div>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-2">
      {horas.map((h) => {
        const elegida = h.hora === horaElegida;
        return (
          <button
            key={h.hora}
            type="button"
            disabled={!h.disponible}
            aria-pressed={elegida}
            title={h.disponible ? '' : 'Sin mesas disponibles'}
            onClick={() => alElegir(h.hora)}
            className={`btn btn-sm px-3 ${elegida ? 'btn-dark' : 'btn-outline-dark'}`}
            style={{ color: elegida ? COLORES.doradoClaro : undefined, transition: 'all 0.2s' }}
          >
            {h.hora}
          </button>
        );
      })}
    </div>
  );
}