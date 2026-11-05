import { DURACION_RESERVA_MIN, INTERVALO_HORAS_MIN } from '../datos/config';
import { aMinutos, aHora, diaSemana, fechaLocalISO } from './fechas';

// Genera el siguiente id de una lista
export function generarId(lista) {
  if (lista.length === 0) return 1;
  return Math.max(...lista.map((item) => item.id)) + 1;
}

// ¿Esa mesa ya está ocupada a esa hora ese día?
// Dos reservas chocan si son de la misma mesa, el mismo día y sus horarios se cruzan.
// Una reserva que empieza justo cuando otra termina NO es conflicto.
export function hayConflicto(reservas, mesaId, fecha, hora, ignorarId = null) {
  const inicio = aMinutos(hora);
  const fin = inicio + DURACION_RESERVA_MIN;

  return reservas.some((r) => {
    if (r.id === ignorarId) return false;
    if (r.estado === 'cancelada') return false;
    if (r.mesaId !== mesaId || r.fecha !== fecha) return false;

    const inicioR = aMinutos(r.hora);
    const finR = inicioR + DURACION_RESERVA_MIN;
    return inicio < finR && inicioR < fin;
  });
}

// Devuelve las mesas activas con su estado para esa fecha, hora y cantidad de personas:
// 'libre', 'ocupada' o 'pequena' (no alcanza para tantas personas)
export function estadoDeMesas(mesas, reservas, fecha, hora, personas) {
  return mesas
    .filter((mesa) => mesa.activa)
    .map((mesa) => {
      let estado = 'libre';
      if (mesa.capacidad < personas) {
        estado = 'pequena';
      } else if (hayConflicto(reservas, mesa.id, fecha, hora)) {
        estado = 'ocupada';
      }
      return { ...mesa, estado };
    });
}

// Reservas no canceladas de un día
export function reservasDelDia(reservas, fecha) {
  return reservas.filter((r) => r.fecha === fecha && r.estado !== 'cancelada');
}

// Horario configurado para el día de esa fecha
export function horarioDelDia(horarios, fecha) {
  return horarios.find((h) => h.dia === diaSemana(fecha));
}

// Horas que se pueden reservar ese día (cada 30 min).
// La última hora deja tiempo para que la reserva termine antes del cierre.
// Si es hoy, no ofrece horas que ya pasaron.
export function horasDelDia(horarios, fecha, ahora = new Date()) {
  const horario = horarioDelDia(horarios, fecha);
  if (!horario || !horario.abierto) return [];

  const ultima = aMinutos(horario.cierre) - DURACION_RESERVA_MIN;
  const minutosActuales = ahora.getHours() * 60 + ahora.getMinutes();
  const esHoy = fecha === fechaLocalISO(ahora);

  const horas = [];
  for (let min = aMinutos(horario.apertura); min <= ultima; min += INTERVALO_HORAS_MIN) {
    if (esHoy && min <= minutosActuales) continue;
    horas.push(aHora(min));
  }
  return horas;
}

// ¿El restaurante está abierto en este momento?
export function estaAbierto(horarios, ahora = new Date()) {
  const horario = horarios.find((h) => h.dia === ahora.getDay());
  if (!horario || !horario.abierto) return false;

  const minutos = ahora.getHours() * 60 + ahora.getMinutes();
  return minutos >= aMinutos(horario.apertura) && minutos < aMinutos(horario.cierre);
}

// Nombre de una mesa; si ya fue eliminada, un texto de respaldo
export function nombreDeMesa(mesas, id) {
  const mesa = mesas.find((m) => m.id === id);
  return mesa ? mesa.nombre : 'Mesa eliminada';
}

// Reservas confirmadas de una mesa que todavía no se cumplen (de hoy en adelante)
export function reservasPendientesDeMesa(reservas, mesaId) {
  const hoy = fechaLocalISO();
  return reservas.filter(
    (r) => r.mesaId === mesaId && r.estado === 'confirmada' && r.fecha >= hoy
  );
}

const ORDEN_SEMANA = [1, 2, 3, 4, 5, 6, 0]; // la semana empieza el lunes

// Junta los días seguidos que tienen el mismo horario.
// Ejemplo: [{ dias: 'Lunes a Sábado', horas: '12:00 - 23:00' }, { dias: 'Domingo', horas: 'Cerrado' }]
export function resumirHorarios(horarios) {
  const ordenados = ORDEN_SEMANA.map((d) => horarios.find((h) => h.dia === d)).filter(Boolean);
  const grupos = [];

  ordenados.forEach((h) => {
    const horas = h.abierto ? `${h.apertura} - ${h.cierre}` : 'Cerrado';
    const ultimo = grupos[grupos.length - 1];

    if (ultimo && ultimo.horas === horas) {
      ultimo.hasta = h.nombre;
    } else {
      grupos.push({ desde: h.nombre, hasta: h.nombre, horas });
    }
  });

  return grupos.map((g) => ({
    dias: g.desde === g.hasta ? g.desde : `${g.desde} a ${g.hasta}`,
    horas: g.horas,
  }));
}