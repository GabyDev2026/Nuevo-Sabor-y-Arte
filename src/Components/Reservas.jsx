import React, { useState } from 'react';

export const Reservas = () => {
  const ahora = new Date();
  const anioActual = ahora.getFullYear();
  const mesActualIndex = ahora.getMonth();
  const diaActual = ahora.getDate();
  const horaActualMinutos = ahora.getHours() * 60 + ahora.getMinutes();

  const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const mesActualNombre = nombresMeses[mesActualIndex];

  const [paso, setPaso] = useState(7); // Ubicado en el último paso para probarlo directamente
  const [reserva, setReserva] = useState({
    personas: 5,
    fecha: `${diaActual} de ${mesActualNombre}, ${anioActual}`,
    hora: '8:00 PM',
    zona: 'Adentro',
    mesa: 'Mesa 3 (Principal)',
    experiencia: 'Menú Degustación - Agasajo',
    motivo: 'Cumpleaños',
    alergias: '',
    requerimiento: '',
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    numeroTarjeta: '',
    expiracion: '',
    cvv: ''
  });

  const [terminos, setTerminos] = useState(false);
  const [mostrarOcupados, setMostrarOcupados] = useState(false);

  const diasOcupadosOctubre = [25, 28];
  const diasOcupadosNoviembre = [4, 5, 14, 15, 21];

  const personasOp = [1, 2, 3, 4, 5, 6, 8];
  
  const horasOp = [
    { label: '1:00 PM', minutos: 13 * 60 },
    { label: '1:30 PM', minutos: 13 * 60 + 30 },
    { label: '2:00 PM', minutos: 14 * 60 },
    { label: '2:30 PM', minutos: 14 * 60 + 30 },
    { label: '3:00 PM', minutos: 15 * 60 },
    { label: '6:30 PM', minutos: 18 * 60 + 30 },
    { label: '7:00 PM', minutos: 19 * 60 },
    { label: '7:30 PM', minutos: 19 * 60 + 30 },
    { label: '8:00 PM', minutos: 20 * 60 },
    { label: '8:30 PM', minutos: 20 * 60 + 30 },
    { label: '9:00 PM', minutos: 21 * 60 }
  ];

  const experienciasOp = ['A la Carta', 'Menú Degustación - Agasajo', 'Menú Degustación - Encuentro'];
  const motivosOp = [
    'Cumpleaños',
    'Aniversario',
    'Graduación',
    'Persona con discapacidad',
    'Vegetariano',
    'Silla de bebé',
    'Luna de Miel',
    'Reunión de Negocios',
    'Otro / Ninguno'
  ];

  const mesasDisponibles = [
    { id: 101, numero: 'Mesa 1 (Ventana)', zona: 'Adentro', capacidad: 2, ocupada: false },
    { id: 102, numero: 'Mesa 2 (Central)', zona: 'Adentro', capacidad: 4, ocupada: true },
    { id: 103, numero: 'Mesa 3 (Principal)', zona: 'Adentro', capacidad: 4, ocupada: false },
    { id: 104, numero: 'Mesa 4 (Familiar)', zona: 'Adentro', capacidad: 6, ocupada: false },
    { id: 105, numero: 'Mesa 5 (VIP)', zona: 'Adentro', capacidad: 8, ocupada: true },
    { id: 201, numero: 'Terraza 1 (Vista)', zona: 'Terraza', capacidad: 2, ocupada: false },
    { id: 202, numero: 'Terraza 2 (Jardín)', zona: 'Terraza', capacidad: 4, ocupada: false },
    { id: 203, numero: 'Terraza 3 (Esquina)', zona: 'Terraza', capacidad: 4, ocupada: true },
    { id: 204, numero: 'Terraza 4 (Grande)', zona: 'Terraza', capacidad: 6, ocupada: false }
  ];

  const validarYAvancar = () => {
    if (paso === 3 && !reserva.hora) return;
    if (paso === 6 && !reserva.motivo) return;
    setPaso(p => Math.min(p + 1, 7));
  };

  const retroceder = () => setPaso(p => Math.max(p - 1, 1));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!terminos) {
      alert('Debes aceptar los términos y condiciones para finalizar la reserva.');
      return;
    }
    alert(`¡Reserva confirmada en ${reserva.zona} (${reserva.mesa}) para ${reserva.personas} personas el ${reserva.fecha} a las ${reserva.hora}! Te esperamos en Sabor & Arte.`);
  };

  const matrizOctubre = [
    [null, null, null, 1, 2, 3, 4],
    [5, 6, 7, 8, 9, 10, 11],
    [12, 13, 14, 15, 16, 17, 18],
    [19, 20, 21, 22, 23, 24, 25],
    [26, 27, 28, 29, 30, 31, null]
  ];

  const matrizNoviembre = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, null, null, null, null, null, null]
  ];

  return (
    <div 
      className="container-fluid py-5 position-relative" 
      style={{ 
        backgroundImage: 'linear-gradient(rgba(18, 20, 23, 0.75), rgba(18, 20, 23, 0.85)), url("https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1920&auto=format&fit=crop")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        color: '#212529', 
        paddingTop: '200px', 
        minHeight: '100vh' 
      }}
    >
      <div className="container py-4 position-relative" style={{ maxWidth: '950px', zIndex: 2, marginTop: '20px' }}>
        
        {/* BARRA DE PROGRESO SUPERIOR */}
        <div className="mb-4 pt-3">
          <div className="d-flex justify-content-between fw-semibold mb-2 px-1 text-light text-uppercase shadow-sm" style={{ fontSize: '0.68rem', letterSpacing: '0.5px' }}>
            <span>👤 {reserva.personas} PERS.</span>
            <span>📅 {reserva.fecha}</span>
            <span>⏰ {reserva.hora || 'HORA'}</span>
            <span>🍽️ {reserva.experiencia}</span>
            <span>✨ {reserva.motivo || 'DETALLES'}</span>
            <span>💬 TUS DATOS</span>
          </div>

          <div className="position-relative mx-1" style={{ height: '4px', backgroundColor: 'rgba(255, 255, 255, 0.3)' }}>
            <div 
              className="position-absolute top-0 start-0 h-100 bg-warning" 
              style={{ width: `${((paso - 1) / 6) * 100}%`, transition: 'width 0.3s ease' }}
            ></div>
            {[1, 2, 3, 4, 5, 6, 7].map((pNum) => (
              <div 
                key={pNum} 
                className="position-absolute rounded-circle border border-dark shadow"
                style={{ 
                  width: '12px', height: '12px', top: '-4px', 
                  left: `${((pNum - 1) / 6) * 100}%`, 
                  transform: 'translateX(-50%)',
                  backgroundColor: paso >= pNum ? '#d4af37' : '#ffffff',
                  cursor: pNum < paso ? 'pointer' : 'default'
                }}
                onClick={() => { if (pNum < paso) setPaso(pNum); }}
              ></div>
            ))}
          </div>
        </div>

        {/* TARJETA PRINCIPAL */}
        <div className="p-4 p-md-5 rounded-4 shadow-lg position-relative border border-secondary border-opacity-10" style={{ backgroundColor: '#fdfbf7' }}>
          
          {/* PASO 1: PERSONAS */}
          {paso === 1 && (
            <div className="text-center py-3">
              <h4 className="fw-bold mb-3 text-dark">Elige la cantidad de personas</h4>
              <div className="d-flex flex-wrap justify-content-center gap-3 my-3">
                {personasOp.map(num => (
                  <button
                    key={num}
                    type="button"
                    className={`btn rounded-circle fw-bold d-flex align-items-center justify-content-center ${reserva.personas === num ? 'bg-dark text-white' : 'btn-outline-dark'}`}
                    style={{ width: '55px', height: '55px', transition: '0.2s' }}
                    onClick={() => setReserva({ ...reserva, personas: num, mesa: null })}
                  >
                    {num} {num === 8 ? '+' : ''}
                  </button>
                ))}
              </div>
              <div className="d-flex justify-content-end mt-4 pt-3 border-top">
                <button className="btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark" onClick={validarYAvancar}>
                  Siguiente paso →
                </button>
              </div>
            </div>
          )}

          {/* PASO 2: FECHA */}
          {paso === 2 && (
            <div className="py-2">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="fw-bold text-dark m-0 fs-5">Selecciona una fecha</h4>
                <button 
                  className="btn btn-sm btn-outline-dark rounded-pill px-3 py-1" 
                  style={{ fontSize: '0.8rem' }}
                  onClick={() => setMostrarOcupados(!mostrarOcupados)}
                >
                  {mostrarOcupados ? 'Ocultar días ocupados' : 'Visualizar días ocupados'}
                </button>
              </div>

              <div className="row text-center my-3">
                <div className="col-md-6 border-end pe-md-3">
                  <h6 className="fw-semibold text-secondary mb-2" style={{ fontSize: '0.9rem' }}>Octubre {anioActual}</h6>
                  <div className="d-flex justify-content-between text-muted fw-bold mb-1" style={{ fontSize: '0.7rem' }}>
                    <span style={{width: '14%'}}>Lun</span><span style={{width: '14%'}}>Mar</span><span style={{width: '14%'}}>Mié</span><span style={{width: '14%'}}>Jue</span><span style={{width: '14%'}}>Vie</span><span style={{width: '14%'}}>Sáb</span><span style={{width: '14%'}}>Dom</span>
                  </div>
                  <div className="d-flex flex-wrap">
                    {matrizOctubre.flat().map((dia, idx) => {
                      if (!dia) return <div key={`oct-empty-${idx}`} style={{ width: '14.28%', height: '28px' }}></div>;
                      
                      const esMesPasado = mesActualIndex > 9;
                      const esHoyEnOctubre = (mesActualIndex === 9 && dia < diaActual);
                      const esPasado = esMesPasado || esHoyEnOctubre;
                      const esOcupado = mostrarOcupados && diasOcupadosOctubre.includes(dia);
                      const tachado = esPasado || esOcupado;
                      const fechaStr = `${dia} de Octubre, ${anioActual}`;
                      const seleccionado = reserva.fecha === fechaStr;

                      return (
                        <div key={`oct-${dia}`} className="p-1" style={{ width: '14.28%' }}>
                          <button 
                            type="button"
                            className={`btn btn-sm rounded-circle p-0 fw-semibold d-flex align-items-center justify-content-center mx-auto ${seleccionado ? 'bg-dark text-white shadow-sm' : 'btn-outline-dark'}`} 
                            style={{ 
                              width: '28px', height: '28px', fontSize: '0.75rem',
                              borderColor: seleccionado ? '#121417' : '#ced4da',
                              textDecoration: tachado ? 'line-through' : 'none',
                              opacity: tachado ? 0.35 : 1
                            }}
                            onClick={() => { if (!tachado) setReserva({ ...reserva, fecha: fechaStr }); }}
                          >
                            {dia}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="col-md-6 ps-md-3">
                  <h6 className="fw-semibold text-dark mb-2" style={{ fontSize: '0.9rem' }}>Noviembre {anioActual}</h6>
                  <div className="d-flex justify-content-between text-muted fw-bold mb-1" style={{ fontSize: '0.7rem' }}>
                    <span style={{width: '14%'}}>Lun</span><span style={{width: '14%'}}>Mar</span><span style={{width: '14%'}}>Mié</span><span style={{width: '14%'}}>Jue</span><span style={{width: '14%'}}>Vie</span><span style={{width: '14%'}}>Sáb</span><span style={{width: '14%'}}>Dom</span>
                  </div>
                  <div className="d-flex flex-wrap">
                    {matrizNoviembre.flat().map((dia, idx) => {
                      if (!dia) return <div key={`nov-empty-${idx}`} style={{ width: '14.28%', height: '28px' }}></div>;
                      
                      const esMesPasado = mesActualIndex > 10;
                      const esMismoMesAntesDeHoy = (mesActualIndex === 10 && dia < diaActual);
                      const esPasado = esMesPasado || esMismoMesAntesDeHoy;
                      const esOcupado = mostrarOcupados && diasOcupadosNoviembre.includes(dia);
                      const tachado = esPasado || esOcupado;
                      const fechaStr = `${dia} de Noviembre, ${anioActual}`;
                      const seleccionado = reserva.fecha === fechaStr;

                      return (
                        <div key={`nov-${dia}`} className="p-1" style={{ width: '14.28%' }}>
                          <button 
                            type="button"
                            className={`btn btn-sm rounded-circle p-0 fw-semibold d-flex align-items-center justify-content-center mx-auto ${seleccionado ? 'bg-dark text-white shadow-sm' : 'btn-outline-dark'}`} 
                            style={{ 
                              width: '28px', height: '28px', fontSize: '0.75rem',
                              borderColor: seleccionado ? '#121417' : '#ced4da',
                              textDecoration: tachado ? 'line-through' : 'none',
                              opacity: tachado ? 0.35 : 1
                            }}
                            onClick={() => { if (!tachado) setReserva({ ...reserva, fecha: fechaStr }); }}
                          >
                            {dia}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                <button className="btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark" onClick={validarYAvancar}>Siguiente paso →</button>
              </div>
            </div>
          )}

          {/* PASO 3: HORA */}
          {paso === 3 && (
            <div className="py-2">
              <h4 className="fw-bold mb-1 text-center text-dark fs-5">Elige una hora para el {reserva.fecha}</h4>
              <p className="text-center text-muted small mb-3">
                Las horas anteriores a la actual aparecen deshabilitadas.
              </p>
              
              <div className="row g-2 justify-content-center my-3">
                {horasOp.map(h => {
                  const esHoy = reserva.fecha.includes(`${diaActual} de ${mesActualNombre}`);
                  const horaPasada = esHoy && h.minutos < horaActualMinutos;
                  const seleccionado = reserva.hora === h.label;

                  return (
                    <div className="col-auto" key={h.label}>
                      <button
                        type="button"
                        className={`btn btn-sm px-3 py-2 rounded-pill ${seleccionado ? 'btn-dark text-white fw-bold' : 'btn-outline-secondary text-dark'}`}
                        style={{ 
                          fontSize: '0.85rem', minWidth: '95px',
                          textDecoration: horaPasada ? 'line-through' : 'none',
                          opacity: horaPasada ? 0.4 : 1
                        }}
                        onClick={() => { if (!horaPasada) setReserva({ ...reserva, hora: h.label }); }}
                      >
                        {h.label}
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                <button 
                  className={`btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark ${!reserva.hora ? 'opacity-50' : ''}`} 
                  onClick={validarYAvancar}
                  disabled={!reserva.hora}
                >
                  Siguiente paso →
                </button>
              </div>
            </div>
          )}

          {/* PASO 4: ZONA */}
          {paso === 4 && (
            <div className="py-2">
              <h4 className="fw-bold mb-2 text-dark fs-5">¿Dónde prefieres ubicarte?</h4>
              <div className="row g-3 justify-content-center my-3">
                {['Adentro', 'Terraza'].map(z => (
                  <div className="col-md-5" key={z}>
                    <div
                      className={`p-4 rounded border text-center cursor-pointer shadow-sm ${reserva.zona === z ? 'border-dark bg-dark text-white fw-bold' : 'border-secondary border-opacity-25 bg-white text-dark'}`}
                      style={{ cursor: 'pointer', transition: '0.2s' }}
                      onClick={() => setReserva({ ...reserva, zona: z, mesa: null })}
                    >
                      <h5 className="fw-bold mb-1">{z === 'Adentro' ? '🏛️ Salón Principal' : '🌿 Terraza al Aire Libre'}</h5>
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                <button className="btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark" onClick={validarYAvancar}>Siguiente paso →</button>
              </div>
            </div>
          )}

          {/* PASO 5: MESA */}
          {paso === 5 && (
            <div className="py-2">
              <h4 className="fw-bold mb-2 text-dark fs-5">Elige tu mesa en {reserva.zona}</h4>
              <div className="row g-3 my-3">
                {mesasDisponibles
                  .filter(m => m.zona === reserva.zona)
                  .map(mesa => {
                    const capacidadInsuficiente = mesa.capacidad < reserva.personas;
                    const estaOcupada = mesa.ocupada || capacidadInsuficiente;
                    const seleccionada = reserva.mesa === mesa.numero;

                    return (
                      <div className="col-md-6" key={mesa.id}>
                        <div
                          className={`p-3 rounded border d-flex justify-content-between align-items-center ${
                            seleccionada 
                              ? 'border-dark bg-dark text-white shadow' 
                              : estaOcupada 
                              ? 'bg-light border-secondary border-opacity-10 text-muted' 
                              : 'bg-white border-secondary border-opacity-25 text-dark'
                          }`}
                          style={{ 
                            opacity: estaOcupada ? 0.45 : 1, 
                            cursor: estaOcupada ? 'not-allowed' : 'pointer',
                            textDecoration: estaOcupada ? 'line-through' : 'none'
                          }}
                          onClick={() => { if (!estaOcupada) setReserva({ ...reserva, mesa: mesa.numero }); }}
                        >
                          <div>
                            <h6 className="fw-bold mb-1">{mesa.numero}</h6>
                            <span className="small">Capacidad: hasta {mesa.capacidad} personas</span>
                          </div>
                          <div>
                            <span className={`badge ${seleccionada ? 'bg-warning text-dark' : estaOcupada ? 'bg-secondary' : 'bg-success'}`}>
                              {estaOcupada ? 'No apto' : 'Disponible'}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                <button className="btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark" onClick={validarYAvancar}>Siguiente paso →</button>
              </div>
            </div>
          )}

          {/* PASO 6: DETALLES */}
          {paso === 6 && (
            <div className="py-2">
              <h4 className="fw-bold mb-2 text-dark fs-5">Ayúdanos a personalizar tu experiencia</h4>
              <p className="text-muted small mb-3">Completa tus datos y haz clic en "Ir al último paso"</p>
              
              <div className="mb-3">
                <label className="form-label small fw-semibold text-secondary">¿Tienes algún requerimiento o necesidad especial? *</label>
                <select 
                  className="form-select form-select-sm bg-white border-secondary border-opacity-25 mb-3"
                  value={reserva.motivo}
                  onChange={e => setReserva({ ...reserva, motivo: e.target.value })}
                >
                  <option value="">Seleccionar respuesta</option>
                  {motivosOp.map(m => (
                    <option key={m} value={m}>{m}</option>
                  ))}
                </select>

                <label className="form-label small fw-semibold text-secondary">¿Hay alguna alergia intolerancia o restricción que debamos considerar? (Opcional)</label>
                <textarea 
                  className="form-control form-control-sm bg-white border-secondary border-opacity-25 mb-3" 
                  rows="2"
                  value={reserva.alergias}
                  onChange={e => setReserva({ ...reserva, alergias: e.target.value })}
                ></textarea>

                <label className="form-label small fw-semibold text-secondary">¿Alguna necesidad que debamos tomar en cuenta? (Opcional)</label>
                <input 
                  type="text"
                  className="form-control form-control-sm bg-white border-secondary border-opacity-25 mb-2"
                  placeholder="Esta opción no aplica para solicitudes de incremento del número de comensales."
                  value={reserva.requerimiento}
                  onChange={e => setReserva({ ...reserva, requerimiento: e.target.value })}
                />
              </div>

              <div className="d-flex justify-content-between mt-4 pt-3 border-top">
                <button className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                <button 
                  className={`btn btn-sm text-white fw-semibold px-4 rounded-0 bg-dark ${!reserva.motivo ? 'opacity-50' : ''}`} 
                  onClick={validarYAvancar}
                  disabled={!reserva.motivo}
                >
                  IR AL ÚLTIMO PASO →
                </button>
              </div>
            </div>
          )}

          {/* PASO 7: DATOS Y TARJETA (CON RESTRICCIONES DE INPUT) */}
          {paso === 7 && (
            <div className="py-2">
              <h4 className="fw-bold mb-1 text-dark fs-5">¡Ya casi terminas!</h4>
              <p className="text-muted small mb-3">Completa tus datos de contacto y garantía de reserva.</p>

              <div className="row g-3">
                <div className="col-lg-7 border-end pe-lg-3">
                  <form onSubmit={handleSubmit}>
                    
                    <div className="row g-2 mb-3">
                      <div className="col-md-6">
                        <label className="form-label small text-secondary mb-1">Nombre</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          required
                          value={reserva.nombre}
                          onChange={e => setReserva({ ...reserva, nombre: e.target.value })}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small text-secondary mb-1">Apellidos</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          required
                          value={reserva.apellidos}
                          onChange={e => setReserva({ ...reserva, apellidos: e.target.value })}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label small text-secondary mb-1">Email</label>
                        <input 
                          type="email" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          required
                          value={reserva.email}
                          onChange={e => setReserva({ ...reserva, email: e.target.value })}
                        />
                      </div>
                      <div className="col-md-12">
                        <label className="form-label small text-secondary mb-1">Número de teléfono</label>
                        <input 
                          type="tel" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          required
                          value={reserva.telefono}
                          onChange={e => setReserva({ ...reserva, telefono: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="p-3 mb-3 rounded bg-white border border-secondary border-opacity-10 small shadow-sm">
                      <div className="d-flex justify-content-between fw-bold text-dark mb-1">
                        <span>POLÍTICAS DE CANCELACIÓN</span>
                        <span className="text-dark">S/ 100.00</span>
                      </div>
                      <p className="text-muted mb-0" style={{ fontSize: '0.72rem', lineHeight: '1.4' }}>
                        Su reserva exige una garantía de S/ 100.00. No se realizará ningún cobro hoy.
                      </p>
                    </div>

                    <div className="row g-2 mb-3">
                      {/* NÚMERO DE TARJETA: Solo números, máximo 16 dígitos */}
                      <div className="col-12">
                        <label className="form-label small text-secondary mb-1">Número de Tarjeta</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          placeholder="4532000000000000"
                          maxLength="16"
                          required
                          value={reserva.numeroTarjeta}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, ''); // Solo números
                            if (val.length <= 16) {
                              setReserva({ ...reserva, numeroTarjeta: val });
                            }
                          }}
                        />
                      </div>

                      {/* EXPIRACIÓN: Autocompleta el "/" y máximo 5 caracteres (MM/AA) */}
                      <div className="col-6">
                        <label className="form-label small text-secondary mb-1">Expiración (MM/AA)</label>
                        <input 
                          type="text" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          placeholder="MM/AA"
                          maxLength="5"
                          required
                          value={reserva.expiracion}
                          onChange={e => {
                            let val = e.target.value.replace(/\D/g, ''); // Solo números
                            if (val.length >= 3) {
                              val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            }
                            setReserva({ ...reserva, expiracion: val });
                          }}
                        />
                      </div>

                      {/* CVV: Tipo password (asteriscos), solo números y máximo 3 dígitos */}
                      <div className="col-6">
                        <label className="form-label small text-secondary mb-1">CVV</label>
                        <input 
                          type="password" 
                          className="form-control form-control-sm bg-white border-secondary border-opacity-25" 
                          placeholder="123"
                          maxLength="3"
                          required
                          value={reserva.cvv}
                          onChange={e => {
                            const val = e.target.value.replace(/\D/g, ''); // Solo números
                            if (val.length <= 3) {
                              setReserva({ ...reserva, cvv: val });
                            }
                          }}
                        />
                      </div>
                    </div>

                    <div className="form-check mt-2">
                      <input 
                        type="checkbox" 
                        className="form-check-input" 
                        id="terms" 
                        required 
                        checked={terminos}
                        onChange={e => setTerminos(e.target.checked)}
                      />
                      <label className="form-check-label small text-muted" htmlFor="terms" style={{ fontSize: '0.75rem' }}>
                        Acepto los términos, condiciones y políticas de privacidad.
                      </label>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top">
                      <button type="button" className="btn btn-outline-secondary btn-sm rounded-0 px-3" onClick={retroceder}>← Regresar</button>
                      <button type="submit" className="btn btn-sm text-white fw-bold px-4 py-2 rounded-0 shadow-sm bg-dark">
                        CONFIRMAR Y GARANTIZAR RESERVA
                      </button>
                    </div>
                  </form>
                </div>

                <div className="col-lg-5 ps-lg-3 d-flex flex-column justify-content-between">
                  <div className="p-3 rounded bg-white border border-secondary border-opacity-10 shadow-sm">
                    <h6 className="fw-bold text-dark mb-1">Sabor & Arte</h6>
                    <p className="small text-muted mb-2" style={{ fontSize: '0.8rem' }}>Miraflores, Lima</p>
                    <hr className="border-secondary opacity-25 my-2" />
                    <ul className="list-unstyled small text-secondary mb-0" style={{ fontSize: '0.8rem' }}>
                      <li className="py-1 d-flex justify-content-between"><span>Comensales:</span> <strong className="text-dark">{reserva.personas} pers.</strong></li>
                      <li className="py-1 d-flex justify-content-between"><span>Fecha:</span> <strong className="text-dark">{reserva.fecha}</strong></li>
                      <li className="py-1 d-flex justify-content-between"><span>Hora:</span> <strong className="text-dark">{reserva.hora}</strong></li>
                      <li className="py-1 d-flex justify-content-between"><span>Zona:</span> <strong className="text-dark">{reserva.zona}</strong></li>
                      <li className="py-1 d-flex justify-content-between"><span>Mesa:</span> <strong className="text-dark">{reserva.mesa}</strong></li>
                      <li className="py-1 d-flex justify-content-between"><span>Motivo:</span> <strong className="text-dark">{reserva.motivo}</strong></li>
                    </ul>
                  </div>
                  <div className="mt-2 text-center">
                    <span className="small text-light text-opacity-75" style={{ fontSize: '0.70rem' }}>🔒 Tus datos y tarjeta están protegidos y garantizados de forma segura.</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}