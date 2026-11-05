import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Nosotros from './Components/Nosotros';
import Menu from './Components/Menu';
import Galeria from './Components/Galeria';
import Reservas from './Components/Reservas';
import Disponibilidad from './Components/Disponibilidad';
import Contacto from './Components/Contacto';
import Footer from './Components/Footer';
import Login from './Components/Login';
import Intranet from './Components/Intranet';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ocultarLayout = location.pathname === '/login' || location.pathname.startsWith('/intranet');

  // Función para manejar el cierre de sesión y redirigir al login
  const handleLogout = () => {
    // Aquí puedes limpiar tokens o estados de sesión si los tienes (ej: localStorage.removeItem('token'))
    navigate('/login');
  };

  return (
    <>
      {!ocultarLayout && <Navegacion />}
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/galeria" element={<Galeria />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="/disponibilidad" element={<Disponibilidad />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
        <Route path="/intranet" element={<Intranet onLogout={handleLogout} />} />
      </Routes>
      {!ocultarLayout && <Footer />}
    </>
  );
};

export const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;