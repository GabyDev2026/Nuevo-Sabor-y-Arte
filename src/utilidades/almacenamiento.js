// Lee un dato guardado en el navegador; si no existe, devuelve el valor por defecto
export function cargar(clave, valorPorDefecto) {
  try {
    const guardado = localStorage.getItem(clave);
    return guardado ? JSON.parse(guardado) : valorPorDefecto;
  } catch (e) {
    return valorPorDefecto;
  }
}

export function guardar(clave, valor) {
  try {
    localStorage.setItem(clave, JSON.stringify(valor));
  } catch (e) {
    // si el navegador no deja guardar, la app sigue funcionando sin guardar
  }
}