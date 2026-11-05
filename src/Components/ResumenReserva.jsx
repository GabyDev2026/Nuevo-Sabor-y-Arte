import React from 'react';
import { fechaLarga } from '../utilidades/fechas';

export default function ResumenReserva({ fecha, hora, personas, mesa }) {
  const filas = [
    ['Día', fecha ? fechaLarga(fecha) : '—'],
    ['Hora', hora || '—'],
    ['Personas', personas],
    ['Mesa', mesa ? `${mesa.nombre} (${mesa.capacidad} personas)` : '—'],
  ];

  return (
    <ul className="list-unstyled mb-0 small">
      {filas.map(([titulo, valor]) => (
        <li key={titulo} className="d-flex justify-content-between gap-3 py-2 border-bottom">
          <span className="text-secondary">{titulo}</span>
          <span className="fw-semibold text-end">{valor}</span>
        </li>
      ))}
    </ul>
  );
}