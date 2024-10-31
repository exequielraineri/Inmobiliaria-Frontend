/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";

export const Transacciones = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [transacciones, setTransacciones] = useState([]);

  const cargarTransacciones = async () => {
    try {
      const response = await getData("/transacciones");
      setTransacciones(response?.data);
      console.log(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarTransacciones();
  }, []);

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Transacciones</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Pendientes">Pendientes</option>
              <option value="Contestadas">Contestadas</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>
      </div>
      <div className="bloque mt-4">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">
          Encontrados {transacciones?.length}
        </p>
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
                  <tr>
                    <td>{++index}</td>
                    <td>{transaccion?.descripcion}</td>
                    <td>{formatearPrecio(transaccion?.importe)}</td>
                    <td>
                      {transaccion?.agente?.nombre +
                        " " +
                        transaccion?.agente?.apellido}{" "}
                    </td>
                    <td>{transaccion?.tipoTransaccion}</td>
                    <td>{transaccion?.tipoOperacion}</td>
                    <td>
                      {new Date(
                        transaccion?.fechaTransaccion
                      ).toLocaleDateString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
