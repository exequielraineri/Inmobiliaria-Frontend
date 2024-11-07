/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { formatearPrecio } from "../../data/funciones";
import { getData } from "../../service/apiService";

export const TransaccionTable = ({
  actualizarTabla,
  setActualizarTabla,
  filtro,
  setFiltro,
}) => {
  const [transacciones, setTransacciones] = useState([]);
  const [info, setInfo] = useState();
  const [loading, setLoading] = useState(false);
  const fetchTransacciones = async () => {
    setLoading(true);
    try {
      let parametros = "";
      if (filtro?.tipoTransaccion) {
        parametros += `&tipoTransaccion=${filtro?.tipoTransaccion}`;
      }
      if (filtro?.tipoOperacion) {
        parametros += `&tipoOperacion=${filtro?.tipoOperacion}`;
      }
      if (filtro?.fechaDesde) {
        parametros += `&fechaDesde=${filtro?.fechaDesde.replaceAll("-", "/")}`;
      }
      if (filtro?.fechaHasta) {
        parametros += `&fechaHasta=${filtro?.fechaHasta.replaceAll("-", "/")}`;
      }

      const response = await getData("transacciones?" + parametros);
      let ingreso = 0;
      let egreso = 0;
      response?.data?.map((trans) => {
        if (trans?.tipoTransaccion == "INGRESO") {
          ingreso += trans?.importe;
        } else {
          egreso += trans?.importe;
        }
      });

      setInfo({
        ingreso: ingreso,
        egreso: egreso,
        diferencia: ingreso - egreso,
      });
      setTransacciones(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacciones();
  }, [actualizarTabla, filtro]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="bloque mt-4">
      <div className="d-flex justify-content-between">
        <h3>Listado </h3>
        <p className="text-start">
          Ingreso: {formatearPrecio(info?.ingreso)}
          <br />
          Egreso: {formatearPrecio(info?.egreso)}
          <br />
          Diferencia: {formatearPrecio(info?.diferencia)}
        </p>
      </div>
      <p className="pb-0 mb-0 fw-ligth">Encontrados {transacciones?.length}</p>
      <div
        className="table-responsive"
        style={{
          maxHeight: "100vh",
        }}
      >
        <table className="table table-striped table-hover">
          <thead className="table-dark ">
            <tr>
              <th className="col-auto">#</th>
              <th className="col">Descripcion</th>
              <th className="col">Importe</th>
              <th className="col">Agente</th>
              <th className="col">Tipo Transaccion</th>
              <th className="col">Tipo Operacion</th>
              <th className="col">Fecha Transaccion</th>
            </tr>
          </thead>
          <tbody>
            {transacciones?.map((transaccion, index) => {
              return (
                <tr key={transaccion.id}>
                  <td>{++index}</td>
                  <td>{transaccion?.descripcion || "-"}</td>
                  <td>{formatearPrecio(transaccion?.importe)}</td>
                  <td>
                    {transaccion?.agente?.nombre +
                      " " +
                      transaccion?.agente?.apellido}{" "}
                  </td>
                  <td
                    className={
                      transaccion?.tipoTransaccion == "INGRESO"
                        ? "text-success fw-bold"
                        : "text-danger fw-bold"
                    }
                  >
                    {transaccion?.tipoTransaccion || "-"}
                  </td>
                  <td>{transaccion?.tipoOperacion || "-"}</td>
                  <td>
                    {new Date(transaccion?.fechaTransaccion).toLocaleString()}
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
