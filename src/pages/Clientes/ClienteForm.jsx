/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { PROVINCIAS } from "../../data/data";
import { postData, putData } from "../../service/apiService";

export const ClienteForm = ({
  isOpenClienteForm,
  setIsOpenClienteForm,
  actualizarTabla,
  setActualizarTabla,
  clienteSelect,
  setClienteSelect,
}) => {
  const [cliente, setCliente] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCliente(clienteSelect);
  }, [clienteSelect]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let response;
      if (cliente?.id == null) {
        response = postData("clientes", cliente);
      } else {
        response = putData("clientes/" + cliente.id, cliente);
      }

      toast.promise(response, {
        loading: "Cargando...",
        success: (response) => {
          setCliente(null);
          setClienteSelect(null);
          setActualizarTabla(!actualizarTabla);
          setIsOpenClienteForm(false);
          return "Accion exitosa";
        },
        error: (response) => {
          console.log(response);
          return "Error al guardar cliente";
        },
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={isOpenClienteForm}
      onHide={() => {
        setIsOpenClienteForm(false);
        setCliente(null);
        setClienteSelect(null);
      }}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={onSubmit}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Nuevo Cliente</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container">
          <div className="row gap-3">
            <p className="border-bottom col-12 mb-0 fw-bold">
              Datos del cliente
            </p>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="nombre">
                Nombre
              </label>
              <input
                value={cliente?.nombre}
                onChange={(e) =>
                  setCliente({ ...cliente, nombre: e.target?.value })
                }
                required
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="apellido">
                Apellido
              </label>
              <input
                value={cliente?.apellido}
                onChange={(e) =>
                  setCliente({ ...cliente, apellido: e.target?.value })
                }
                required
                type="text"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="dni">
                DNI
              </label>
              <input
                value={cliente?.dni}
                onChange={(e) =>
                  setCliente({ ...cliente, dni: e.target?.value })
                }
                required
                type="number"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="telefono">
                Telefono
              </label>
              <input
                value={cliente?.telefono}
                onChange={(e) =>
                  setCliente({ ...cliente, telefono: e.target?.value })
                }
                required
                type="tel"
                className="form-control"
              />
            </div>

            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="provincia">
                Provincia
              </label>
              <select
                required
                value={cliente?.provincia}
                onChange={(e) =>
                  setCliente({ ...cliente, provincia: e.target?.value })
                }
                className="form-select"
              >
                <option selected disabled value="">
                  Seleccione
                </option>
                {PROVINCIAS?.map((prov) => {
                  return (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <button
                type="reset"
                className="btn btn-outline-primary"
                onClick={() => {
                  setCliente(null);
                  setClienteSelect(null);
                  setIsOpenClienteForm(false);
                }}
              >
                Cerrar
              </button>
              <button type="submit" className="btn btn-primary">
                {cliente?.id == null ? "Guardar" : "Modificar"}
              </button>
            </>
          )}
        </Modal.Footer>
      </form>
    </Modal>
  );
};
