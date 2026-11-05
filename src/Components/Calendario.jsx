import React, { useState } from 'react';
import { COLORES, RESERVA } from '../datos/colores';
import { DIAS_ANTICIPACION } from '../datos/config';
import { fechaLocalISO } from '../utilidades/fechas';
import { horarioDelDia, reservasDelDia } from '../utilidades/reservas';

const MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];
const DIAS = ['Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá', 'Do'];

export default function Calendario({
  fecha,
  alSeleccionar,
  horarios,
  reservas = [],
  modoAdmin = false,
  diasMaximos = null,
  oscuro = false,
}) {
  const hoy = new Date();
  const hoyISO = fechaLocalISO(hoy);

  const referencia = fecha ? new Date(fecha + 'T00:00:00') : hoy;
  const [vista, setVista] = useState({ anio: referencia.getFullYear(), mes: referencia.getMonth() });

  // Último día que se puede reservar (solo en la web pública)
  let limiteISO = null;
  if (diasMaximos !== null) {
    const limite = new Date();
    limite.setDate(limite.getDate() + diasMaximos);
    limiteISO = fechaLocalISO(limite);
  }

  const esMesActual = vista.anio === hoy.getFullYear() && vista.mes === hoy.getMonth();
  const primeroDelSiguiente = fechaLocalISO(new Date(vista.anio, vista.mes + 1, 1));
  const sinMasMeses = limiteISO !== null && primeroDelSiguiente > limiteISO;

  const mover = (cambio) => {
    const nueva = new Date(vista.anio, vista.mes + cambio, 1);
    setVista({ anio: nueva.getFullYear(), mes: nueva.getMonth() });
  };

  // Celdas: huecos vacíos hasta el primer día (la semana empieza el lunes) + los días del mes
  const diasEnMes = new Date(vista.anio, vista.mes + 1, 0).getDate();
  const huecos = (new Date(vista.anio, vista.mes, 1).getDay() + 6) % 7;
  const celdas = [];

  for (let i = 0; i < huecos; i++) {
    celdas.push(<div key={`vacio-${i}`}></div>);
  }

  for (let d = 1; d <= diasEnMes; d++) {
    const iso = fechaLocalISO(new Date(vista.anio, vista.mes, d));
    const horario = horarioDelDia(horarios, iso);
    const cerrado = !horario || !horario.abierto;
    const pasado = iso < hoyISO;
    const fuera = limiteISO !== null && iso > limiteISO;
    const bloqueado = !modoAdmin && (cerrado || pasado || fuera);
    const seleccionado = iso === fecha;
    const esHoy = iso === hoyISO;
    const cantidad = modoAdmin ? reservasDelDia(reservas, iso).length : 0;

    const claseDia = seleccionado
      ? oscuro ? 'btn-warning' : 'btn-dark'
      : oscuro ? 'btn-outline-light border-0' : 'btn-outline-secondary border-0';

    celdas.push(
      <button
        key={iso}
        type="button"
        disabled={bloqueado}
        onClick={() => alSeleccionar(iso)}
        aria-pressed={seleccionado}
        aria-label={`${d} de ${MESES[vista.mes]} de ${vista.anio}`}
        className={`btn btn-sm py-2 ${claseDia}`}
        style={{
          color: seleccionado && !oscuro ? COLORES.doradoClaro : undefined,
          border: esHoy ? `2px solid ${oscuro ? RESERVA.acento : COLORES.doradoClaro}` : undefined,
          transition: 'all 0.2s',
        }}
      >
        <div>{d}</div>
        {modoAdmin && (
          <small className="d-block" style={{ fontSize: '10px' }}>
            {cantidad > 0 ? `${cantidad} res.` : '\u00A0'}
          </small>
        )}
      </button>
    );
  }

  return (
    <div className={oscuro ? 'text-white' : 'card border-0 shadow-sm p-3'}>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <button
          type="button"
          className={`btn btn-sm px-3 ${oscuro ? 'btn-outline-light' : 'btn-outline-dark'}`}
          onClick={() => mover(-1)}
          disabled={!modoAdmin && esMesActual}
          aria-label="Mes anterior"
        >
          &lsaquo;
        </button>
        <strong>{MESES[vista.mes]} {vista.anio}</strong>
        <button
          type="button"
          className={`btn btn-sm px-3 ${oscuro ? 'btn-outline-light' : 'btn-outline-dark'}`}
          onClick={() => mover(1)}
          disabled={sinMasMeses}
          aria-label="Mes siguiente"
        >
          &rsaquo;
        </button>
      </div>

      <div
        className="text-center"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}
      >
        {DIAS.map((dia) => (
          <small
            key={dia}
            className={`fw-semibold ${oscuro ? '' : 'text-secondary'}`}
            style={oscuro ? { color: RESERVA.textoSuave } : undefined}
          >
            {dia}
          </small>
        ))}
        {celdas}
      </div>

      {!modoAdmin && (
        <small
          className={`d-block mt-3 ${oscuro ? '' : 'text-secondary'}`}
          style={oscuro ? { color: RESERVA.textoSuave } : undefined}
        >
          Los días atenuados están cerrados o fuera del plazo ({DIAS_ANTICIPACION} días).
        </small>
      )}
    </div>
  );
}