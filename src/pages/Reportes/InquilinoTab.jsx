import { useEffect, useState } from "react";
import { formatearPrecio } from "../../data/funciones";
import { API_URL, getData } from "../../service/apiService";
import { LinkPago } from "../../components/LinkPago/LinkPago";

export const InquilinoTab = () => {
  const [pagos, setPagos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [pagosFiltrados, setPagosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState();
  const fetchInquilinos = async () => {
    try {
      let parametros = "";
      if (filtro?.estado) {
        parametros += `&estado=${filtro.estado}`;
      }
      if (filtro?.fechaDesde) {
        parametros += `&fechaDesde=${filtro.fechaDesde}`;
      }
      if (filtro?.fechaHasta) {
        parametros += `&fechaHasta=${filtro.fechaHasta}`;
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
            value={filtro?.fechaDesde ? filtro?.fechaDesde?.split("T")[0] : ""}
            onChange={(e) => {
              const fecha = e.target.value;
              setFiltro({
                ...filtro,
                fechaDesde: fecha + "T00:00:00",
              });
            }}
            type="date"
            className="form-control"
          />
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Feche Hasta</label>
          <input
            value={filtro?.fechaHasta ? filtro?.fechaHasta?.split("T")[0] : ""}
            onChange={(e) => {
              const fecha = e.target.value;
              setFiltro({
                ...filtro,
                fechaHasta: fecha + "T23:59:59",
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
              <th>Monto</th>
              <th>Fecha Registro</th>
              <th>Fecha de Pago</th>
              <th>Estado</th>
              <th>Comprobante</th>
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

                  <td>{formatearPrecio(pago?.monto)}</td>
                  <td>
                    {pago.fechaRegistro &&
                      new Date(pago.fechaRegistro).toLocaleString()}
                  </td>
                  <td>{new Date(pago.fechaPago).toLocaleString()}</td>
                  <td>
                    <span
                      className={
                        pago?.estado == "PENDIENTE"
                          ? "text-bg-warning  px-2 rounded"
                          : "text-bg-success  px-2 rounded"
                      }
                    >
                      {pago?.estado}
                    </span>
                  </td>
                  <td>
                    {pago?.estado == "PAGADO" && <LinkPago id={pago?.id} />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
