/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { postData } from "../../service/apiService";

export const TransaccionForm = ({
  isOpenTransaccionForm,
  setIsOpenTransaccionForm,
  actualizarTabla,
  setActualizarTabla,
}) => {
  const { usuario } = useContext(UsuarioContexto);
  const [transaccion, setTransaccion] = useState();

  const onSubmit = (e) => {
    e.preventDefault();
    const newTransaccion = {
      ...transaccion,
      agente: usuario,
    };
    try {
      console.log(newTransaccion);
      toast.promise(postData("transacciones", newTransaccion), {
        loading: "Cargando...",
        success: (response) => {
          setIsOpenTransaccionForm(false);
          setTransaccion(null);
          setActualizarTabla(!actualizarTabla);
          return "Ingreso exitoso";
        },
        error: (response) => {
          console.log(response);
          return "Hubo un error";
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Modal
      size="md"
      show={isOpenTransaccionForm}
      onHide={() => {
        setTransaccion(null);
        setIsOpenTransaccionForm(false);
      }}
    >
      <form onSubmit={onSubmit}>
        <ModalHeader>Nueva Transaccion</ModalHeader>
        <ModalBody className="d-flex gap-2 flex-column">
          <div>
            <label className="form-label mb-1" htmlFor="tipoTransaccion">
              Tipo de Transacción
            </label>
            <select
              required
              id="tipoTransaccion"
              className="form-select"
              defaultValue={""}
              value={transaccion?.tipoTransaccion}
              onChange={(e) => {
                setTransaccion({
                  ...transaccion,
                  tipoTransaccion: e.target.value,
                });
              }}
            >
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="INGRESO">INGRESO</option>
              <option value="EGRESO">EGRESO</option>
            </select>
          </div>
          <div>
            <label htmlFor="descripcion" className="form-label mb-1">
              Descripcion
            </label>
            <textarea
              className="form-control"
              type="text"
              required
              rows={2}
              value={transaccion?.descripcion}
              onChange={(e) => {
                setTransaccion({
                  ...transaccion,
                  descripcion: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="form-label mb-1" htmlFor="importe">
              Importe
            </label>
            <input
              required
              className="form-control"
              type="number"
              min={0}
              value={transaccion?.importe}
              onChange={(e) => {
                setTransaccion({
                  ...transaccion,
                  importe: e.target.value,
                });
              }}
            />
          </div>
          <div>
            <label className="form-label mb-1" htmlFor="operacion">
              Operación
            </label>
            <select
              className="form-select"
              value={transaccion?.tipoOperacion}
              onChange={(e) => {
                setTransaccion({
                  ...transaccion,
                  tipoOperacion: e.target.value,
                });
              }}
              required
            >
              <option value="" disabled>
                Seleccione...
              </option>
              <option value="ALQUILER">ALQUILER</option>
              <option value="VENTA">VENTA</option>
              <option value="MANTENIMIENTO">MANTENIMIENTO</option>
              <option value="EXPENSAS">EXPENSAS</option>
              <option value="IMPUESTOS">IMPUESTOS</option>
              <option value="OTROS">OTROS</option>
            </select>
          </div>
        </ModalBody>
        <ModalFooter className="d-flex justify-content-end">
          <button
            type="reset"
            onClick={() => {
              setTransaccion(null);
              setIsOpenTransaccionForm(false);
            }}
            className="btn btn-outline-primary"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </ModalFooter>
      </form>
    </Modal>
  );
};
