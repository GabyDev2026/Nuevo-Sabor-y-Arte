import React from 'react';
import { COLORES } from '../../datos/colores';

export default function TarjetaDato({ titulo, valor, detalle }) {
  return (
    <div
      className="card border-0 shadow-sm p-3 h-100"
      style={{ borderLeft: `4px solid ${COLORES.doradoClaro}` }}
    >
      <small className="text-uppercase text-secondary fw-semibold">{titulo}</small>
      <div className="fs-2 fw-bold">{valor}</div>
      {detalle && <small className="text-secondary">{detalle}</small>}
    </div>
  );
}