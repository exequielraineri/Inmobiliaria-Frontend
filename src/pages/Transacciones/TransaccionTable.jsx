import { useEffect, useState } from "react";
import { formatearPrecio } from "../../data/funciones";
import { getData } from "../../service/apiService";

export const TransaccionTable = ({ actualizarTabla, setActualizarTabla }) => {
  const [transacciones, setTransacciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchTransacciones = async () => {
    setLoading(true);
    try {
      const response = await getData("transacciones");
      setTransacciones(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransacciones();
  }, [actualizarTabla]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div className="bloque mt-4">
      <h3>Listado </h3>
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
                  <td>{transaccion?.tipoTransaccion || "-"}</td>
                  <td>{transaccion?.tipoOperacion || "-"}</td>
                  <td>
                    {new Date(transaccion?.fechaTransaccion).toLocaleDateString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
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
