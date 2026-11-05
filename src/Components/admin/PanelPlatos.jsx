import React, { useState } from 'react';
import Modal from './Modal';
import ConfirmarEliminar from './ConfirmarEliminar';
import TablaCrud from './TablaCrud';
import { generarId } from '../../utilidades/reservas';

const PLATO_VACIO = { nombre: '', descripcion: '', precio: '', imagen: 'plato.png', visible: true };
const IMG = process.env.PUBLIC_URL + '/img/';

export default function PanelPlatos({ platos, setPlatos, avisar }) {
  const [formulario, setFormulario] = useState(null);
  const [paraEliminar, setParaEliminar] = useState(null);
  const [error, setError] = useState('');

  const columnas = [
    {
      titulo: 'Foto',
      mostrar: (p) => (
        <img
          src={IMG + p.imagen}
          alt={p.nombre}
          width="56"
          height="56"
          className="rounded"
          style={{ objectFit: 'cover' }}
        />
      ),
    },
    {
      titulo: 'Plato',
      mostrar: (p) => (
        <div>
          <div className="fw-semibold">{p.nombre}</div>
          <small className="text-secondary d-block" style={{ maxWidth: '320px' }}>{p.descripcion}</small>
        </div>
      ),
    },
    { titulo: 'Precio', mostrar: (p) => `S/ ${Number(p.precio).toFixed(2)}` },
    {
      titulo: 'En la web',
      mostrar: (p) => (
        <span className={`badge ${p.visible !== false ? 'bg-success' : 'bg-secondary'}`}>
          {p.visible !== false ? 'Visible' : 'Oculto'}
        </span>
      ),
    },
  ];

  const abrir = (plato) => {
    setError('');
    setFormulario({ ...plato, visible: plato.visible !== false });
  };

  const guardar = (e) => {
    e.preventDefault();
    const nombre = formulario.nombre.trim();
    const descripcion = formulario.descripcion.trim();
    const imagen = formulario.imagen.trim();
    const precio = Math.round(Number(formulario.precio) * 100) / 100;

    let mensaje = '';
    if (nombre === '') {
      mensaje = 'Escribe el nombre del plato.';
    } else if (descripcion === '') {
      mensaje = 'Escribe una descripción corta.';
    } else if (!(precio > 0)) {
      mensaje = 'El precio debe ser mayor que 0.';
    } else if (!/\.(png|jpe?g|webp)$/i.test(imagen)) {
      mensaje = 'La imagen debe ser un archivo .png, .jpg o .webp (por ejemplo, salmon.png).';
    }

    if (mensaje) {
      setError(mensaje);
      return;
    }

    const datos = { ...formulario, nombre, descripcion, imagen, precio };
    if (formulario.id) {
      setPlatos(platos.map((p) => (p.id === formulario.id ? datos : p)));
      avisar('Plato actualizado');
    } else {
      setPlatos([...platos, { ...datos, id: generarId(platos) }]);
      avisar('Plato agregado');
    }
    setFormulario(null);
  };

  const eliminar = () => {
    setPlatos(platos.filter((p) => p.id !== paraEliminar.id));
    avisar('Plato eliminado');
    setParaEliminar(null);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <p className="text-secondary mb-0">
          Los platos marcados como visibles aparecen en la página de inicio.
        </p>
        <button type="button" className="btn btn-dark btn-sm" onClick={() => abrir({ ...PLATO_VACIO })}>
          + Agregar plato
        </button>
      </div>

      <div className="card border-0 shadow-sm p-3">
        <TablaCrud
          columnas={columnas}
          filas={platos}
          alEditar={abrir}
          alEliminar={setParaEliminar}
          vacio="Todavía no hay platos. Agrega el primero."
        />
      </div>

      {formulario && (
        <Modal titulo={formulario.id ? 'Editar plato' : 'Nuevo plato'} alCerrar={() => setFormulario(null)}>
          <form onSubmit={guardar}>
            {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}

            <div className="mb-3">
              <label htmlFor="p-nombre" className="form-label">Nombre</label>
              <input
                type="text"
                id="p-nombre"
                className="form-control"
                value={formulario.nombre}
                onChange={(e) => setFormulario({ ...formulario, nombre: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="p-descripcion" className="form-label">Descripción</label>
              <textarea
                id="p-descripcion"
                className="form-control"
                rows="3"
                value={formulario.descripcion}
                onChange={(e) => setFormulario({ ...formulario, descripcion: e.target.value })}
                required
              ></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="p-precio" className="form-label">Precio (S/)</label>
              <input
                type="number"
                id="p-precio"
                className="form-control"
                min="0"
                step="0.5"
                value={formulario.precio}
                onChange={(e) => setFormulario({ ...formulario, precio: e.target.value })}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="p-imagen" className="form-label">Archivo de imagen</label>
              <div className="d-flex gap-3 align-items-center">
                <input
                  type="text"
                  id="p-imagen"
                  className="form-control"
                  value={formulario.imagen}
                  onChange={(e) => setFormulario({ ...formulario, imagen: e.target.value })}
                  required
                />
                <img
                  src={IMG + formulario.imagen}
                  alt="Vista previa"
                  width="56"
                  height="56"
                  className="rounded flex-shrink-0"
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="form-text">
                La imagen debe estar en la carpeta <code>public/img</code> del proyecto.
              </div>
            </div>

            <div className="form-check form-switch mb-4">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="p-visible"
                checked={formulario.visible}
                onChange={(e) => setFormulario({ ...formulario, visible: e.target.checked })}
              />
              <label className="form-check-label" htmlFor="p-visible">
                Mostrar en la página de inicio
              </label>
            </div>

            <div className="d-flex justify-content-end gap-2">
              <button type="button" className="btn btn-outline-secondary" onClick={() => setFormulario(null)}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-dark">Guardar plato</button>
            </div>
          </form>
        </Modal>
      )}

      {paraEliminar && (
        <ConfirmarEliminar
          texto={`¿Eliminar "${paraEliminar.nombre}" de la carta? Esta acción no se puede deshacer.`}
          alConfirmar={eliminar}
          alCancelar={() => setParaEliminar(null)}
        />
      )}
    </div>
  );
}