import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORTAR EL HOOK DE NAVEGACIÓN
import './Login.css';

const Login = () => {
    const [usuario, setUsuario] = useState('admin');
    const [contrasena, setContrasena] = useState('');
    const [mostrarPassword, setMostrarPassword] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate(); // 2. INICIALIZAR EL HOOK DENTRO DEL COMPONENTE

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // AQUÍ DEFINES TU USUARIO Y CLAVE DE ACCESO
        if (usuario === 'admin' && contrasena === '123456') {
            setError('');
            navigate('/intranet'); // 3. REDIRECCIÓN EXITOSA AL PANEL
        } else {
            setError('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="login-container">
            {/* SECCIÓN IZQUIERDA: IMAGEN DE FONDO */}
            <div className="login-hero">
                <div className="login-hero-overlay">
                    <span className="brand-logo">SABORYARTE</span>
                </div>
            </div>

            {/* SECCIÓN DERECHA: FORMULARIO */}
            <div className="login-form-container">
                <div className="login-box">
                    <span className="subtitle">INTRANET SABOR Y ARTE</span>
                    <h2>INICIAR SESIÓN</h2>
                    <p className="description">
                        Ingresa tus credenciales para acceder al panel administrativo.
                    </p>

                    {error && <div style={{ color: '#d9534f', marginBottom: '15px', fontSize: '0.85rem', fontWeight: 'bold' }}>{error}</div>}

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label htmlFor="usuario">Usuario</label>
                            <input
                                type="text"
                                id="usuario"
                                value={usuario}
                                onChange={(e) => setUsuario(e.target.value)}
                                placeholder="Ingrese su usuario"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="contrasena">Contraseña</label>
                            <div className="password-input-wrapper">
                                <input
                                    type={mostrarPassword ? 'text' : 'password'}
                                    id="contrasena"
                                    value={contrasena}
                                    onChange={(e) => setContrasena(e.target.value)}
                                    placeholder="Ingrese su contraseña"
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password-btn"
                                    onClick={() => setMostrarPassword(!mostrarPassword)}
                                    aria-label="Mostrar u ocultar contraseña"
                                >
                                    <svg
                                        width="18"
                                        height="18"
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

                        <button type="submit" className="btn-submit">
                            INGRESAR AL PANEL
                        </button>
                    </form>

                    <a href="/" className="link-back">
                        ← Volver al sitio web
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;