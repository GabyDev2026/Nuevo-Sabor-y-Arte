import React from 'react';

export default function TarjetaPlato({ plato }) {
  return (
    <div className="card h-100 bg-white text-dark border-0 shadow-sm overflow-hidden">
      <img
        src={process.env.PUBLIC_URL + '/img/' + plato.imagen}
        alt={plato.nombre}
        className="w-100"
        style={{ height: '180px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column justify-content-between p-3">
        <div>
          <h5 className="card-title fw-bold">{plato.nombre}</h5>
          <p className="card-text small text-muted">{plato.descripcion}</p>
        </div>
        <p className="fw-bold mt-3 mb-0">S/ {Number(plato.precio).toFixed(2)}</p>
      </div>
    </div>
  );
}