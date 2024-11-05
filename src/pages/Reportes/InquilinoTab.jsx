import { useEffect, useState } from "react";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";
import { useFetcher } from "react-router-dom";

export const InquilinoTab = () => {
  const [pagos, setPagos] = useState([]);
  const [pagosFiltrados, setPagosFiltrados] = useState([]);
  const [filtro, setFiltro] = useState();
  const fetchInquilinos = async () => {
    try {
      const response = await getData("pagos");
      setPagos(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInquilinos();
  }, []);

  useEffect(() => {
    if (filtro?.estado) {
      let resultado = pagos?.filter((pago) => pago?.estado == filtro?.estado);
      setPagosFiltrados(resultado);
    } else {
      setPagosFiltrados(pagos);
    }
  }, [pagos, filtro]);

  return (
    <div>
      <div className="bloque my-3 d-flex gap-3">
        <div className="col-auto">
          <label className="form-label mb-1">Estado del Pago</label>
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
            <option value="PAGADO">PAGADO</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Feche de Pago</label>
          <input
            onChange={(e) => {
              setFiltro({
                ...filtro,
                mes: e.target.value,
              });
            }}
            type="month"
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
            {pagosFiltrados?.map((pago, index) => {
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
                      new Date(pago.fechaRegistro).toLocaleString("es-ES", {
                        timeZone: "UTC",
                      })}
                  </td>
                  <td>
                    {new Date(pago.fechaPago).toLocaleString("es-ES", {
                      timeZone: "UTC",
                      dateStyle: "short",
                    })}
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
