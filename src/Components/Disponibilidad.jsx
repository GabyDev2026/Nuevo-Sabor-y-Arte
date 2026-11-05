import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Disponibilidad.css';

const Disponibilidad = () => {
    const location = useLocation();
    const navigate = useNavigate();
    
    // Extrae los datos enviados desde el formulario (si no existen, usa valores por defecto)
    const datosReserva = location.state?.reservaData || {
        fecha: '05 de noviembre de 2026',
        personas: '2',
        ubicacion: 'Salón principal'
    };

    const [selectedTime, setSelectedTime] = useState('7:00 PM');

    const slots = [
        { time: '7:00 PM', available: true },
        { time: '7:30 PM', available: false },
        { time: '8:00 PM', available: true },
        { time: '8:30 PM', available: true },
        { time: '9:00 PM', available: false },
        { time: '9:30 PM', available: true },
    ];

    return (
        <div className="page-wrapper">
        <div className="card-container">
            <header className="card-header">
            <span className="subtitle">RESERVAS MAYTA</span>
            <h1 className="title">DISPONIBILIDAD</h1>
            <p className="description">Revisa los horarios disponibles para tu reserva.</p>
            </header>

            {/* Stepper */}
            <div className="stepper">
            <div className="step step-active">1</div>
            <div className="step-line active"></div>
            <div className="step step-active">2</div>
            <div className="step-line"></div>
            <div className="step">3</div>
            <div className="step-line"></div>
            <div className="step">4</div>
            </div>

            {/* Resumen de reserva dinámico */}
            <div className="summary-section">
            <button className="btn-modify" onClick={() => navigate('/reservas')}>MODIFICAR</button>
            <div className="summary-grid">
                <div className="summary-item">
                <span className="label">FECHA</span>
                <span className="value">{datosReserva.fecha}</span>
                </div>
                <div className="summary-item">
                <span className="label">PERSONAS</span>
                <span className="value">{datosReserva.personas} personas</span>
                </div>
                <div className="summary-item">
                <span className="label">UBICACIÓN</span>
                <span className="value">{datosReserva.ubicacion}</span>
                </div>
            </div>
            </div>

            <div className="alert-banner">
            <div className="alert-icon">✓</div>
            <div>
                <strong>HAY DISPONIBILIDAD</strong>
                <p>Tenemos 4 horarios disponibles para la fecha seleccionada.</p>
            </div>
            </div>

            <div className="time-section">
            <h2 className="section-title">ELIGE UN HORARIO</h2>
            <div className="time-grid">
                {slots.map((slot, index) => (
                <button
                    key={index}
                    disabled={!slot.available}
                    className={`time-card ${!slot.available ? 'disabled' : ''} ${
                    selectedTime === slot.time && slot.available ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedTime(slot.time)}
                >
                    <span className="time-text">{slot.time}</span>
                    <span className="status-text">
                    {slot.available ? 'Disponible' : 'No disponible'}
                    </span>
                </button>
                ))}
            </div>
            </div>

            <footer className="card-footer">
            <button className="btn-secondary" onClick={() => navigate('/reservas')}>VOLVER</button>
            <button className="btn-primary" onClick={() => alert('¡Reserva completada!')}>CONTINUAR</button>
            </footer>
        </div>
        </div>
    );
};

export default Disponibilidad;