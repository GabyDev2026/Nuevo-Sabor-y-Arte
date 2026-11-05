import React from 'react';
import Modal from './Modal';

export default function ConfirmarEliminar({ texto, alConfirmar, alCancelar }) {
  return (
    <Modal titulo="Confirmar eliminación" alCerrar={alCancelar}>
      <p className="mb-4">{texto}</p>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={alCancelar}>
          Cancelar
        </button>
        <button type="button" className="btn btn-danger" onClick={alConfirmar}>
          Sí, eliminar
        </button>
      </div>
    </Modal>
  );
}