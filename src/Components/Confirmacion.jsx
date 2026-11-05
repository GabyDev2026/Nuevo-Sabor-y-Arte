import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ResumenReserva from './ResumenReserva';
import { COLORES } from '../datos/colores';

export default function Confirmacion({ reserva, mesa, alReiniciar }) {
  const [visible, setVisible] = useState(false);

  // Pequeña animación de entrada
  useEffect(() => {
    const temporizador = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <div
      className="card border-0 shadow-sm p-4 p-md-5 text-center mx-auto"
      style={{
        maxWidth: '560px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'all 0.5s ease',
      }}
    >
      <div
        className="rounded-circle mx-auto d-flex align-items-center justify-content-center mb-3"
        style={{
          width: '72px',
          height: '72px',
          backgroundColor: COLORES.negro,
          color: COLORES.doradoClaro,
          fontSize: '2rem',
        }}
      >
        ✓
      </div>

      <h2 className="fw-bold">¡Reserva confirmada!</h2>
      <p className="text-secondary">
        Reserva N.º {reserva.id}. Te esperamos, {reserva.cliente}.
      </p>

      <div className="text-start my-3">
        <ResumenReserva
          fecha={reserva.fecha}
          hora={reserva.hora}
          personas={reserva.personas}
          mesa={mesa}
        />
      </div>

      <p className="small text-secondary">
        Garantía simulada con la tarjeta terminada en {reserva.tarjeta}. Guarda tu número de reserva.
      </p>

      <div className="d-flex flex-column flex-sm-row gap-2 justify-content-center">
        <button type="button" className="btn btn-outline-dark" onClick={alReiniciar}>
          Hacer otra reserva
        </button>
        <Link to="/" className="btn btn-dark">
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}