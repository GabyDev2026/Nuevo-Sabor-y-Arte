import React, { useState } from 'react';
import { DURACION_RESERVA_MIN } from '../../datos/config';
import { aMinutos } from '../../utilidades/fechas';

export default function PanelHorarios({ horarios, setHorarios, avisar }) {
  const [borrador, setBorrador] = useState(horarios);
  const [error, setError] = useState('');

  const hayCambios = JSON.stringify(borrador) !== JSON.stringify(horarios);

  const cambiar = (dia, campo, valor) => {
    setBorrador(borrador.map((h) => (h.dia === dia ? { ...h, [campo]: valor } : h)));
  };

  // Aplica el horario del lunes a todos los días
  const copiarLunes = () => {
    const base = borrador.find((h) => h.dia === 1);
    setBorrador(
      borrador.map((h) => ({ ...h, abierto: base.abierto, apertura: base.apertura, cierre: base.cierre }))
    );
  };

  const descartar = () => {
    setBorrador(horarios);
    setError('');
  };

  const guardar = (e) => {
    e.preventDefault();

    const invalido = borrador.find(
      (h) =>
        h.abierto &&
        (!h.apertura || !h.cierre || aMinutos(h.cierre) - aMinutos(h.apertura) < DURACION_RESERVA_MIN)
    );

    if (invalido) {
      setError(
        `${invalido.nombre}: define la apertura y el cierre, con al menos ${DURACION_RESERVA_MIN / 60} horas de diferencia (lo que dura una reserva).`
      );
      return;
    }

    setError('');
    setHorarios(borrador);
    avisar('Horarios guardados');
  };

  return (
    <form onSubmit={guardar}>
      <p className="text-secondary">
        Estos horarios controlan los días y las horas que los clientes pueden reservar y el
        indicador de "Abierto ahora". Las reservas ya hechas no cambian.
      </p>

      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

      <div className="card border-0 shadow-sm p-3">
        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th scope="col">Día</th>
                <th scope="col">Atención</th>
                <th scope="col">Apertura</th>
                <th scope="col">Cierre</th>
              </tr>
            </thead>
            <tbody>
              {borrador.map((h) => (
                <tr key={h.dia}>
                  <td className="fw-semibold">{h.nombre}</td>
                  <td>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        id={`abre-${h.dia}`}
                        checked={h.abierto}
                        onChange={(e) => cambiar(h.dia, 'abierto', e.target.checked)}
                      />
                      <label className="form-check-label" htmlFor={`abre-${h.dia}`}>
                        {h.abierto ? 'Abierto' : 'Cerrado'}
                      </label>
                    </div>
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control form-control-sm"
                      style={{ maxWidth: '140px' }}
                      aria-label={`Hora de apertura del ${h.nombre}`}
                      value={h.apertura}
                      disabled={!h.abierto}
                      onChange={(e) => cambiar(h.dia, 'apertura', e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="time"
                      className="form-control form-control-sm"
                      style={{ maxWidth: '140px' }}
                      aria-label={`Hora de cierre del ${h.nombre}`}
                      value={h.cierre}
                      disabled={!h.abierto}
                      onChange={(e) => cambiar(h.dia, 'cierre', e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-3">
        <button type="submit" className="btn btn-dark" disabled={!hayCambios}>
          Guardar cambios
        </button>
        <button type="button" className="btn btn-outline-secondary" onClick={descartar} disabled={!hayCambios}>
          Descartar cambios
        </button>
        <button type="button" className="btn btn-outline-dark ms-md-auto" onClick={copiarLunes}>
         horario del lunes a domingo
        </button>
      </div>
    </form>
  );
}