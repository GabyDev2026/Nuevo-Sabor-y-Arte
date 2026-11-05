import React, { useState, useEffect } from 'react';
import EncabezadoSeccion from './EncabezadoSeccion';
import HorarioAtencion from './HorarioAtencion';
import EstadoAbierto from './EstadoAbierto';
import { COLORES } from '../datos/colores';

const DATOS_CONTACTO = [
  { icono: '📍', titulo: 'Nuestra ubicación', valor: 'Av. Los Olivos 123, Lima - Perú' },
  { icono: '📞', titulo: 'Teléfono', valor: '+51 987 654 321' },
  { icono: '✉️', titulo: 'Email', valor: 'contacto@saborarte.com' },
];

const FORMULARIO_VACIO = { nombre: '', correo: '', mensaje: '' };

export default function Contacto({ horarios }) {
  const [datos, setDatos] = useState(FORMULARIO_VACIO);
  const [enviado, setEnviado] = useState(false);

  // El aviso de éxito desaparece solo a los 4 segundos
  useEffect(() => {
    if (!enviado) return;
    const temporizador = setTimeout(() => setEnviado(false), 4000);
    return () => clearTimeout(temporizador);
  }, [enviado]);

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setDatos(FORMULARIO_VACIO);
  };

  return (
    <div className="text-dark" style={{ backgroundColor: COLORES.crema, minHeight: '100vh' }}>
      <div className="container py-5">

        <EncabezadoSeccion
          etiqueta="Contáctanos"
          titulo="Estamos para ti"
          descripcion="Será un gusto atenderte. Escríbenos, llámanos o visítanos. ¡Te esperamos!"
        />

        <div className="row">

          {/* INFORMACIÓN */}
          <div className="col-md-6 mb-4">
            <h4 className="fw-bold mb-3">Información</h4>

            {DATOS_CONTACTO.map((d) => (
              <p key={d.titulo} className="text-secondary mb-3">
                <strong>{d.icono} {d.titulo}:</strong> {d.valor}
              </p>
            ))}

            {/* ESTE ES EL BLOQUE QUE PREGUNTASTE */}
            <div className="mb-3">
              <strong>⏰ Horario de atención</strong> <EstadoAbierto horarios={horarios} />
              <HorarioAtencion horarios={horarios} className="text-secondary mt-2 mb-0" />
            </div>
          </div>

          {/* FORMULARIO */}
          <div className="col-md-6">
            <div className="card shadow-sm p-4 border-0">
              <h4 className="fw-bold mb-3">Envíanos un mensaje</h4>

              {enviado && (
                <div className="alert alert-success" role="alert">
                  ¡Mensaje enviado con éxito!
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="nombre" className="form-label">Nombre</label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    className="form-control"
                    placeholder="Ej. Amilcar Gamarra"
                    value={datos.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">Correo electrónico</label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    className="form-control"
                    placeholder="Ej. amilcar_gamarra@idat.pe"
                    value={datos.correo}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mensaje" className="form-label">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    className="form-control"
                    rows="3"
                    placeholder="Déjanos un mensaje..."
                    value={datos.mensaje}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-dark w-100">Enviar mensaje</button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}