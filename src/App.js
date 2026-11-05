import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';

import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Nosotros from './Components/Nosotros';
import Menu from './Components/Menu';
import Galeria from './Components/Galeria';
import { Reservas } from './Components/Reservas';
import Contacto from './Components/Contacto';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Panel from './Components/Panel';

import { CLAVES } from './datos/config';
import { platosIniciales } from './datos/platosIniciales';
import { mesasIniciales } from './datos/mesasIniciales';
import { horariosIniciales } from './datos/horariosIniciales';
import { reservasIniciales } from './datos/reservasIniciales';
import { cargar, guardar } from './utilidades/almacenamiento';
import { hayConflicto, generarId } from './utilidades/reservas';

const RUTAS_SIN_MENU = ['/login', '/panel'];

const TITULOS = {
  '/': 'Inicio',
  '/nosotros': 'Nosotros',
  '/menu': 'Carta',
  '/galeria': 'Galería',
  '/reservas': 'Reservas',
  '/contacto': 'Contacto',
  '/login': 'Intranet',
  '/panel': 'Panel administrativo',
};

const Contenido = () => {
  const { pathname } = useLocation();
  const mostrarMenu = !RUTAS_SIN_MENU.includes(pathname);

  const [platos, setPlatos] = useState(() => cargar(CLAVES.platos, platosIniciales));
  const [mesas, setMesas] = useState(() => cargar(CLAVES.mesas, mesasIniciales));
  const [horarios, setHorarios] = useState(() => cargar(CLAVES.horarios, horariosIniciales));
  const [reservas, setReservas] = useState(() => cargar(CLAVES.reservas, reservasIniciales));

  useEffect(() => { guardar(CLAVES.platos, platos); }, [platos]);
  useEffect(() => { guardar(CLAVES.mesas, mesas); }, [mesas]);
  useEffect(() => { guardar(CLAVES.horarios, horarios); }, [horarios]);
  useEffect(() => { guardar(CLAVES.reservas, reservas); }, [reservas]);

  // Una reserva hecha en otra pestaña aparece aquí sin recargar
  useEffect(() => {
    const alCambiar = (e) => {
      if (e.key === CLAVES.reservas && e.newValue) {
        setReservas(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', alCambiar);
    return () => window.removeEventListener('storage', alCambiar);
  }, []);

  // Al cambiar de página: título de la pestaña y volver arriba
  useEffect(() => {
    document.title = `${TITULOS[pathname] || 'Sabor y Arte'} | Sabor y Arte`;
    window.scrollTo(0, 0);
  }, [pathname]);

  const agregarReserva = (datos) => {
    if (hayConflicto(reservas, datos.mesaId, datos.fecha, datos.hora)) {
      return { ok: false, error: 'Esa mesa acaba de ser reservada. Elige otra mesa u otra hora.' };
    }
    const nueva = { ...datos, id: generarId(reservas), estado: 'confirmada' };
    setReservas([...reservas, nueva]);
    return { ok: true, reserva: nueva };
  };

  // Para quien navega con teclado: salta directo al contenido
  const irAlContenido = () => {
    const zona = document.getElementById('contenido');
    if (zona) zona.focus();
  };

  // En las páginas públicas la zona es <main>; el panel ya trae el suyo
  const Zona = mostrarMenu ? 'main' : 'div';

  return (
    <>
      {mostrarMenu && (
        <button
          type="button"
          className="visually-hidden-focusable btn btn-warning m-2"
          style={{ zIndex: 3000 }}
          onClick={irAlContenido}
        >
          Saltar al contenido
        </button>
      )}

      {mostrarMenu && <Navegacion />}

      <Zona id="contenido" tabIndex="-1" style={{ outline: 'none' }}>
        <Routes>
          <Route path="/" element={<Inicio platos={platos} />} />
          <Route path="/nosotros" element={<Nosotros horarios={horarios} />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route
            path="/reservas"
            element={
              <Reservas
                mesas={mesas}
                reservas={reservas}
                horarios={horarios}
                agregarReserva={agregarReserva}
              />
            }
          />
          <Route path="/contacto" element={<Contacto horarios={horarios} />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/panel"
            element={
              <Panel
                platos={platos} setPlatos={setPlatos}
                mesas={mesas} setMesas={setMesas}
                horarios={horarios} setHorarios={setHorarios}
                reservas={reservas} setReservas={setReservas}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Zona>

      {mostrarMenu && <Footer horarios={horarios} />}
    </>
  );
};

export const App = () => (
  <Router>
    <Contenido />
  </Router>
);

export default App;