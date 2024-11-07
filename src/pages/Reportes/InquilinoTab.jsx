import { useEffect, useState } from "react";
import { formatearPrecio } from "../../data/funciones";
import { getData } from "../../service/apiService";

export const InquilinoTab = () => {
  const [pagos, setPagos] = useState([]);
  const [pagosFiltrados, setPagosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState();
  const fetchInquilinos = async () => {
    try {
      let parametros = "";
      if (filtro?.estado) {
        parametros += `&estado=${filtro.estado}`;
      }
      if (filtro?.fechaDesde) {
        parametros += `&fechaDesde=${filtro.fechaDesde.replaceAll("-", "/")}`;
      }
      if (filtro?.fechaHasta) {
        parametros += `&fechaHasta=${filtro.fechaHasta.replaceAll("-", "/")}`;
      }
      const response = await getData("pagos?" + parametros);
      setPagos(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInquilinos();
  }, [filtro]);

  return (
    <div>
      <div className="bloque my-3 d-flex gap-3">
        <div className="col-auto">
          <label className="form-label mb-1">Estado del Pago</label>
          <select
            value={filtro?.estado}
            defaultValue={""}
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
            <option value="PAGADO">PAGADO</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Feche Desde</label>
          <input
            value={filtro?.fechaDesde}
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
          <label className="form-label mb-1">Feche Hasta</label>
          <input
            value={filtro?.fechaHasta}
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
      <div className="table-responsive " style={{ maxHeight: "80vh" }}>
        <h5>Inquilinos</h5>
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Inquilino</th>
              <th>Inmueble</th>
              <th>Estado</th>
              <th>Monto</th>
              <th>Fecha Registro</th>
              <th>Fecha de Pago</th>
            </tr>
          </thead>
          <tbody>
            {pagos?.map((pago, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>
                    {(pago?.contrato?.cliente?.nombre || "-") +
                      " " +
                      (pago?.contrato?.cliente?.apellido || "-")}
                  </td>
                  <td>
                    {(pago?.contrato?.inmueble?.id || "-") +
                      " - " +
                      (pago?.contrato?.inmueble?.tipoInmueble || "-")}
                  </td>
                  <td>{pago?.estado}</td>
                  <td>{formatearPrecio(pago?.monto)}</td>
                  <td>
                    {pago.fechaRegistro &&
                      new Date(pago.fechaRegistro).toLocaleString()}
                  </td>
                  <td>{new Date(pago.fechaPago).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
