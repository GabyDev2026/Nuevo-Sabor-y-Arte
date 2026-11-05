import React from 'react';
import TarjetaDato from './TarjetaDato';
import { DURACION_RESERVA_MIN } from '../../datos/config';
import { aMinutos, fechaLarga, fechaLocalISO } from '../../utilidades/fechas';
import { nombreDeMesa, reservasDelDia } from '../../utilidades/reservas';

const CLASE_ESTADO = {
  'Próxima': 'bg-warning text-dark',
  'En curso': 'bg-success',
  'Finalizada': 'bg-secondary',
};

export default function PanelResumen({ reservas, mesas, platos, ahora, irA }) {
  const hoy = fechaLocalISO(ahora);
  const delDia = reservasDelDia(reservas, hoy).sort((a, b) => a.hora.localeCompare(b.hora));
  const minutosAhora = ahora.getHours() * 60 + ahora.getMinutes();

  const estadoDe = (r) => {
    const inicio = aMinutos(r.hora);
    if (minutosAhora < inicio) return 'Próxima';
    if (minutosAhora < inicio + DURACION_RESERVA_MIN) return 'En curso';
    return 'Finalizada';
  };

  const enCurso = delDia.filter((r) => estadoDe(r) === 'En curso').length;
  const mesasActivas = mesas.filter((m) => m.activa).length;
  const personasHoy = delDia.reduce((suma, r) => suma + r.personas, 0);
  const platosVisibles = platos.filter((p) => p.visible !== false).length;

  return (
    <div>
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <TarjetaDato titulo="Reservas de hoy" valor={delDia.length} detalle={fechaLarga(hoy)} />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato titulo="Personas esperadas" valor={personasHoy} detalle="Hoy" />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato
            titulo="Mesas libres ahora"
            valor={Math.max(0, mesasActivas - enCurso)}
            detalle={`de ${mesasActivas} mesas activas`}
          />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato
            titulo="Platos en la web"
            valor={platosVisibles}
            detalle={`de ${platos.length} en total`}
          />
        </div>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="fw-bold mb-0">Reservas de hoy</h5>
          <button type="button" className="btn btn-outline-dark btn-sm" onClick={() => irA('reservas')}>
            Ver todas las reservas
          </button>
        </div>

        {delDia.length === 0 ? (
          <div className="alert alert-light border mb-0">No hay reservas para hoy.</div>
        ) : (
          <div className="table-responsive">
            <table className="table align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Hora</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Personas</th>
                  <th scope="col">Mesa</th>
                  <th scope="col">Estado</th>
                </tr>
              </thead>
              <tbody>
                {delDia.map((r) => (
                  <tr key={r.id}>
                    <td className="fw-semibold">{r.hora}</td>
                    <td>{r.cliente}</td>
                    <td>{r.personas}</td>
                    <td>{nombreDeMesa(mesas, r.mesaId)}</td>
                    <td>
                      <span className={`badge ${CLASE_ESTADO[estadoDe(r)]}`}>{estadoDe(r)}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}