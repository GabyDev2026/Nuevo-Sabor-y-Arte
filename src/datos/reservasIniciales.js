import { fechaLocalISO } from '../utilidades/fechas';

export const reservasIniciales = [
  {
    id: 1,
    cliente: 'María Torres',
    email: 'maria@correo.com',
    fecha: fechaLocalISO(),
    hora: '13:00',
    personas: 2,
    mesaId: 1,
    estado: 'confirmada',
    tarjeta: '4242',
  },
  {
    id: 2,
    cliente: 'Luis Ramos',
    email: 'luis@correo.com',
    fecha: fechaLocalISO(),
    hora: '20:00',
    personas: 4,
    mesaId: 5,
    estado: 'confirmada',
    tarjeta: '1111',
  },
];