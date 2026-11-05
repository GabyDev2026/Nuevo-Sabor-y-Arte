import React, { useState } from 'react';
import TarjetaDato from './TarjetaDato';
import { COLORES } from '../../datos/colores';
import { diaSemana, fechaLocalISO } from '../../utilidades/fechas';

const NOMBRES_DIAS = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
const ORDEN_DIAS = [1, 2, 3, 4, 5, 6, 0]; // la semana empieza el lunes

function fechaDesdeHoy(dias) {
  const fecha = new Date();
  fecha.setDate(fecha.getDate() + dias);
  return fechaLocalISO(fecha);
}

// Lista de barras horizontales
function Barras({ titulo, datos }) {
  const maximo = Math.max(1, ...datos.map((d) => d.valor));

  return (
    <div className="card border-0 shadow-sm p-3 h-100">
      <h6 className="fw-bold mb-3">{titulo}</h6>

      {datos.length === 0 && <p className="text-secondary small mb-0">Sin datos en este periodo.</p>}

      {datos.map((d) => (
        <div key={d.etiqueta} className="d-flex align-items-center gap-2 mb-2">
          <span className="small text-secondary flex-shrink-0" style={{ width: '90px' }}>
            {d.etiqueta}
          </span>
          <div className="progress flex-grow-1" style={{ height: '20px' }}>
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={d.valor}
              aria-valuemin="0"
              aria-valuemax={maximo}
              style={{
                width: `${(d.valor / maximo) * 100}%`,
                backgroundColor: COLORES.dorado,
                transition: 'width 0.6s ease',
              }}
            >
              {d.valor > 0 ? d.valor : ''}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PanelReportes({ reservas, mesas }) {
  const [desde, setDesde] = useState(fechaDesdeHoy(-30));
  const [hasta, setHasta] = useState(fechaDesdeHoy(30));

  const enRango = reservas.filter((r) => r.fecha >= desde && r.fecha <= hasta);
  const activas = enRango.filter((r) => r.estado !== 'cancelada');
  const canceladas = enRango.length - activas.length;
  const personas = activas.reduce((suma, r) => suma + r.personas, 0);
  const tasaCancelacion = enRango.length === 0 ? 0 : Math.round((canceladas / enRango.length) * 100);

  // Reservas por mesa, de la más usada a la menos usada
  const porMesa = mesas
    .map((m) => ({ etiqueta: m.nombre, valor: activas.filter((r) => r.mesaId === m.id).length }))
    .sort((a, b) => b.valor - a.valor);

  // Reservas por hora
  const conteoHoras = {};
  activas.forEach((r) => {
    conteoHoras[r.hora] = (conteoHoras[r.hora] || 0) + 1;
  });
  const porHora = Object.keys(conteoHoras)
    .sort()
    .map((h) => ({ etiqueta: h, valor: conteoHoras[h] }));

  // Reservas por día de la semana
  const porDia = ORDEN_DIAS.map((d) => ({
    etiqueta: NOMBRES_DIAS[d],
    valor: activas.filter((r) => diaSemana(r.fecha) === d).length,
  }));

  const horaPico =
    porHora.length === 0 ? '—' : porHora.reduce((a, b) => (b.valor > a.valor ? b : a)).etiqueta;

  return (
    <div>

      {/* PERIODO */}
      <div className="card border-0 shadow-sm p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-sm-6 col-lg-3">
            <label htmlFor="rep-desde" className="form-label">Desde</label>
            <input
              type="date"
              id="rep-desde"
              className="form-control"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
            />
          </div>
          <div className="col-sm-6 col-lg-3">
            <label htmlFor="rep-hasta" className="form-label">Hasta</label>
            <input
              type="date"
              id="rep-hasta"
              className="form-control"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
            />
          </div>
        </div>
        {desde > hasta && (
          <div className="alert alert-warning py-2 mt-3 mb-0">
            La fecha "Desde" no puede ser posterior a "Hasta".
          </div>
        )}
      </div>

      {/* NÚMEROS CLAVE */}
      <div className="row g-3 mb-4">
        <div className="col-6 col-xl-3">
          <TarjetaDato titulo="Reservas" valor={activas.length} detalle="Sin contar canceladas" />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato titulo="Personas" valor={personas} detalle="Total de comensales" />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato
            titulo="Canceladas"
            valor={canceladas}
            detalle={`${tasaCancelacion}% del total`}
          />
        </div>
        <div className="col-6 col-xl-3">
          <TarjetaDato titulo="Hora más pedida" valor={horaPico} detalle="Mayor cantidad de reservas" />
        </div>
      </div>

      {/* GRÁFICOS */}
      <div className="row g-4">
        <div className="col-lg-6">
          <Barras titulo="Reservas por mesa" datos={porMesa} />
        </div>
        <div className="col-lg-6">
          <Barras titulo="Reservas por día de la semana" datos={porDia} />
        </div>
        <div className="col-12">
          <Barras titulo="Reservas por hora" datos={porHora} />
        </div>
      </div>

    </div>
  );
}