import React from 'react';
import { Link } from 'react-router-dom';
import { COLORES, RESERVA } from '../datos/colores';

export default function SelectorPersonas({ maximo, elegidas, alElegir }) {
  const visibles = Math.min(maximo, 8);
  const numeros = Array.from({ length: visibles }, (_, i) => i + 1);

  const estiloCirculo = (activo) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: `2px solid ${RESERVA.acento}`,
    backgroundColor: activo ? RESERVA.acento : 'transparent',
    color: activo ? COLORES.negro : '#fff',
    fontWeight: 600,
    transition: 'all 0.2s',
  });

  return (
    <div>
      <div
        className="d-flex flex-wrap justify-content-center gap-3 my-4"
        role="group"
        aria-label="Cantidad de personas"
      >
        {numeros.map((n) => (
          <button
            key={n}
            type="button"
            aria-pressed={n === elegidas}
            aria-label={`${n} ${n === 1 ? 'persona' : 'personas'}`}
            className="btn p-0 d-flex align-items-center justify-content-center"
            style={estiloCirculo(n === elegidas)}
            onClick={() => alElegir(n)}
          >
            {n}
          </button>
        ))}

        <Link
          to="/contacto"
          aria-label="Más personas: escríbenos"
          className="btn p-0 d-flex align-items-center justify-content-center"
          style={estiloCirculo(false)}
        >
          +
        </Link>
      </div>

      <p className="text-center small mb-0" style={{ color: RESERVA.textoSuave }}>
        Para reservas de más de {visibles} personas, escríbenos desde Contacto o llámanos al
        +51 987 654 321.
      </p>
    </div>
  );
}