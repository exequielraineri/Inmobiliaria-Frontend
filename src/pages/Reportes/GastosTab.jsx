import { useEffect, useState } from "react";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";

export const GastosTab = () => {
  const [transacciones, setTransacciones] = useState([]);
  const [filtro, setFiltro] = useState();

  const fetchTransacciones = async () => {
    try {
      const response = await getData("transacciones");
      const egresos = response?.data?.filter(
        (transaccion) => transaccion.tipoTransaccion == "EGRESO"
      );
      setTransacciones(egresos);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTransacciones();
  }, []);
  return (
    <div>
      <div className="bloque my-3 d-flex gap-3">
        <div className="col-auto">
          <label className="form-label mb-1">Tipo</label>
          <select
            onChange={(e) => {
              setFiltro({
                ...filtro,
                tipoOperacion: e.target.value,
              });
            }}
            className="form-select"
          >
            <option value="">Todos</option>
            <option value="EXPENSAS">EXPENSAS</option>
            <option value="IMPUESTOS">IMPUESTOS</option>
            <option value="MANTENIMIENTO">MANTENIMIENTO</option>
            <option value="OTROS">OTROS</option>
          </select>
        </div>
        <div className="col-auto">
          <label className="form-label mb-1">Mes</label>
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
      <div className="table-responsive">
        <h5>Gastos</h5>
        <table className="table table-sm table-hover table-striped">
          <thead>
            <tr>
              <th className="col-auto">#</th>
              <th>Descripción</th>
              <th>Monto</th>
              <th>Tipo Transacción</th>
              <th>Tipo Operación</th>
              <th>Fecha de Transacción</th>
            </tr>
          </thead>
          <tbody>
            {transacciones?.map((transaccion, index) => {
              return (
                <tr key={index}>
                  <td>{++index}</td>
                  <td>{transaccion?.descripcion || "-"}</td>
                  <td>{formatearPrecio(transaccion?.importe) || "-"}</td>
                  <td>{transaccion?.tipoTransaccion || "-"}</td>
                  <td>{transaccion?.tipoOperacion || "-"}</td>
                  <td>
                    {transaccion?.fechaTransaccion &&
                      new Date(transaccion?.fechaTransaccion).toLocaleString(
                        "es-ES",
                        {
                          timeZone: "UTC",
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
