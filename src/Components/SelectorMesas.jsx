import React from 'react';
import { COLORES, RESERVA } from '../datos/colores';

const TEXTO_ESTADO = {
  libre: 'Disponible',
  ocupada: 'Ocupada',
  pequena: 'Muy pequeña',
};

const COLOR_ESTADO = {
  libre: '#7ee2a8',
  ocupada: '#ff9aa2',
  pequena: 'rgba(255, 255, 255, 0.55)',
};

export default function SelectorMesas({ mesas, mesaElegida, alElegir }) {
  const hayLibres = mesas.some((m) => m.estado === 'libre');

  return (
    <div>
      <div className="d-flex flex-wrap gap-3 small mb-3">
        <span style={{ color: COLOR_ESTADO.libre }}>● Disponible</span>
        <span style={{ color: COLOR_ESTADO.ocupada }}>● Ocupada</span>
        <span style={{ color: COLOR_ESTADO.pequena }}>● No alcanza para tus personas</span>
      </div>

      {!hayLibres && (
        <div className="alert alert-warning">
          No quedan mesas para esa hora. Vuelve atrás y prueba con otra hora.
        </div>
      )}

      <div className="row g-3">
        {mesas.map((mesa) => {
          const libre = mesa.estado === 'libre';
          const elegida = mesa.id === mesaElegida;

          return (
            <div className="col-6 col-md-4" key={mesa.id}>
              <button
                type="button"
                disabled={!libre}
                aria-pressed={elegida}
                onClick={() => alElegir(mesa.id)}
                className="btn w-100 py-3"
                style={{
                  border: `2px solid ${elegida ? RESERVA.acento : COLOR_ESTADO[mesa.estado]}`,
                  backgroundColor: elegida ? RESERVA.acento : 'transparent',
                  color: elegida ? COLORES.negro : '#fff',
                  transition: 'all 0.2s',
                }}
              >
                <div className="fw-bold">{mesa.nombre}</div>
                <small className="d-block">{mesa.capacidad} personas</small>
                <small
                  className="d-block"
                  style={{ color: elegida ? COLORES.negro : COLOR_ESTADO[mesa.estado] }}
                >
                  {elegida ? 'Elegida ✓' : TEXTO_ESTADO[mesa.estado]}
                </small>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}