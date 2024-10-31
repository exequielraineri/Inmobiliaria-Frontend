/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, putData } from "../../service/apiService";
import { Imagen } from "../../components/Imagen/Imagen";
import { formatearPrecio } from "../../data/funciones";
export const VerAlquiler = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [contrato, setContrato] = useState();
  const [metodoPago, setMetodoPago] = useState();
  const obtenerContrato = async () => {
    setLoading(true);
    try {
      const response = await getData("/alquiler/" + id);
      setContrato(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerContrato();
  }, []);

  const confirmarPago = async (pago) => {
    let pagoData = {
      ...pago,
      metodoPago: metodoPago,
    };
    setLoading(true);
    try {
      await putData("pagos/confirmar/" + pagoData?.id, pagoData);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      obtenerContrato();
    }
  };

  return (
    <>
      <div className="bloque">
        <h3 className="border-start ps-2 text-primary border-primary">
          Contrato de {contrato?.tipoContrato}
        </h3>
        <hr />
        <h4 className="text-capitalize">{contrato?.inmueble?.titulo}</h4>
        <p>{contrato?.inmueble?.descripcion}</p>
        <p>
          Fecha Contrato:{" "}
          <strong>
            {new Date(contrato?.fechaContrato).toLocaleDateString(undefined, {
              dateStyle: "full",
            })}
          </strong>
          <br />
          Periodo de contrato:{" "}
          <strong>
            {new Date(contrato?.fechaInicio).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </strong>
          {" - "}
          <strong>
            {new Date(contrato?.fechaFin).toLocaleDateString(undefined, {
              dateStyle: "long",
            })}
          </strong>
        </p>
        <section className="d-flex flex-wrap gap-3 ">
          {contrato?.inmueble?.imagenes?.map((imagen) => {
            return <Imagen imagen={imagen} width={"200"} />;
          })}
        </section>
      </div>
      <div className="bloque mt-3">
        <h4>Pagos</h4>
        <p>Frecuencia de pago: {contrato?.frecuenciaPago}</p>
        <p>
          Saldo abonado:{" "}
          {formatearPrecio(contrato?.importe - contrato?.saldoRestante)}
          <br />
          Saldo restante: {formatearPrecio(contrato?.saldoRestante)}
        </p>
        <cite>Pagos {contrato?.pagos?.length}</cite>
        <table className="table table-sm table-striped">
          <thead className="table-dark">
            <tr>
              <th className="col-1">#</th>
              <th className="col">Fecha de Pago</th>
              <th className="col">Fecha de Registro</th>
              <th className="col">Monto</th>
              <th className="col">Estado</th>
              <th className="col"></th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody>
            {contrato?.pagos?.map((pago, index) => {
              let pagoAnterior = contrato?.pagos[index - 1];
              console.log(pagoAnterior == null);

              return (
                <tr
                  className={
                    pago.estado == "PENDIENTE"
                      ? "table-danger"
                      : "table-success"
                  }
                >
                  <td>{++index}</td>
                  <td>{new Date(pago.fechaPago).toLocaleDateString()}</td>
                  <td>
                    {pago.fechaRegistro
                      ? new Date(pago.fechaRegistro).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{formatearPrecio(pago.monto)}</td>
                  <td>{pago.estado}</td>
                  <td>
                    {pagoAnterior == null && pago.estado == "PENDIENTE" ? (
                      <div>
                        <select
                          onChange={(e) => setMetodoPago(e.target.value)}
                          defaultValue={""}
                          className="form-select"
                        >
                          <option value="" disabled>
                            Seleccione..
                          </option>
                          <option value="EFECTIVO">Efectivo</option>
                          <option value="TRANSFERENCIA">Transferencia</option>
                        </select>
                      </div>
                    ) : pago.estado == "PENDIENTE" &&
                      pagoAnterior?.estado == "PAGADO" ? (
                      <div>
                        <select
                          onChange={(e) => setMetodoPago(e.target.value)}
                          defaultValue={""}
                          className="form-select"
                        >
                          <option value="" disabled>
                            Seleccione..
                          </option>
                          <option value="EFECTIVO">Efectivo</option>
                          <option value="TRANSFERENCIA">Transferencia</option>
                        </select>
                      </div>
                    ) : (
                      <span>{pago?.metodoPago}</span>
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      {pagoAnterior == null && pago.estado == "PENDIENTE" ? (
                        <button
                          onClick={() => {
                            if (confirm("Seguro desea confirmar el pago?")) {
                              confirmarPago(pago);
                            }
                          }}
                          className="btn btn-sm btn-outline-success"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      ) : pago.estado == "PENDIENTE" &&
                        pagoAnterior?.estado == "PAGADO" ? (
                        <button
                          onClick={() => {
                            if (confirm("Seguro desea confirmar el pago?")) {
                              confirmarPago(pago);
                            }
                          }}
                          className="btn btn-sm btn-outline-success"
                        >
                          <i className="fa-solid fa-check"></i>
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
