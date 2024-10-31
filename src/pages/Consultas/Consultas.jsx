/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";
import { getData } from "../../service/apiService";

export const Consultas = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [consultas, setConsultas] = useState([]);
  const [consulta, setConsulta] = useState(null);

  const cargarConsultas = async () => {
    try {
      const response = await getData("/consultas");
      setConsultas(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    cargarConsultas();
  }, []);

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Consultas</h3>
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
        <p className="pb-0 mb-0 fw-ligth">Encontrados {consulta?.length}</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-1">#</th>
                <th className="col">Cliente</th>
                <th className="col">Inmueble</th>
                <th className="col">Operación</th>
                <th className="col">Estado</th>
                <th className="col">Fecha Consulta</th>
                <th className="col-1"></th>
              </tr>
            </thead>
            <tbody>
              {consultas?.map((consulta, index) => {
                return (
                  <tr>
                    <td>{++index}</td>
                    <td>{consulta?.cliente?.nombre || "-"}</td>
                    <td>{consulta?.inmueble?.titulo || "-"}</td>
                    <td>ALQUILER</td>
                    <td>PEDIENTE</td>
                    <td>
                      {new Date(consulta?.fechaRegistro).toLocaleDateString(
                        undefined,
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button
                          onClick={() => setIsOpenModal(true)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="fa-solid fa-search"></i>
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Modal show={isOpenModal} size="lg">
        <ModalHeader>
          <ModalTitle>
            Detalle Consulta - <i>{consulta?.estado}</i>
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-between container">
            <cite className="d-inline">Operación: {consulta?.operacion}</cite>
            <cite className="d-inline">{consulta?.fechaConsulta}</cite>
          </div>
          <div className="container my-2">
            <h5 className="border-bottom">Datos del cliente</h5>
            <p>
              Nombre y Apellido:{" "}
              <strong>
                {consulta?.cliente.apellido + " " + consulta?.cliente.nombre}
              </strong>
              <br />
              Email: <strong>{consulta?.cliente.email}</strong>
            </p>
          </div>
          <div className="container">
            <h5 className="border-bottom">Datos del Inmueble</h5>
            <p>
              Titulo: <strong>{consulta?.inmueble.titulo}</strong>
              <br />
              Tipo: <strong>{consulta?.inmueble.tipo}</strong>
            </p>
          </div>
          <div className="container">
            <p>
              Mensaje: <br />
              <strong>
                <i>{consulta?.mensaje}</i>
              </strong>
            </p>
          </div>
          <div className="border-top mt-5 text-bg-dark container p-3 rounded">
            <h5>Responder</h5>
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="estado"
                id="isRespondido"
              />
              <label className="form-check-label" htmlFor="isRespondido">
                Marcar Respondido
              </label>
            </div>
          </div>
        </ModalBody>
        <Modal.Footer>
          <button
            onClick={() => setIsOpenModal(false)}
            className="btn btn-outline-primary"
          >
            Cerrar
          </button>
          <button type="submit" className="btn btn-primary">
            Responder
          </button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};
