import React, { useEffect } from 'react';

export default function Modal({ titulo, alCerrar, children }) {
  useEffect(() => {
    const alPresionar = (e) => {
      if (e.key === 'Escape') alCerrar();
    };
    document.addEventListener('keydown', alPresionar);
    return () => document.removeEventListener('keydown', alPresionar);
  }, [alCerrar]);

  return (
    <>
      <div className="modal d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-label={titulo} onClick={alCerrar}>
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content border-0 shadow">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">{titulo}</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={alCerrar}></button>
            </div>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop show"></div>
    </>
  );
}