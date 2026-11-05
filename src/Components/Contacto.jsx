import React from 'react';

export default function Contacto() {
  return (
    <div className="w-100 min-vh-100 d-flex flex-column m-0 p-0" style={{ backgroundColor: '#f5f2eb', paddingTop: '160px', paddingBottom: '80px' }}>
      <div className="container py-4">
        
        {/* ENCABEZADO ESTÁNDAR (Idéntico para todas las páginas) */}
        <div className="row mb-5 text-center">
          <div className="col-md-12">
            <span className="d-block mb-2 fw-semibold text-uppercase" style={{ color: '#b8973b', letterSpacing: '3px', fontSize: '1rem' }}>
              Contáctanos
            </span>
            <h1 className="fw-bold mb-3 text-dark" style={{ fontSize: '2.2rem', lineHeight: '1.2' }}>
              Estamos para ti
            </h1>
            <p className="text-secondary mx-auto" style={{ maxWidth: '650px', fontSize: '1rem', lineHeight: '1.7' }}>
              Será un gusto atenderte. Escríbenos, llámanos o visítanos. ¡Te esperamos!
            </p>
          </div>
        </div>

        {/* CONTENIDO ESPECÍFICO DE LA PÁGINA */}
        <div className="row">
          <div className="col-md-6 mb-4">
            <h4 className="fw-bold mb-3 text-dark" style={{ fontSize: '1.5rem' }}>Información</h4>
            <p className="text-secondary mb-2" style={{ fontSize: '1rem', lineHeight: '1.7' }}><strong>📍 Nuestra ubicación:</strong> Av. Los Olivos 123, Lima - Perú</p>
            <p className="text-secondary mb-2" style={{ fontSize: '1rem', lineHeight: '1.7' }}><strong>📞 Teléfono:</strong> +51 987 654 321</p>
            <p className="text-secondary mb-2" style={{ fontSize: '1rem', lineHeight: '1.7' }}><strong>✉️ Email:</strong> contacto@saborarte.com</p>
            <p className="text-secondary mb-2" style={{ fontSize: '1rem', lineHeight: '1.7' }}><strong>⏰ Horario de atención:</strong> Lun - Dom 12:00 p.m. - 11:00 p.m.</p>
          </div>

          <div className="col-md-6">
            <div className="card shadow-sm p-4 border-0" style={{ backgroundColor: '#ffffff' }}>
              <h4 className="fw-bold mb-3 text-dark" style={{ fontSize: '1.5rem' }}>Envíanos un mensaje</h4>
              <form onSubmit={(e) => { e.preventDefault(); alert("¡Mensaje enviado con éxito!"); }}>
                <div className="mb-3">
                  <label className="form-label text-dark">Nombre</label>
                  <input type="text" className="form-control" required placeholder="Ej. Amilcar Gamarra" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark">Correo electrónico</label>
                  <input type="email" className="form-control" required placeholder="Ej. Amilcar_gamarra@idat.pe" />
                </div>
                <div className="mb-3">
                  <label className="form-label text-dark">Mensaje</label>
                  <textarea className="form-control" rows="3" required placeholder="Déjanos un mensaje..."></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Enviar mensaje</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}