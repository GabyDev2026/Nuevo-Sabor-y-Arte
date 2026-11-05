import React from 'react';
import { RESERVA } from '../datos/colores';

export default function SelectorHoras({ horas, horaElegida, alElegir }) {
  if (horas.length === 0) {
    return (
      <p className="mb-0" style={{ color: RESERVA.textoSuave }}>
        No hay horarios disponibles para este día. Prueba con otra fecha.
      </p>
    );
  }

  return (
    <div className="d-flex flex-wrap gap-2" role="group" aria-label="Horas disponibles">
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
            className={`btn px-3 ${elegida ? 'btn-warning' : 'btn-outline-light'}`}
            style={{
              transition: 'all 0.2s',
              textDecoration: h.disponible ? 'none' : 'line-through',
            }}
          >
            {h.hora}
          </button>
        );
      })}
    </div>
  );
}