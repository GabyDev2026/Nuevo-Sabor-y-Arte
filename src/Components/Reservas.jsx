import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <--- Importa useNavigate

export default function Reservas() {
  const navigate = useNavigate(); // <--- Inicializa el hook de navegación

  const [formData, setFormData] = useState({ 
    cliente: '', 
    email: '', 
    fecha: '', 
    hora: '', 
    personas: '2' 
  });

  // Validar si todos los campos requeridos están completos
  const isFormValid = formData.cliente.trim() !== '' && 
                      formData.email.trim() !== '' && 
                      formData.fecha !== '' && 
                      formData.hora !== '';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    // Redirecciona a la página de disponibilidad y opcionalmente pasa los datos con state
    navigate('/disponibilidad', { state: { reservaData: formData } });
  };

  return (
    <div>
      <div className="container mt-5 pt-4">
        <div className="row mb-4 text-center" style={{ margin: '2.5rem 0 0 0' }}>
          <div className="col-md-12">
            <span className="text-warning text-uppercase fw-bold small" style={{ fontSize: '2rem' }}>Reservas</span>
            <h1 className="fw-bold">Tu mesa te espera</h1>
            <p className="text-muted">Haz tu reserva y disfruta de una experiencia gastronómica sin preocupaciones.</p>
          </div>
        </div>

        <div className="row justify-content-center" >
          <div className="col-md-7" >
            <div className="card shadow p-4 border-0" >
              <h4 className="mb-4 text-primary text-center" style={{fontSize:'2rem'}}>Reserva tu mesa</h4>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-bold">Nombre completo *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ej. Carlos Torres" 
                    required 
                    value={formData.cliente}
                    onChange={(e) => setFormData({ ...formData, cliente: e.target.value })} 
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Correo electrónico *</label>
                  <input 
                    type="email" 
                    className="form-control" 
                    placeholder="tu@correo.com" 
                    required 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Fecha de reserva *</label>
                    <input 
                      type="date" 
                      className="form-control" 
                      required 
                      value={formData.fecha}
                      onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} 
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-bold">Hora *</label>
                    <input 
                      type="time" 
                      className="form-control" 
                      required 
                      value={formData.hora}
                      onChange={(e) => setFormData({ ...formData, hora: e.target.value })} 
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-bold">Número de personas *</label>
                  <select 
                    className="form-select" 
                    value={formData.personas}
                    onChange={(e) => setFormData({ ...formData, personas: e.target.value })}
                  >
                    <option value="1">1 Persona</option>
                    <option value="2">2 Personas</option>
                    <option value="4">4 Personas</option>
                    <option value="6">6+ Personas</option>
                  </select>
                </div>

                {/* El botón se mantiene deshabilitado (disabled) si el formulario no está completo */}
                <button 
                  type="submit" 
                  className={`btn w-100 fw-bold py-2 text-dark ${!isFormValid ? 'btn-secondary opacity-50' : 'btn-warning'}`}
                  disabled={!isFormValid}
                >
                  Buscar disponibilidad y reservar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}