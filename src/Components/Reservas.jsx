import React, { useState, useEffect } from 'react';
import PasosReserva from './PasosReserva';
import SelectorPersonas from './SelectorPersonas';
import Calendario from './Calendario';
import SelectorHoras from './SelectorHoras';
import SelectorMesas from './SelectorMesas';
import DatosTarjeta from './DatosTarjeta';
import ResumenReserva from './ResumenReserva';
import Confirmacion from './Confirmacion';
import { RESERVA } from '../datos/colores';
import { DIAS_ANTICIPACION, GARANTIA_POR_PERSONA } from '../datos/config';
import { fechaLarga } from '../utilidades/fechas';
import { estadoDeMesas, horasDelDia } from '../utilidades/reservas';
import { validarTarjeta } from '../utilidades/tarjeta';

const PASOS = [
  { nombre: 'Personas', icono: '👤' },
  { nombre: 'Fecha', icono: '📅' },
  { nombre: 'Hora', icono: '🕐' },
  { nombre: 'Mesa', icono: '🪑' },
  { nombre: 'Tus datos', icono: '📝' },
];
const CLIENTE_VACIO = { nombre: '', email: '' };
const TARJETA_VACIA = { titular: '', numero: '', vencimiento: '', cvv: '' };

// Tarjeta de cada paso, con una entrada suave
function Tarjeta({ titulo, subtitulo, ancho = '640px', children }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const temporizador = setTimeout(() => setVisible(true), 30);
    return () => clearTimeout(temporizador);
  }, []);

  return (
    <section
      className="rounded-4 p-4 p-md-5 mx-auto"
      style={{
        maxWidth: ancho,
        backgroundColor: RESERVA.tarjeta,
        color: '#fff',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(12px)',
        transition: 'all 0.35s ease',
      }}
    >
      <h2 className="h4 fw-bold mb-1">{titulo}</h2>
      {subtitulo && (
        <p className="small mb-0" style={{ color: RESERVA.textoSuave }}>{subtitulo}</p>
      )}
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Atras({ alVolver, deshabilitado = false }) {
  return (
    <button
      type="button"
      className="btn btn-outline-light mt-4"
      onClick={alVolver}
      disabled={deshabilitado}
    >
      &larr; Atrás
    </button>
  );
}

export function Reservas({ mesas, reservas, horarios, agregarReserva }) {
  const [paso, setPaso] = useState(1);
  const [personas, setPersonas] = useState(0);
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [mesaId, setMesaId] = useState(null);
  const [cliente, setCliente] = useState(CLIENTE_VACIO);
  const [tarjeta, setTarjeta] = useState(TARJETA_VACIA);
  const [errores, setErrores] = useState({});
  const [aviso, setAviso] = useState('');
  const [procesando, setProcesando] = useState(false);
  const [reservaCreada, setReservaCreada] = useState(null);
  const [ahora, setAhora] = useState(new Date());

  // El reloj se actualiza cada 30 segundos: las horas que ya pasaron desaparecen solas
  useEffect(() => {
    const reloj = setInterval(() => setAhora(new Date()), 30000);
    return () => clearInterval(reloj);
  }, []);

  // Tiempo real: si mientras eliges otra persona toma la hora o la mesa, se te avisa
  useEffect(() => {
    if (paso >= 6 || procesando) return;

    if (hora) {
      const horaSigueLibre =
        horasDelDia(horarios, fecha, ahora).includes(hora) &&
        estadoDeMesas(mesas, reservas, fecha, hora, personas).some((m) => m.estado === 'libre');

      if (!horaSigueLibre) {
        setHora('');
        setMesaId(null);
        setPaso((p) => Math.min(p, 3));
        setAviso('Esa hora ya no está disponible. Elige otra.');
        return;
      }
    }

    if (mesaId) {
      const mesaSigueLibre = estadoDeMesas(mesas, reservas, fecha, hora, personas).some(
        (m) => m.id === mesaId && m.estado === 'libre'
      );

      if (!mesaSigueLibre) {
        setMesaId(null);
        setPaso((p) => Math.min(p, 4));
        setAviso('La mesa que elegiste acaba de ser reservada. Elige otra.');
      }
    }
  }, [paso, procesando, hora, mesaId, fecha, personas, mesas, reservas, horarios, ahora]);

  // Pago simulado: espera 1.2 segundos y luego guarda la reserva
  useEffect(() => {
    if (!procesando) return;

    const espera = setTimeout(() => {
      const resultado = agregarReserva({
        cliente: cliente.nombre.trim(),
        email: cliente.email.trim(),
        fecha,
        hora,
        personas,
        mesaId,
        tarjeta: tarjeta.numero.replace(/\D/g, '').slice(-4), // solo los últimos 4 dígitos
      });

      if (resultado.ok) {
        setReservaCreada(resultado.reserva);
        setTarjeta(TARJETA_VACIA);
        setPaso(6);
      } else {
        setMesaId(null);
        setPaso(4);
        setAviso(resultado.error);
      }
      setProcesando(false);
    }, 1200);

    return () => clearTimeout(espera);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [procesando]);

  // ---------- Datos calculados ----------
  const maxPersonas = Math.max(1, ...mesas.filter((m) => m.activa).map((m) => m.capacidad));

  const horasConEstado = fecha
    ? horasDelDia(horarios, fecha, ahora).map((h) => ({
        hora: h,
        disponible: estadoDeMesas(mesas, reservas, fecha, h, personas).some(
          (m) => m.estado === 'libre'
        ),
      }))
    : [];

  const mesasConEstado = fecha && hora ? estadoDeMesas(mesas, reservas, fecha, hora, personas) : [];
  const mesaElegida = mesas.find((m) => m.id === mesaId);
  const garantia = personas * GARANTIA_POR_PERSONA;
  const textoPersonas = `${personas} ${personas === 1 ? 'persona' : 'personas'}`;

  // Qué pasos de la barra se pueden visitar (solo los ya completados)
  const puedeIr = (n) => {
    if (paso === 6 || procesando) return false;
    if (n === 1) return true;
    if (n === 2) return personas > 0;
    if (n === 3) return personas > 0 && fecha !== '';
    if (n === 4) return hora !== '';
    return mesaId !== null;
  };

  // ---------- Acciones ----------
  const irAlPaso = (numero) => {
    setAviso('');
    setPaso(numero);
  };

  const elegirPersonas = (n) => {
    setPersonas(n);
    setHora('');
    setMesaId(null);
    irAlPaso(2);
  };

  const elegirFecha = (nuevaFecha) => {
    setFecha(nuevaFecha);
    setHora('');
    setMesaId(null);
    irAlPaso(3);
  };

  const elegirHora = (nuevaHora) => {
    setHora(nuevaHora);
    setMesaId(null);
    irAlPaso(4);
  };

  const elegirMesa = (id) => {
    setMesaId(id);
    irAlPaso(5);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const erroresTarjeta = validarTarjeta(tarjeta);
    setErrores(erroresTarjeta);
    if (Object.keys(erroresTarjeta).length > 0) return;

    setAviso('');
    setProcesando(true);
  };

  const reiniciar = () => {
    setPaso(1);
    setPersonas(0);
    setFecha('');
    setHora('');
    setMesaId(null);
    setCliente(CLIENTE_VACIO);
    setTarjeta(TARJETA_VACIA);
    setErrores({});
    setAviso('');
    setReservaCreada(null);
  };

  // ---------- Pantalla ----------
  return (
    <div style={{ backgroundColor: RESERVA.fondo, minHeight: '85vh' }}>

      <PasosReserva pasos={PASOS} paso={paso} puedeIr={puedeIr} alIr={irAlPaso} />

      <div className="container pt-4 pb-5">

        {aviso && paso < 6 && (
          <div className="alert alert-warning mx-auto" style={{ maxWidth: '640px' }} role="alert">
            {aviso}
          </div>
        )}

        {/* 1. PERSONAS */}
        {paso === 1 && (
          <Tarjeta titulo="Elige la cantidad de personas">
            <SelectorPersonas maximo={maxPersonas} elegidas={personas} alElegir={elegirPersonas} />
          </Tarjeta>
        )}

        {/* 2. FECHA */}
        {paso === 2 && (
          <Tarjeta titulo="Elige el día" subtitulo={textoPersonas}>
            <Calendario
              oscuro
              fecha={fecha}
              alSeleccionar={elegirFecha}
              horarios={horarios}
              diasMaximos={DIAS_ANTICIPACION}
            />
            <Atras alVolver={() => irAlPaso(1)} />
          </Tarjeta>
        )}

        {/* 3. HORA */}
        {paso === 3 && (
          <Tarjeta titulo="Elige la hora" subtitulo={`${fechaLarga(fecha)} · ${textoPersonas}`}>
            <SelectorHoras horas={horasConEstado} horaElegida={hora} alElegir={elegirHora} />
            <Atras alVolver={() => irAlPaso(2)} />
          </Tarjeta>
        )}

        {/* 4. MESA */}
        {paso === 4 && (
          <Tarjeta
            titulo="Elige tu mesa"
            subtitulo={`${fechaLarga(fecha)} · ${hora} · ${textoPersonas}`}
          >
            <SelectorMesas mesas={mesasConEstado} mesaElegida={mesaId} alElegir={elegirMesa} />
            <Atras alVolver={() => irAlPaso(3)} />
          </Tarjeta>
        )}

        {/* 5. DATOS Y PAGO */}
        {paso === 5 && (
          <Tarjeta
            titulo="Tus datos"
            subtitulo="Casi listo: confirma tu reserva con una garantía simulada."
            ancho="960px"
          >
            <div className="row g-4">
              <div className="col-lg-7">
                <form onSubmit={handleSubmit}>
                  <fieldset disabled={procesando}>

                    <div className="mb-3">
                      <label htmlFor="nombre" className="form-label">Nombre completo</label>
                      <input
                        type="text"
                        id="nombre"
                        className="form-control"
                        placeholder="Ej. Carlos Torres"
                        value={cliente.nombre}
                        onChange={(e) => setCliente({ ...cliente, nombre: e.target.value })}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Correo electrónico</label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="tu@correo.com"
                        value={cliente.email}
                        onChange={(e) => setCliente({ ...cliente, email: e.target.value })}
                        required
                      />
                    </div>

                    <h3 className="h6 fw-bold mt-4 mb-3">Garantía con tarjeta</h3>
                    <DatosTarjeta tarjeta={tarjeta} setTarjeta={setTarjeta} errores={errores} />

                    <button type="submit" className="btn btn-warning w-100 fw-bold py-2 mt-4">
                      {procesando ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" aria-hidden="true"></span>
                          Procesando...
                        </>
                      ) : garantia > 0 ? (
                        `Confirmar reserva · S/ ${garantia.toFixed(2)}`
                      ) : (
                        'Confirmar reserva'
                      )}
                    </button>

                  </fieldset>
                </form>
              </div>

              <div className="col-lg-5">
                <h3 className="h6 fw-bold mb-3">Resumen</h3>
                <ResumenReserva fecha={fecha} hora={hora} personas={personas} mesa={mesaElegida} />
                {garantia > 0 && (
                  <p className="small mt-3 mb-0" style={{ color: RESERVA.textoSuave }}>
                    Garantía de S/ {garantia.toFixed(2)} (S/ {GARANTIA_POR_PERSONA} por persona),
                    que se descuenta de tu cuenta. Es una simulación.
                  </p>
                )}
              </div>
            </div>

            <Atras alVolver={() => irAlPaso(4)} deshabilitado={procesando} />
          </Tarjeta>
        )}

        {/* 6. CONFIRMACIÓN */}
        {paso === 6 && reservaCreada && (
          <Confirmacion
            reserva={reservaCreada}
            mesa={mesas.find((m) => m.id === reservaCreada.mesaId)}
            alReiniciar={reiniciar}
          />
        )}

      </div>
    </div>
  );
}

export default Reservas;