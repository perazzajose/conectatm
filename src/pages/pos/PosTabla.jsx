import { MEDIOS_LABEL, A_COTIZAR } from '../../data/posProveedores';

const val = v => (v === A_COTIZAR ? 'A cotizar' : v);

export default function PosTabla({ lista }) {
  return (
    <div className="tabla-scroll">
      <table className="comparativa">
        <thead>
          <tr>
            <th>Proveedor</th><th>Tipo</th><th>Medios</th><th>Comisión débito</th>
            <th>Comisión crédito</th><th>Liquidación</th><th>Costo terminal</th>
            <th>Factura e.</th><th>Contrato</th>
          </tr>
        </thead>
        <tbody>
          {lista.map(p => (
            <tr key={p.id}>
              <td><strong>{p.nombre}</strong></td>
              <td>{p.tipo}</td>
              <td>{p.medios.map(m => MEDIOS_LABEL[m]).join(', ')}</td>
              <td>{val(p.comision_debito)}</td>
              <td>{val(p.comision_credito)}</td>
              <td>{val(p.liquidacion)}</td>
              <td>{p.terminal_modelo}{p.terminal_costo !== A_COTIZAR ? ` — ${p.terminal_costo}` : ''}</td>
              <td>{p.facturaE ? 'Sí' : 'No'}</td>
              <td>{p.contrato}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
