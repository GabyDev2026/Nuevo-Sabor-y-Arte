import React, { useState, useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import PanelResumen from './admin/PanelResumen';
import PanelReservas from './admin/PanelReservas';
import PanelMesas from './admin/PanelMesas';
import PanelPlatos from './admin/PanelPlatos';
import PanelHorarios from './admin/PanelHorarios';
import PanelReportes from './admin/PanelReportes';

import { COLORES } from '../datos/colores';
import { CLAVE_SESION } from '../datos/config';
import { fechaLocalISO } from '../utilidades/fechas';
import { estaAbierto, horarioDelDia } from '../utilidades/reservas';

const SECCIONES = [
  { id: 'resumen', titulo: 'Dashboard', icono: '📊' },
  { id: 'reservas', titulo: 'Reservas', icono: '📅' },
  { id: 'mesas', titulo: 'Mesas', icono: '🪑' },
  { id: 'platos', titulo: 'Platos', icono: '🍽️' },
  { id: 'horarios', titulo: 'Horarios', icono: '⏰' },
  { id: 'reportes', titulo: 'Reportes', icono: '📈' },
];

export function Panel({
  platos, setPlatos,
  mesas, setMesas,
  horarios, setHorarios,
  reservas, setReservas,
}) {
  const navigate = useNavigate();
  const [seccionActiva, setSeccionActiva] = useState('resumen');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [ahora, setAhora] = useState(new Date());
  const [mensaje, setMensaje] = useState('');

  // El reloj se actualiza cada 30 segundos
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 30000);
    return () => clearInterval(reloj);
  }, []);

  // El aviso flotante desaparece a los 3 segundos
  useEffect(() => {
    if (!mensaje) return;
    const temporizador = setTimeout(() => setMensaje(''), 3000);
    return () => clearTimeout(temporizador);
  }, [mensaje]);

  // Si no se inició sesión, vuelve al login
  if (!sessionStorage.getItem(CLAVE_SESION)) {
    return <Navigate to="/login" />;
  }

  const abierto = estaAbierto(horarios, ahora);
  const horarioHoy = horarioDelDia(horarios, fechaLocalISO(ahora));
  const textoHorario =
    horarioHoy && horarioHoy.abierto
      ? `Hoy: ${horarioHoy.apertura} - ${horarioHoy.cierre}`
      : 'Hoy no se atiende';

  // Función para hacer scroll suave al hacer clic en el menú lateral
  const hacerScrollA = (id) => {
    setSeccionActiva(id);
    setMenuAbierto(false);

    const elemento = document.getElementById(`seccion-${id}`);
    if (elemento) {
      elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const salir = () => {
    sessionStorage.removeItem(CLAVE_SESION);
    navigate('/login');
  };

  return (
    <div className="row g-0 min-vh-100" style={{ backgroundColor: COLORES.crema }}>

      {/* BARRA LATERAL FIJA */}
      <aside
        className={`col-lg-3 col-xl-2 flex-column p-4 text-white position-sticky top-0 vh-100 ${menuAbierto ? 'd-flex' : 'd-none d-lg-flex'}`}
        style={{ backgroundColor: COLORES.negro, zIndex: 1000 }}
      >
        <div className="mb-5 d-flex align-items-center">
          <div className="fw-bold fs-4" style={{ color: COLORES.doradoClaro, fontFamily: 'Georgia, serif', lineHeight: '1.2' }}>
            Sabor &<br />Arte
          </div>
        </div>

        <nav aria-label="Secciones del panel" className="d-flex flex-column gap-2 mb-auto">
          {SECCIONES.map((s) => {
            const activa = s.id === seccionActiva;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => hacerScrollA(s.id)}
                aria-current={activa ? 'page' : undefined}
                className={`btn text-start py-2 px-3 rounded-2 fw-semibold d-flex align-items-center ${activa ? 'text-white' : 'text-secondary'}`}
                style={{
                  backgroundColor: activa ? 'rgba(197, 168, 128, 0.15)' : 'transparent',
                  borderLeft: activa ? `4px solid ${COLORES.doradoClaro}` : '4px solid transparent',
                  transition: 'all 0.2s',
                  fontSize: '0.95rem'
                }}
              >
                <span className="me-3" aria-hidden="true" style={{ fontSize: '1.1rem' }}>{s.icono}</span>
                {s.titulo}
              </button>
            );
          })}
        </nav>

        <div className="border-top border-secondary pt-3 mt-4 d-flex flex-column gap-2">
          <Link to="/" className="btn btn-outline-light btn-sm text-start py-2">🌐 Ver sitio web</Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL CON SCROLL CONTINUO */}
      <main className="col-lg-9 col-xl-10 d-flex flex-column">

        {/* NAVBAR SUPERIOR FIJO AL TOPE */}
        <header className="d-flex align-items-center justify-content-between bg-white border-bottom px-4 py-3 sticky-top shadow-sm" style={{ zIndex: 999 }}>
          <div className="d-flex align-items-center gap-3">
            <button
              type="button"
              className="btn btn-outline-dark d-lg-none btn-sm"
              aria-label="Abrir menú"
              onClick={() => setMenuAbierto(!menuAbierto)}
            >
              ☰
            </button>
            <div>
              <span className="text-muted text-uppercase fw-semibold" style={{ fontSize: '10px', letterSpacing: '1px' }}>
                Panel Administrativo
              </span>
              <h1 className="h6 fw-bold text-dark mb-0">Sabor & Arte Intranet</h1>
            </div>
          </div>

          <div className="d-flex align-items-center gap-3">
            <span className={`badge rounded-pill px-3 py-2 ${abierto ? 'bg-success' : 'bg-danger'}`}>
              {abierto ? 'Abierto ahora' : 'Cerrado ahora'}
            </span>
            <div className="rounded-circle text-white d-flex align-items-center justify-content-center fw-bold shadow-sm" 
                 style={{ width: '35px', height: '35px', backgroundColor: COLORES.negro, color: COLORES.doradoClaro, fontSize: '0.85rem' }}>
              A
            </div>
            <div className="d-none d-md-flex flex-column" style={{ lineHeight: '1.2' }}>
              <span className="fw-bold text-dark" style={{ fontSize: '0.85rem' }}>Administrador</span>
              <small className="text-muted" style={{ fontSize: '10px' }}>Sabor & Arte</small>
            </div>
            <button 
              type="button" 
              className="btn btn-outline-secondary btn-sm px-3 ms-2" 
              style={{ fontSize: '0.8rem' }}
              onClick={salir}
            >
              Cerrar sesión
            </button>
          </div>
        </header>

        {/* TODAS LAS SECCIONES RENDERIZADAS EN UNA SOLA PÁGINA CON SCROLL */}
        <div className="p-3 p-md-5 d-flex flex-column gap-5 flex-grow-1">
          
          <section id="seccion-resumen">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">📊 Dashboard y Resumen</h4>
            <PanelResumen
              reservas={reservas}
              mesas={mesas}
              platos={platos}
              ahora={ahora}
              irA={hacerScrollA}
            />
          </section>

          <section id="seccion-reservas" className="pt-3">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">📅 Gestión de Reservas</h4>
            <PanelReservas
              mesas={mesas}
              reservas={reservas}
              setReservas={setReservas}
              horarios={horarios}
              avisar={setMensaje}
            />
          </section>

          <section id="seccion-mesas" className="pt-3">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">🪑 Administración de Mesas</h4>
            <PanelMesas 
              mesas={mesas} 
              setMesas={setMesas} 
              reservas={reservas} 
              avisar={setMensaje} 
            />
          </section>

          <section id="seccion-platos" className="pt-3">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">🍽️ Carta de Platos</h4>
            <PanelPlatos 
              platos={platos} 
              setPlatos={setPlatos} 
              avisar={setMensaje} 
            />
          </section>

          <section id="seccion-horarios" className="pt-3">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">⏰ Configuración de Horarios</h4>
            <PanelHorarios 
              horarios={horarios} 
              setHorarios={setHorarios} 
              avisar={setMensaje} 
            />
          </section>

          <section id="seccion-reportes" className="pt-3 pb-5">
            <h4 className="fw-bold mb-4 text-dark border-bottom pb-2">📈 Reportes y Estadísticas</h4>
            <PanelReportes 
              reservas={reservas} 
              mesas={mesas} 
            />
          </section>

        </div>
      </main>

      {/* AVISO FLOTANTE */}
      {mensaje && (
        <div
          className="alert alert-dark shadow position-fixed bottom-0 end-0 m-3"
          role="status"
          style={{ zIndex: 2000 }}
        >
          {mensaje}
        </div>
      )}

    </div>
  );
}

export default Panel;