import React, { useState } from 'react';
import Modal from './Modal';
import ConfirmarEliminar from './ConfirmarEliminar';
import TablaCrud from './TablaCrud';
import { generarId, reservasPendientesDeMesa } from '../../utilidades/reservas';

const MESA_VACIA = { nombre: '', capacidad: 2, activa: true };

export default function PanelMesas({ mesas, setMesas, reservas, avisar }) {
  const [formulario, setFormulario] = useState(null);
  const [paraEliminar, setParaEliminar] = useState(null);
  const [error, setError] = useState('');

  const columnas = [
    { titulo: 'Mesa', campo: 'nombre' },
    { titulo: 'Capacidad', mostrar: (m) => `${m.capacidad} personas` },
    {
      titulo: 'Estado',
      mostrar: (m) => (
        <span className={`badge ${m.activa ? 'bg-success' : 'bg-secondary'}`}>
          {m.activa ? 'Activa' : 'Inactiva'}
        </span>
      ),
    },
    { titulo: 'Reservas pendientes', mostrar: (m) => reservasPendientesDeMesa(reservas, m.id).length },
  ];

  const abrir = (mesa) => {
    setError('');
    setFormulario({ ...mesa });
  };

  const guardar = (e) => {
    e.preventDefault();
    const nombre = formulario.nombre.trim();
    const capacidad = Number(formulario.capacidad);
    const pendientes = formulario.id ? reservasPendientesDeMesa(reservas, formulario.id) : [];
    const mayorGrupo = Math.max(0, ...pendientes.map((r) => r.personas));

    let mensaje = '';
    if (nombre === '') {
      mensaje = 'Escribe el nombre de la mesa.';
    } else if (!Number.isInteger(capacidad) || capacidad < 1 || capacidad > 20) {
      mensaje = 'La capacidad debe ser un número entre 1 y 20.';
    } else if (mesas.some((m) => m.id !== formulario.id && m.nombre.toLowerCase() === nombre.toLowerCase())) {
      mensaje = 'Ya existe una mesa con ese nombre.';
    } else if (!formulario.activa && pendientes.length > 0) {
      mensaje = `${nombre} tiene ${pendientes.length} reserva(s) pendiente(s). Cancélalas o cámbialas de mesa antes de desactivarla.`;
    } else if (capacidad < mayorGrupo) {
      mensaje = `Hay una reserva pendiente de ${mayorGrupo} personas en esta mesa; la capacidad no puede ser menor.`;
    }

    if (mensaje) {
      setError(mensaje);
      return;
    }

    const datos = { ...formulario, nombre, capacidad };
    if (formulario.id) {
      setMesas(mesas.map((m) => (m.id === formulario.id ? datos : m)));
      avisar('Mesa actualizada');
    } else {
      setMesas([...mesas, { ...datos, id: generarId(mesas) }]);
      avisar('Mesa agregada');
    }
    setFormulario(null);
  };

  const pedirEliminar = (mesa) => {
    const pendientes = reservasPendientesDeMesa(reservas, mesa.id);
    if (pendientes.length > 0) {
      avisar(`No se puede eliminar ${mesa.nombre}: tiene ${pendientes.length} reserva(s) pendiente(s).`);
      return;
    }
    setParaEliminar(mesa);
  };

  const eliminar = () => {
    setMesas(mesas.filter((m) => m.id !== paraEliminar.id));
    avisar('Mesa eliminada');
    setParaEliminar(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-secondary mb-0">{mesas.length} mesas registradas</p>
        <button type="button" className="btn btn-dark btn-sm" onClick={() => abrir({ ...MESA_VACIA })}>
          + Agregar mesa
        </button>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <TablaCrud
          columnas={columnas}
          filas={mesas}
          alEditar={abrir}
          alEliminar={pedirEliminar}
          vacio="Todavía no hay mesas. Agrega la primera."
        />
      </div>

      {formulario && (
        <Modal titulo={formulario.id ? 'Editar mesa' : 'Nueva mesa'} alCerrar={() => setFormulario(null)}>
          <form onSubmit={guardar}>
            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <div className="mb-3">
              <label htmlFor="m-nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="m-nombre"
                className="form-control"
                placeholder="Ej. Mesa 11"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="m-capacidad" className="form-label">Capacidad (personas)</label>
              <input
                type="number"
                id="m-capacidad"
                className="form-control"
                min="1"
                max="20"
                value={formulario.capacidad}
                onChange={(e) => setFormulario({ ...formulario, capacidad: e.target.value })}
                required
              />
            </div>

            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="m-activa"
                checked={formulario.activa}
                onChange={(e) => setFormulario({ ...formulario, activa: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="m-activa">
                Mesa activa (los clientes pueden reservarla)
              </label>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setFormulario(null)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-dark">Guardar mesa</button>
            </div>
          </form>
        </Modal>
      )}

      {paraEliminar && (
        <ConfirmarEliminar
          texto={`¿Eliminar ${paraEliminar.nombre}? Esta acción no se puede deshacer.`}
          alConfirmar={eliminar}
          alCancelar={() => setParaEliminar(null)}
        />
      )}
    </div>
  );
}