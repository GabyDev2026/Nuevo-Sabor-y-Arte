import React from 'react';
import { COLORES } from '../datos/colores';

export default function EncabezadoSeccion({ etiqueta, titulo, descripcion }) {
  return (
    <div className="text-center mb-5">
      <span
        className="text-uppercase small fw-semibold"
        style={{ color: COLORES.dorado, letterSpacing: '3px' }}
      >
        {etiqueta}
      </span>
      <h1 className="fw-bold display-6 mt-2 text-dark">{titulo}</h1>
      {descripcion && (
        <p className="mx-auto mt-3 text-secondary" style={{ maxWidth: '650px' }}>
          {descripcion}
        </p>
      )}
    </div>
  );
}