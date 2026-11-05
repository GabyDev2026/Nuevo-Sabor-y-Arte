import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [usuario, setUsuario] = useState('admin');
    const [contrasena, setContrasena] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Validación de credenciales
        if (usuario === 'admin' && contrasena === '123456') {
            setError('');
            if (onLogin) onLogin(); // Activa la sesión en App.js
            navigate('/panel');      // Redirige al panel administrativo
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="container-fluid vh-100 p-0">
            <div className="row g-0 h-100">
                
                {/* SECCIÓN IZQUIERDA: IMAGEN DE FONDO / HERO */}
                <div className="col-lg-7 d-none d-lg-flex position-relative bg-dark align-items-center justify-content-center text-white"
                     style={{
                         backgroundImage: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop")',
                         backgroundSize: 'cover',
                         backgroundPosition: 'center'
                     }}>
                    <div className="text-center p-5">
                        <span className="display-4 fw-bold tracking-wide" style={{ color: '#d4af37', fontFamily: 'Georgia, serif' }}>
                            SABOR & ARTE
                        </span>
                        <p className="lead text-light mt-2">Intranet y Gestión de Reservas</p>
                    </div>
                </div>

                {/* SECCIÓN DERECHA: FORMULARIO */}
                <div className="col-lg-5 d-flex align-items-center justify-content-center bg-white p-4 p-sm-5">
                    <div className="w-100" style={{ maxWidth: '400px' }}>
                        
                        <div className="mb-4">
                            <span className="text-muted text-uppercase fw-semibold" style={{ fontSize: '11px', letterSpacing: '1px' }}>
                                Intranet Exclusiva
                            </span>
                            <h2 className="fw-bold text-dark mt-1">Iniciar Sesión</h2>
                            <p className="text-muted small">
                                Ingresa tus credenciales para acceder al panel administrativo.
                            </p>
                        </div>

                        {error && (
                            <div className="alert alert-danger py-2 small fw-semibold" role="alert">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="usuario" className="form-label fw-semibold small">Usuario</label>
                                <input
                                    type="text"
                                    id="usuario"
                                    className="form-control"
                                    value={usuario}
                                    onChange={(e) => setUsuario(e.target.value)}
                                    placeholder="Ingrese su usuario"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label htmlFor="contrasena" className="form-label fw-semibold small">Contraseña</label>
                                <div className="input-group">
                                    <input
                                        type={mostrarPassword ? 'text' : 'password'}
                                        id="contrasena"
                                        className="form-control border-end-0"
                                        value={contrasena}
                                        onChange={(e) => setContrasena(e.target.value)}
                                        placeholder="Ingrese su contraseña"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-outline-secondary border-start-0 bg-white text-muted"
                                        onClick={() => setMostrarPassword(!mostrarPassword)}
                                        aria-label="Mostrar u ocultar contraseña"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                            <circle cx="12" cy="12" r="3"></circle>
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className="btn w-100 py-2 fw-bold text-white shadow-sm"
                                style={{ backgroundColor: '#2c3e50', transition: 'background 0.3s' }}
                            >
                                INGRESAR AL PANEL
                            </button>
                        </form>

                        <div className="text-center mt-4">
                            <Link to="/" className="text-decoration-none small fw-semibold text-muted">
                                ← Volver al sitio web
                            </Link>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;