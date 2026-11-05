import React from 'react';
import { resumirHorarios } from '../utilidades/reservas';

export default function HorarioAtencion({ horarios, className = '' }) {
  return (
    <ul className={`list-unstyled ${className}`}>
      {resumirHorarios(horarios).map((g) => (
        <li
          key={g.dias}
          className="d-flex justify-content-between gap-3 py-1 border-bottom border-secondary border-opacity-25"
        >
          <span>{g.dias}</span>
          <span className="fw-semibold">{g.horas}</span>
        </li>
      ))}
    </ul>
  );
}