import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalTitle } from "react-bootstrap";

export const ConsultaView = ({
  isOpenConsultaView,
  setIsOpenConsultaView,
  actualizarTabla,
  setActualizarTabla,
  consultaSelect,
  setConsultaSelect,
}) => {
  const [consulta, setConsulta] = useState();

  useEffect(() => {
    setConsulta(consultaSelect);
  }, [consultaSelect]);
  return (
    <Modal
      show={isOpenConsultaView}
      onHide={() => {
        setConsulta(null);
        setConsultaSelect(null);
        setIsOpenConsultaView(false);
      }}
      size="lg"
    >
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
          type="reset"
          onClick={() => {
            setConsulta(null);
            setConsultaSelect(null);
            setIsOpenConsultaView(false);
          }}
          className="btn btn-outline-primary"
        >
          Cerrar
        </button>
        <button type="submit" className="btn btn-primary">
          Responder
        </button>
      </Modal.Footer>
    </Modal>
  );
};
