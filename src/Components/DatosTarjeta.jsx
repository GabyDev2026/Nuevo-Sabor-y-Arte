import React from 'react';
import { formatearNumero, formatearVencimiento, soloDigitos } from '../utilidades/tarjeta';

export default function DatosTarjeta({ tarjeta, setTarjeta, errores }) {
  const cambiar = (campo, valor) => setTarjeta({ ...tarjeta, [campo]: valor });
  const clase = (campo) => `form-control ${errores[campo] ? 'is-invalid' : ''}`;

  return (
    <div>
      <div className="mb-3">
        <label htmlFor="titular" className="form-label">Nombre en la tarjeta</label>
        <input
          type="text"
          id="titular"
          autoComplete="cc-name"
          className={clase('titular')}
          placeholder="Como aparece en la tarjeta"
          value={tarjeta.titular}
          onChange={(e) => cambiar('titular', e.target.value)}
        />
        <div className="invalid-feedback">{errores.titular}</div>
      </div>

      <div className="mb-3">
        <label htmlFor="numero" className="form-label">Número de tarjeta</label>
        <input
          type="text"
          id="numero"
          inputMode="numeric"
          autoComplete="cc-number"
          className={clase('numero')}
          placeholder="0000 0000 0000 0000"
          value={tarjeta.numero}
          onChange={(e) => cambiar('numero', formatearNumero(e.target.value))}
        />
        <div className="invalid-feedback">{errores.numero}</div>
      </div>

      <div className="row g-3">
        <div className="col-6">
          <label htmlFor="vencimiento" className="form-label">Vencimiento</label>
          <input
            type="text"
            id="vencimiento"
            inputMode="numeric"
            autoComplete="cc-exp"
            className={clase('vencimiento')}
            placeholder="MM/AA"
            value={tarjeta.vencimiento}
            onChange={(e) => cambiar('vencimiento', formatearVencimiento(e.target.value))}
          />
          <div className="invalid-feedback">{errores.vencimiento}</div>
        </div>

        <div className="col-6">
          <label htmlFor="cvv" className="form-label">CVV</label>
          <input
            type="password"
            id="cvv"
            inputMode="numeric"
            autoComplete="cc-csc"
            maxLength={3}
            className={clase('cvv')}
            placeholder="•••"
            value={tarjeta.cvv}
            onChange={(e) => cambiar('cvv', soloDigitos(e.target.value))}
          />
          <div className="invalid-feedback">{errores.cvv}</div>
        </div>
      </div>

      <div className="form-text mt-2">
        Pago simulado: no se cobra nada y la tarjeta no se guarda. Para probar, usa cualquier
        número de 16 dígitos con una fecha vigente.
      </div>
    </div>
  );
}