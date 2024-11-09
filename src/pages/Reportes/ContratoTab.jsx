import { useEffect, useState } from "react";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";

export const ContratoTab = () => {
  const [contratos, setContratos] = useState([]);
  const [filtro, setFiltro] = useState();
  const [clientes, setClientes] = useState();

  const fetchClientes = async () => {
    try {
      const response = await getData("clientes");
      setClientes(response?.data);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchContratos = async () => {
    try {
      let parametros = "";
      if (filtro?.cliente) {
        parametros += `&cliente=${filtro.cliente}`;
      }
      if (filtro?.estado) {
        parametros += `&estado=${filtro.estado}`;
      }
      if (filtro?.tipoContrato) {
        parametros += `&tipoContrato=${filtro.tipoContrato}`;
      }
      if (filtro?.fechaDesde) {
        parametros += `&fechaDesde=${filtro.fechaDesde.replaceAll("-", "/")}`;
      }
      if (filtro?.fechaHasta) {
        parametros += `&fechaHasta=${filtro.fechaHasta.replaceAll("-", "/")}`;
      }

      const response = await getData("contratos?" + parametros);
      setContratos(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  useEffect(() => {
    fetchContratos();
  }, [filtro]);

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
          <label className="form-label mb-1">Cliente</label>
          <select
            onChange={(e) => {
              setFiltro({
                ...filtro,
                cliente: e.target.value,
              });
            }}
            className="form-select"
          >
            <option value="">Todos</option>
            {clientes?.map((cliente) => {
              return (
                <option key={cliente?.id} value={cliente?.id}>
                  {cliente?.nombre + " " + cliente?.apellido}
                </option>
              );
            })}
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
          <label className="form-label mb-1">Fecha Desde</label>
          <input
            onChange={(e) => {
              setFiltro({
                ...filtro,
                fechaDesde: e.target.value,
              });
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Fecha Hasta</label>
          <input
            onChange={(e) => {
              setFiltro({
                ...filtro,
                fechaHasta: e.target.value,
              });
            }}
            type="date"
            className="form-control"
          />
        </div>
      </div>
      <div className="table-responsive">
        <h5>Contratos</h5>
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th className="col-auto">#</th>
              <th className="col">Contrato</th>
              <th className="col">Cliente</th>
              <th className="col">Estado</th>
              <th className="col-auto">Importe Total</th>
            </tr>
          </thead>
          <tbody>
            {contratos?.map((contrato, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{contrato?.inmueble?.titulo}</td>
                  <td>
                    {contrato?.cliente?.nombre +
                      " " +
                      contrato?.cliente?.apellido}
                  </td>
                  <td>{contrato?.estado}</td>
                  <td>{formatearPrecio(contrato?.importe)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
