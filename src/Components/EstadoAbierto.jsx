import React, { useState, useEffect } from 'react';
import { estaAbierto } from '../utilidades/reservas';

export default function EstadoAbierto({ horarios }) {
  const [ahora, setAhora] = useState(new Date());

  // Se actualiza solo cada 30 segundos
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 30000);
    return () => clearInterval(reloj);
  }, []);

  const abierto = estaAbierto(horarios, ahora);

  return (
    <span className={`badge rounded-pill ${abierto ? 'bg-success' : 'bg-danger'}`} role="status">
      {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
    </span>
  );
}