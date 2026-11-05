import React from 'react';

export default function TablaCrud({ columnas, filas, alEditar, alEliminar, vacio = 'No hay registros todavía.' }) {
  if (filas.length === 0) {
    return <div className="alert alert-light border mb-0">{vacio}</div>;
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle mb-0">
        <thead className="table-light">
          <tr>
            {columnas.map((c) => (
              <th key={c.titulo} scope="col">{c.titulo}</th>
            ))}
            <th scope="col" className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((fila) => (
            <tr key={fila.id}>
              {columnas.map((c) => (
                <td key={c.titulo}>{c.mostrar ? c.mostrar(fila) : fila[c.campo]}</td>
              ))}
              <td className="text-end text-nowrap">
                <button type="button" className="btn btn-sm btn-outline-dark me-2" onClick={() => alEditar(fila)}>
                  Editar
                </button>
                <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => alEliminar(fila)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}