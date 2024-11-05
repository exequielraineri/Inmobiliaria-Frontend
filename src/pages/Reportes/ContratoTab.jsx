import { useState } from "react";

export const ContratoTab = () => {
  const [contratos, setContratos] = useState([]);
  const [filtro, setFiltro] = useState();
  return (
    <div>
      <div className="bloque my-3 d-flex gap-3">
        <div className="col-auto">
          <label className="form-label mb-1">Estado</label>
          <select
            onChange={(e) => {
              setFiltro({
                ...filtro,
                estado: e.target.value,
              });
            }}
            className="form-select"
          >
            <option value="">Todos</option>
            <option value="PENDIENTE">PENDIENTE</option>
            <option value="ACTIVO">ACTIVO</option>
            <option value="FINALIZADO">FINALIZADO</option>
            <option value="CANCELADO">CANCELADO</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Tipo</label>
          <select
            onChange={(e) => {
              setFiltro({
                ...filtro,
                tipoContrato: e.target.value,
              });
            }}
            className="form-select"
          >
            <option value="">Todos</option>
            <option value="ALQUILER">ALQUILER</option>
            <option value="VENTA">VENTA</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Estado</label>
          <input
            onChange={(e) => {
              setFiltro({
                ...filtro,
                estado: e.target.value,
              });
            }}
            type="month"
            className="form-control"
          />
        </div>
      </div>
      <div className="table-responsive">
        <h5>Contratos</h5>
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>contrato</th>
              <th>contrato</th>
              <th>Estado</th>
              <th>Monto</th>
            </tr>
          </thead>
          <tbody>
            {contratos?.map((contrato, index) => {
              return (
                <tr key={index}>
                  <th>{++index}</th>
                  <th>{contrato?.nombre + " " + contrato?.apellido}</th>
                  <th>{contrato?.inmmueble}</th>
                  <th>{contrato?.estado}</th>
                  <th>{contrato?.monto}</th>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
