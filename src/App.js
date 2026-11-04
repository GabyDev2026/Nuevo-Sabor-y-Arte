import React from 'react'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Navegacion from './Components/Navegacion';
import Inicio from './Components/Inicio';
import Nosotros from './Components/Nosotros';
import Menu from './Components/Menu';
import Galeria from './Components/Galeria';
import { Reservas } from './Components/Reservas'; // <--- Corregido con llaves y en mayúsculas
import Contacto from './Components/Contacto';
import Footer from './Components/Footer';
import { Login } from './Components/Login';
import { Panel } from './Components/Panel';


export const App = () => {
  return (
    <Router>
      <Navegacion/>
      <Routes>
        <Route path="/" element={<Inicio/>} />
        <Route path="/nosotros" element={<Nosotros/>} />
        <Route path="/menu" element={<Menu/>} />
        <Route path="/galeria" element={<Galeria/>} />
        <Route path="/reservas" element={<Reservas/>} />
        <Route path="/contacto" element={<Contacto/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/panel" element={<Panel/>} />
      </Routes>
      <Footer/>  
    </Router>
  )
}

export default App;