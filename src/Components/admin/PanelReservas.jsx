import React, { useState } from 'react';
import Calendario from '../Calendario';
import Modal from './Modal';
import ConfirmarEliminar from './ConfirmarEliminar';
import TablaCrud from './TablaCrud';
import FormularioReserva from './FormularioReserva';
import { fechaLocalISO, fechaLarga } from '../../utilidades/fechas';
import { generarId, nombreDeMesa } from '../../utilidades/reservas';

const CLASE_ESTADO = {
  confirmada: 'bg-success',
  completada: 'bg-secondary',
  cancelada: 'bg-danger',
};
const TEXTO_ESTADO = {
  confirmada: 'Confirmada',
  completada: 'Completada',
  cancelada: 'Cancelada',
};

export default function PanelReservas({ mesas, reservas, setReservas, horarios, avisar }) {
  const [fecha, setFecha] = useState(fechaLocalISO());
  const [busqueda, setBusqueda] = useState('');
  const [formulario, setFormulario] = useState(null);
  const [paraEliminar, setParaEliminar] = useState(null);

  // Sin búsqueda: reservas del día elegido. Con búsqueda: de todos los días.
  const texto = busqueda.trim().toLowerCase();
  const lista = reservas
    .filter((r) =>
      texto === '' ? r.fecha === fecha : (r.cliente + ' ' + r.email).toLowerCase().includes(texto)
    )
    .sort((a, b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora));

  const columnas = [
    { titulo: 'Fecha', mostrar: (r) => r.fecha.split('-').reverse().join('/') },
    { titulo: 'Hora', campo: 'hora' },
    {
      titulo: 'Cliente',
      mostrar: (r) => (
        <div>
          {r.cliente}
          <small className="d-block text-secondary">{r.email}</small>
        </div>
      ),
    },
    { titulo: 'Personas', campo: 'personas' },
    { titulo: 'Mesa', mostrar: (r) => nombreDeMesa(mesas, r.mesaId) },
    {
      titulo: 'Estado',
      mostrar: (r) => <span className={`badge ${CLASE_ESTADO[r.estado]}`}>{TEXTO_ESTADO[r.estado]}</span>,
    },
  ];

  const nuevaReserva = () => {
    setFormulario({
      cliente: '',
      email: '',
      fecha,
      hora: '',
      personas: 2,
      mesaId: '',
      estado: 'confirmada',
      tarjeta: '',
    });
  };

  const guardar = (datos) => {
    if (datos.id) {
      setReservas(reservas.map((r) => (r.id === datos.id ? datos : r)));
      avisar('Reserva actualizada');
    } else {
      setReservas([...reservas, { ...datos, id: generarId(reservas) }]);
      avisar('Reserva registrada');
    }
    setFormulario(null);
    setBusqueda('');
    setFecha(datos.fecha); // el calendario se mueve al día de la reserva guardada
  };

  const eliminar = () => {
    setReservas(reservas.filter((r) => r.id !== paraEliminar.id));
    avisar('Reserva eliminada');
    setParaEliminar(null);
  };

  return (
    <div className="row g-4">

      <div className="col-lg-5">
        <Calendario
          key={fecha.slice(0, 7)}
          fecha={fecha}
          alSeleccionar={(f) => { setFecha(f); setBusqueda(''); }}
          horarios={horarios}
          reservas={reservas}
          modoAdmin
        />
      </div>

      <div className="col-lg-7">
        <div className="card border-0 shadow-sm p-3">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3">
            <h5 className="fw-bold mb-0">
              {texto === '' ? fechaLarga(fecha) : `Resultados para "${busqueda.trim()}"`}
            </h5>
            <button type="button" className="btn btn-dark btn-sm" onClick={nuevaReserva}>
              + Nueva reserva
            </button>
          </div>

          <input
            type="search"
            className="form-control mb-3"
            placeholder="Buscar por cliente o correo (en todos los días)"
            aria-label="Buscar reservas"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />

          <TablaCrud
            columnas={columnas}
            filas={lista}
            alEditar={(r) => setFormulario({ ...r })}
            alEliminar={setParaEliminar}
            vacio={texto === '' ? 'No hay reservas este día.' : 'No se encontró ninguna reserva.'}
          />
        </div>
      </div>

      {formulario && (
        <Modal
          titulo={formulario.id ? 'Editar reserva' : 'Nueva reserva'}
          alCerrar={() => setFormulario(null)}
        >
          <FormularioReserva
            inicial={formulario}
            mesas={mesas}
            reservas={reservas}
            horarios={horarios}
            alGuardar={guardar}
            alCancelar={() => setFormulario(null)}
          />
        </Modal>
      )}

      {paraEliminar && (
        <ConfirmarEliminar
          texto={`¿Eliminar la reserva de ${paraEliminar.cliente} del ${paraEliminar.fecha.split('-').reverse().join('/')}? Si solo quieres liberar la mesa, mejor cambia su estado a Cancelada.`}
          alConfirmar={eliminar}
          alCancelar={() => setParaEliminar(null)}
        />
      )}

    </div>
  );
}