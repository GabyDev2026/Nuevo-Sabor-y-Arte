import React from 'react';
import { COLORES } from '../datos/colores';

const TEXTO_ESTADO = {
  libre: 'Disponible',
  ocupada: 'Ocupada',
  pequena: 'Muy pequeña',
};

const CLASE_ESTADO = {
  libre: 'btn-outline-success',
  ocupada: 'btn-outline-danger',
  pequena: 'btn-outline-secondary',
};

export default function SelectorMesas({ mesas, mesaElegida, alElegir }) {
  const hayLibres = mesas.some((m) => m.estado === 'libre');

  return (
    <div>
      <div className="d-flex flex-wrap gap-3 small mb-3">
        <span className="text-success">● Disponible</span>
        <span className="text-danger">● Ocupada</span>
        <span className="text-secondary">● No alcanza para tus personas</span>
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
            <div className="col-6 col-md-4 col-lg-3" key={mesa.id}>
              <button
                type="button"
                disabled={!libre}
                aria-pressed={elegida}
                onClick={() => alElegir(mesa.id)}
                className={`btn w-100 py-3 ${elegida ? 'btn-dark' : CLASE_ESTADO[mesa.estado]}`}
                style={{ color: elegida ? COLORES.doradoClaro : undefined, transition: 'all 0.2s' }}
              >
                <div className="fw-bold">{mesa.nombre}</div>
                <small className="d-block">{mesa.capacidad} personas</small>
                <small className="d-block">{elegida ? 'Elegida ✓' : TEXTO_ESTADO[mesa.estado]}</small>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}