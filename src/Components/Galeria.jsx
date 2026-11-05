import React from 'react';
import EncabezadoSeccion from './EncabezadoSeccion';
import { COLORES } from '../datos/colores';

const FOTOS = ['menu1.png', 'menu3.png', 'menu4.png', 'menu5.png'];

export default function Galeria() {
  return (
    <div style={{ backgroundColor: COLORES.crema, minHeight: '100vh' }}>

      <div className="container pt-5">
        <EncabezadoSeccion
          etiqueta="Sabor & Arte"
          titulo="Donde cada plato es una obra de arte para tu paladar"
          descripcion="Explora la vanguardia y la pasión reflejada en cada una de nuestras creaciones culinarias."
        />
      </div>

      <div className="d-flex flex-column gap-2">
        {FOTOS.map((foto, i) => (
          <div key={foto} className="w-100 overflow-hidden shadow-sm" style={{ height: '35rem' }}>
            <img
              src={process.env.PUBLIC_URL + '/img/' + foto}
              alt={`Plato gourmet ${i + 1}`}
              className="w-100 h-100"
              style={{ objectFit: 'cover', display: 'block' }}
            />
          </div>
        ))}
      </div>

    </div>
  );
}