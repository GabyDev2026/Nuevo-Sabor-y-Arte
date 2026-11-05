import React from 'react';
import { Link } from 'react-router-dom';
import EncabezadoSeccion from './EncabezadoSeccion';
import ImagenFondo from './ImagenFondo';
import HorarioAtencion from './HorarioAtencion';
import { COLORES } from '../datos/colores';
import './styles.css';

const EQUIPO = [
  { nombre: 'Chef Juan Pérez', cargo: 'Maestro Culinario', foto: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Ana Díaz', cargo: 'Sommelier en Vinos', foto: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Carlos Ruiz', cargo: 'Experto en Vinos', foto: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Sofía Morales', cargo: 'Jefe de Sala', foto: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop' },
  { nombre: 'Miguel Ángel', cargo: 'Sous Chef', foto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop' },
];

const estiloBotonContorno = {
  backgroundColor: 'transparent',
  border: `1px solid ${COLORES.marron}`,
  color: COLORES.marron,
  letterSpacing: '1px',
  fontSize: '0.75rem',
};

// Tarjeta crema reutilizable: título, contenido y botón
function TarjetaCrema({ titulo, enlace, textoBoton, children }) {
  return (
    <div
      className="p-4 rounded shadow-sm h-100 d-flex flex-column justify-content-between"
      style={{ backgroundColor: COLORES.cremaTarjeta, border: '1px solid #e6dec9', minHeight: '240px' }}
    >
      <div>
        <h4 className="fw-bold mb-3 fs-5" style={{ color: COLORES.marron, fontFamily: 'serif' }}>
          {titulo}
        </h4>
        {children}
      </div>
      <div>
        <Link to={enlace} className="btn btn-sm text-uppercase px-3 py-1 fw-semibold rounded-0" style={estiloBotonContorno}>
          {textoBoton}
        </Link>
      </div>
    </div>
  );
}

export default function Nosotros({ horarios }) {
  return (
    <div className="bg-white text-dark">
      <div className="container py-5">

        <EncabezadoSeccion
          etiqueta="Nuestra historia"
          titulo="Más que un restaurante, una experiencia"
          descripcion="Lo que comenzó como la pasión por fusionar la alta cocina peruana con técnicas contemporáneas es hoy un punto de encuentro para quienes buscan momentos inolvidables."
        />

        {/* HISTORIA */}
        <div className="row align-items-center g-5 my-3">
          <div className="col-lg-6">
            <ImagenFondo url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000&auto=format&fit=crop" />
          </div>
          <div className="col-lg-6">
            <h3 className="fw-bold mb-3">Tradición, arte y sabor en Lima</h3>
            <p className="text-secondary mb-3">
              En <strong>Sabor & Arte</strong> creemos que la buena comida no solo se disfruta, se vive.
              Cada plato está minuciosamente pensado para despertar tus sentidos, honrando los insumos
              locales de nuestra tierra y elevándolos a un nivel gastronómico superior.
            </p>
            <p className="text-secondary mb-4">
              Nuestro ambiente cálido y sofisticado está diseñado para ofrecerte quietud y elegancia,
              convirtiendo cada almuerzo o cena en una celebración memorable para ti y los tuyos.
            </p>
            <div className="p-3 rounded border-start border-4 border-dark bg-light shadow-sm">
              <p className="fst-italic mb-0">
                &ldquo;En nuestra cocina, cuidamos la esencia de cada producto; porque el verdadero arte
                culinario nace del respeto por el sabor genuino.&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* EQUIPO */}
        <div className="py-5 my-4">
          <div className="text-center mb-5">
            <h2 className="fw-bold mb-2">Nuestro equipo</h2>
            <p className="text-secondary small">El talento y la dedicación detrás de cada plato</p>
          </div>

          <div className="row g-4 text-center justify-content-center">
            {EQUIPO.map((persona) => (
              <div className="col-lg-2 col-md-4 col-sm-6" key={persona.nombre}>
                <div className="p-3 rounded bg-light border h-100 shadow-sm">
                  <div className="mb-3">
                    <ImagenFondo url={persona.foto} alto="140px" />
                  </div>
                  <h6 className="fw-bold mb-1">{persona.nombre}</h6>
                  <p className="small text-secondary mb-0">{persona.cargo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COCINA */}
        <div className="row align-items-center g-5 my-4">
          <div className="col-lg-6 order-lg-2">
            <ImagenFondo url="https://images.unsplash.com/photo-1507048331137-7a3c987ea6a3?q=80&w=1000&auto=format&fit=crop" />
          </div>
          <div className="col-lg-6 order-lg-1">
            <h2 className="fw-bold mb-4">Nuestra cocina</h2>
            <p className="text-secondary mb-3">
              Equipada con tecnología de vanguardia y un ambiente donde impera el orden y la disciplina,
              nuestra cocina es el laboratorio creativo de donde surgen verdaderas obras de arte culinarias.
            </p>
            <p className="text-secondary mb-4">
              Cuidamos cada estándar de calidad e higiene para garantizar que cada plato cumpla con las
              altas expectativas de nuestros visitantes.
            </p>
            <Link to="/reservas" className="btn btn-dark text-uppercase px-4 py-2 fw-semibold rounded-0 shadow-sm">
              Reservar tu mesa &rarr;
            </Link>
          </div>
        </div>

        {/* TARJETAS */}
        <div className="row g-4 mt-5 justify-content-center">
          <div className="col-lg-4 col-md-6">
            <TarjetaCrema titulo="Conoce nuestra carta" enlace="/menu" textoBoton="Ver la carta">
              <p className="small mb-4" style={{ color: '#665c54' }}>
                Disfrute del sabor y aromas de la tradicional alta cocina en un ambiente cálido y estimulante.
              </p>
            </TarjetaCrema>
          </div>

          <div className="col-lg-4 col-md-6">
            <TarjetaCrema titulo="Reservas en local" enlace="/reservas" textoBoton="Reservar tu mesa">
              {/* ESTA ES LA LÍNEA QUE PREGUNTASTE */}
              <HorarioAtencion horarios={horarios} className="small text-secondary mb-4" />
            </TarjetaCrema>
          </div>
        </div>

      </div>
    </div>
  );
}