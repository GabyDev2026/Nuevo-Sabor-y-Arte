// Fecha de hoy (o la que se pase) en formato AAAA-MM-DD, con la hora local
export function fechaLocalISO(fecha = new Date()) {
  const anio = fecha.getFullYear();
  const mes = String(fecha.getMonth() + 1).padStart(2, '0');
  const dia = String(fecha.getDate()).padStart(2, '0');
  return `${anio}-${mes}-${dia}`;
}

// '19:30' -> 1170
export function aMinutos(hora) {
  const partes = hora.split(':').map(Number);
  return partes[0] * 60 + partes[1];
}

// 1170 -> '19:30'
export function aHora(minutos) {
  const h = String(Math.floor(minutos / 60)).padStart(2, '0');
  const m = String(minutos % 60).padStart(2, '0');
  return `${h}:${m}`;
}

// '2026-11-04' -> 3 (0 = domingo ... 6 = sábado)
export function diaSemana(fechaISO) {
  const partes = fechaISO.split('-').map(Number);
  return new Date(partes[0], partes[1] - 1, partes[2]).getDay();
}

// '2026-11-05' -> 'Jueves, 5 de noviembre de 2026'
export function fechaLarga(fechaISO) {
  const partes = fechaISO.split('-').map(Number);
  const fecha = new Date(partes[0], partes[1] - 1, partes[2]);
  const texto = fecha.toLocaleDateString('es-PE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return texto.charAt(0).toUpperCase() + texto.slice(1);
}