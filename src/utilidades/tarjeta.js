export function soloDigitos(texto) {
  return texto.replace(/\D/g, '');
}

// '4242424242424242' -> '4242 4242 4242 4242'
export function formatearNumero(texto) {
  const digitos = soloDigitos(texto).slice(0, 16);
  return digitos.replace(/(.{4})/g, '$1 ').trim();
}

// '1228' -> '12/28'
export function formatearVencimiento(texto) {
  const digitos = soloDigitos(texto).slice(0, 4);
  if (digitos.length <= 2) return digitos;
  return digitos.slice(0, 2) + '/' + digitos.slice(2);
}

// Devuelve un objeto con un mensaje por cada campo que esté mal
export function validarTarjeta(tarjeta, ahora = new Date()) {
  const errores = {};

  if (tarjeta.titular.trim().length < 3) {
    errores.titular = 'Escribe el nombre que aparece en la tarjeta.';
  }

  if (soloDigitos(tarjeta.numero).length !== 16) {
    errores.numero = 'El número debe tener 16 dígitos.';
  }

  const partes = tarjeta.vencimiento.split('/');
  const mes = Number(partes[0]);
  const anio = 2000 + Number(partes[1]);
  const vencimientoValido =
    partes.length === 2 &&
    partes[1].length === 2 &&
    mes >= 1 &&
    mes <= 12 &&
    (anio > ahora.getFullYear() || (anio === ahora.getFullYear() && mes >= ahora.getMonth() + 1));
  if (!vencimientoValido) {
    errores.vencimiento = 'Usa el formato MM/AA con una fecha vigente.';
  }

  if (soloDigitos(tarjeta.cvv).length !== 3) {
    errores.cvv = 'Son 3 dígitos.';
  }

  return errores;
}