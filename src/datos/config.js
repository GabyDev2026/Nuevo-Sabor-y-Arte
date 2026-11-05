// Reglas generales del restaurante (se pueden cambiar aquí)
export const DURACION_RESERVA_MIN = 120; // cada reserva ocupa la mesa 2 horas
export const INTERVALO_HORAS_MIN = 30;   // horas de reserva cada 30 minutos
export const DIAS_ANTICIPACION = 60;   // hasta cuántos días antes se puede reservar
export const GARANTIA_POR_PERSONA = 10; // soles de garantía por persona (pon 0 para no pedirla)
export const CLAVE_SESION = 'saborarte_admin';

// Nombres con los que se guardan los datos en el navegador
export const CLAVES = {
  platos: 'saborarte_platos',
  mesas: 'saborarte_mesas',
  horarios: 'saborarte_horarios',
  reservas: 'saborarte_reservas',
};