import React, { useState } from 'react';

export const Reservas = ({ mesas, reservas, horarios, agregarReserva }) => {
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mesaId, setMesaId] = useState('');
  const [personas, setPersonas] = useState(2);
  const [observaciones, setObservaciones] = useState('');
  const [mensaje, setMensaje] = useState(null);

  // Filtrar mesas disponibles o mostrar el formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre || !telefono || !fecha || !hora || !mesaId) {
      setMensaje({ ok: false, texto: 'Por favor completa todos los campos obligatorios.' });
      return;
    }

    const datosReserva = {
      cliente: nombre,
      telefono,
      fecha,
      hora,
      mesaId: parseInt(mesaId),
      personas: parseInt(personas),
      observaciones
    };

    const resultado = agregarReserva(datosReserva);

    if (resultado.ok) {
      setMensaje({ 
        ok: true, 
        texto: `¡Reserva exitosa! Tu código de confirmación es #${resultado.reserva.id}.` 
      });
      // Limpiar formulario
      setNombre('');
      setTelefono('');
      setFecha('');
      setHora('');
      setMesaId('');
      setPersonas(2);
      setObservaciones('');
    } else {
      setMensaje({ ok: false, texto: resultado.error });
    }
  };

  return (
    <div className="container" style={{ paddingTop: '130px', paddingBottom: '60px', maxWidth: '800px' }}>
      <div className="card shadow-sm p-4 border-0" style={{ backgroundColor: '#fffdf9' }}>
        <h2 className="text-center mb-4" style={{ color: '#2c3e50', fontWeight: 'bold' }}>
          Reserva tu Mesa en Sabor & Arte
        </h2>
        <p className="text-center text-muted mb-4">
          Disfruta de la mejor experiencia gastronómica asegurando tu espacio con anticipación.
        </p>

        {mensaje && (
          <div className={`alert ${mensaje.ok ? 'alert-success' : 'alert-danger'}`} role="alert">
            {mensaje.texto}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Nombre Completo</label>
              <input
                type="text"
                className="form-control"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Ej. Carlos Mendoza"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">Teléfono / Celular</label>
              <input
                type="tel"
                className="form-control"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="Ej. +51 987654321"
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Fecha</label>
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Hora</label>
              <select
                className="form-select"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
                required
              >
                <option value="">Selecciona una hora</option>
                {horarios.map((h, index) => (
                <option key={index} value={h.apertura}>
                    {h.nombre || h.dia}: {h.abierto ? `${h.apertura} - ${h.cierre}` : 'Cerrado'}
                </option>
))}
              </select>
            </div>
            <div className="col-md-4 mb-3">
              <label className="form-label fw-bold">Cantidad de Personas</label>
              <input
                type="number"
                className="form-control"
                min="1"
                max="12"
                value={personas}
                onChange={(e) => setPersonas(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Seleccionar Mesa</label>
            <select
              className="form-select"
              value={mesaId}
              onChange={(e) => setMesaId(e.target.value)}
              required
            >
              <option value="">Elige una mesa disponible</option>
              {mesas.map((mesa) => (
                <option key={mesa.id} value={mesa.id}>
                  Mesa {mesa.id} - Capacidad: {mesa.capacidad} personas ({mesa.ubicacion || 'Salón principal'})
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="form-label fw-bold">Observaciones o Requerimientos Especiales</label>
            <textarea
              className="form-control"
              rows="3"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej. Silla para infante, celebración de cumpleaños..."
            ></textarea>
          </div>

          <button
            type="submit"
            className="btn w-100 py-2 fw-bold text-white"
            style={{ backgroundColor: '#2c3e50', transition: 'background 0.3s' }}
          >
            Confirmar y Guardar Reserva
          </button>
        </form>
      </div>
    </div>
  );
};

export default Reservas;