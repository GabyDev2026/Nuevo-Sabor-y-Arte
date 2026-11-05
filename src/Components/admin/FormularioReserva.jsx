import React, { useState } from 'react';
import { hayConflicto, horasDelDia } from '../../utilidades/reservas';
import { fechaLocalISO } from '../../utilidades/fechas';

const ESTADOS = [
  { valor: 'confirmada', texto: 'Confirmada' },
  { valor: 'completada', texto: 'Completada (asistió)' },
  { valor: 'cancelada', texto: 'Cancelada' },
];

// Una fecha muy antigua evita que se oculten las horas que ya pasaron hoy
const SIN_FILTRO_DE_HORA = new Date(2000, 0, 1);

export default function FormularioReserva({ inicial, mesas, reservas, horarios, alGuardar, alCancelar }) {
  const [datos, setDatos] = useState(inicial);
  const [error, setError] = useState('');

  const hoyISO = fechaLocalISO(new Date());

  const maxPersonas = Math.max(1, ...mesas.filter((m) => m.activa).map((m) => m.capacidad));

  // Mesas activas (más la actual de la reserva, aunque ya esté inactiva)
  const opcionesMesas = mesas.filter((m) => m.activa || m.id === Number(inicial.mesaId));

  const horas = datos.fecha ? horasDelDia(horarios, datos.fecha, SIN_FILTRO_DE_HORA) : [];
  const opcionesHora = datos.hora && !horas.includes(datos.hora) ? [datos.hora, ...horas] : horas;

  const mesaDisponible = (mesa, d) =>
    mesa.capacidad >= Number(d.personas) &&
    !hayConflicto(reservas, mesa.id, d.fecha, d.hora, d.id);

  const cambiar = (campo, valor) => {
    const nuevos = { ...datos, [campo]: valor };

    // Si la mesa elegida deja de servir con el cambio, se quita la selección
    const mesa = mesas.find((m) => m.id === Number(nuevos.mesaId));
    if (mesa && !mesaDisponible(mesa, nuevos)) {
      nuevos.mesaId = '';
    }
    setDatos(nuevos);
  };

  const enviar = (e) => {
    e.preventDefault();
    const personas = Number(datos.personas);
    const mesa = mesas.find((m) => m.id === Number(datos.mesaId));

    let mensaje = '';
    if (datos.cliente.trim() === '') {
      mensaje = 'Escribe el nombre del cliente.';
    } else if (datos.fecha < hoyISO) {
      mensaje = 'No se pueden programar reservas para fechas pasadas.';
    } else if (!Number.isInteger(personas) || personas < 1) {
      mensaje = 'Las personas deben ser 1 o más.';
    } else if (!horas.includes(datos.hora) && datos.hora !== inicial.hora) {
      mensaje = 'Elige una hora dentro del horario de atención.';
    } else if (!mesa) {
      mensaje = 'Elige una mesa.';
    } else if (mesa.capacidad < personas) {
      mensaje = `${mesa.nombre} solo tiene ${mesa.capacidad} lugares.`;
    } else if (
      datos.estado !== 'cancelada' &&
      hayConflicto(reservas, mesa.id, datos.fecha, datos.hora, datos.id)
    ) {
      mensaje = 'Esa mesa ya está reservada a esa hora.';
    }

    if (mensaje) {
      setError(mensaje);
      return;
    }

    alGuardar({
      ...datos,
      cliente: datos.cliente.trim(),
      email: datos.email.trim(),
      personas,
      mesaId: mesa.id,
    });
  };

  return (
    <form onSubmit={enviar}>
      {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

      <div className="row g-3">
        <div className="col-md-6">
          <label htmlFor="r-cliente" className="form-label">Cliente</label>
          <input
            type="text"
            id="r-cliente"
            className="form-control"
            value={datos.cliente}
            onChange={(e) => cambiar('cliente', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="r-email" className="form-label">Correo electrónico</label>
          <input
            type="email"
            id="r-email"
            className="form-control"
            value={datos.email}
            onChange={(e) => cambiar('email', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="r-fecha" className="form-label">Fecha</label>
          <input
            type="date"
            id="r-fecha"
            className="form-control"
            min={hoyISO} // <-- Impide seleccionar fechas anteriores a hoy de forma nativa
            value={datos.fecha}
            onChange={(e) => cambiar('fecha', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="r-hora" className="form-label">Hora</label>
          <select
            id="r-hora"
            className="form-select"
            value={datos.hora}
            onChange={(e) => cambiar('hora', e.target.value)}
            disabled={!datos.fecha}
            required
          >
            <option value="">
              {datos.fecha && opcionesHora.length === 0 ? 'Ese día está cerrado' : 'Elige una hora'}
            </option>
            {opcionesHora.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        <div className="col-md-6">
          <label htmlFor="r-personas" className="form-label">Personas</label>
          <input
            type="number"
            id="r-personas"
            className="form-control"
            min="1"
            max={maxPersonas}
            value={datos.personas}
            onChange={(e) => cambiar('personas', e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="r-mesa" className="form-label">Mesa</label>
          <select
            id="r-mesa"
            className="form-select"
            value={datos.mesaId}
            onChange={(e) => cambiar('mesaId', e.target.value)}
            disabled={!datos.fecha || !datos.hora}
            required
          >
            <option value="">
              {datos.fecha && datos.hora ? 'Elige una mesa' : 'Primero elige día y hora'}
            </option>
            {opcionesMesas.map((m) => {
              const libre = mesaDisponible(m, datos);
              return (
                <option key={m.id} value={m.id} disabled={!libre}>
                  {m.nombre} · {m.capacidad} personas{libre ? '' : ' (no disponible)'}
                </option>
              );
            })}
          </select>
        </div>

        <div className="col-12">
          <label htmlFor="r-estado" className="form-label">Estado</label>
          <select
            id="r-estado"
            className="form-select"
            value={datos.estado}
            onChange={(e) => cambiar('estado', e.target.value)}
          >
            {ESTADOS.map((s) => (
              <option key={s.valor} value={s.valor}>{s.texto}</option>
            ))}
          </select>
          <div className="form-text">
            Una reserva cancelada libera a la mesa y sigue visible en el historial.
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-outline-secondary" onClick={alCancelar}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-dark">
          Guardar reserva
        </button>
      </div>
    </form>
  );
}