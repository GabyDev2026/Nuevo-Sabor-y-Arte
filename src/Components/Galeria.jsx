import React from 'react';

export default function Galeria() {
  return (
    <div className="w-100 min-vh-100 d-flex flex-column m-0 p-0" style={{ backgroundColor: '#f5f2eb', paddingTop: '140px', paddingBottom: '80px' }}>
      <div className="w-100 px-3 mb-5 text-center" style={{ paddingTop: '140px' }}>
        <div className="mx-auto" style={{ maxWidth: '800px' }}>
          <span className="d-block mb-2 fw-semibold text-uppercase" style={{ fontSize: '1rem', letterSpacing: '3px', color: '#b8973b' }}>
            SABOR & ARTE
          </span>
          <h1 className="fw-bold mb-3 text-dark" style={{ fontSize: '2.2rem', lineHeight: '1.2' }}>
            Donde cada plato es una obra de arte para tu paladar.
          </h1>
          <p className="text-secondary" style={{ fontSize: '1rem', lineHeight: '1.7' }}>
            Explora la vanguardia y la pasión reflejada en cada una de nuestras creaciones culinarias.
          </p>
        </div>
      </div>

      {/* PILA DE IMÁGENES A ANCHO TOTAL DE BORDE A BORDE */}
      <div className="w-100 d-flex flex-column gap-2 m-0 p-0">
        
        {/* Ítem 1 */}
        <div className="w-100 overflow-hidden shadow-sm" style={{ height: '35rem', backgroundColor: '#eae5d9' }}>
          <img 
            src={process.env.PUBLIC_URL + "/img/menu1.png"} 
            alt="Plato gourmet 1" 
            className="w-100 h-100"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>
        
        {/* Ítem 2 */}
        <div className="w-100 overflow-hidden shadow-sm" style={{ height: '35rem', backgroundColor: '#eae5d9' }}>
          <img 
            src={process.env.PUBLIC_URL + "/img/menu3.png"} 
            alt="Plato gourmet 2" 
            className="w-100 h-100"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>
        
        {/* Ítem 3 */}
        <div className="w-100 overflow-hidden shadow-sm" style={{ height: '35rem', backgroundColor: '#eae5d9' }}>
          <img 
            src={process.env.PUBLIC_URL + "/img/menu4.png"} 
            alt="Plato gourmet 3" 
            className="w-100 h-100"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>
        
        {/* Ítem 4 */}
        <div className="w-100 overflow-hidden shadow-sm" style={{ height: '35rem', backgroundColor: '#eae5d9' }}>
          <img 
            src={process.env.PUBLIC_URL + "/img/menu5.png"} 
            alt="Plato gourmet 4" 
            className="w-100 h-100"
            style={{ objectFit: 'cover', display: 'block' }}
          />
        </div>

      </div>

    </div>
  );
}