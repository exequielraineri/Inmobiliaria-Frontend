/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { provincias, tipo_clientes } from "../../data/data";
import { postData, putData } from "../../service/apiService";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { toast } from "sonner";

export const ModalCliente = ({
  showModal,
  setShowModal,
  clienteSelect,
  actualizarTabla,
}) => {
  let inicializarCliente = {
    id: null,
    nombre: "",
    apellido: "",
    telefono: "",
    tipoCliente: null,
    provincia: "",
    estado: true,
  };
  const [cliente, setCliente] = useState(inicializarCliente);
  const [loading, setLoading] = useState(false);
  const { setAlerta } = useContext(UsuarioContexto);
  useEffect(() => {
    setCliente(clienteSelect);
  }, [clienteSelect]);

  //Eliminar o Editar un cliente
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      toast.promise(
        cliente.id == null
          ? postData("clientes", cliente)
          : putData("clientes/" + cliente.id, cliente),
        {
          loading: "Cargando...",
          success: (response) => {
            console.log(response);
            actualizarTabla();
            setCliente(inicializarCliente);
            setShowModal(false);
            return cliente.id == null
              ? "Ingreso extoso"
              : "Modificación exitosa";
          },
          error: "Error",
        }
      );

      // if (cliente.id == null) {
      //   toast.promise(postData("clientes", cliente), {
      //     loading: "Cargando...",
      //     success: (response) => {
      //       return "Ingreso exitoso";
      //     },
      //     error: "Error",
      //   });
      // } else {
      //   toast.promise(putData("clientes/" + cliente.id, cliente), {
      //     loading: "Cargando...",
      //     success: "Modificación exitosa",
      //     error: "Error",
      //   });
      // }
    } catch (error) {
      console.log(error);
      toast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      show={showModal}
      onHide={() => setShowModal(false)}
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
                Dni
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
                Tipo de Cliente
              </label>
              <select
                required
                value={cliente?.tipoCliente}
                onChange={(e) =>
                  setCliente({
                    ...cliente,
                    tipoCliente: e.target?.value,
                  })
                }
                className="form-select"
              >
                <option selected disabled value="">
                  Seleccione
                </option>
                {tipo_clientes.map((tipo) => {
                  return <option value={tipo}>{tipo}</option>;
                })}
              </select>
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
                {provincias.map((prov) => {
                  return <option value={prov}>{prov}</option>;
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
                className="btn btn-outline-primary"
                onClick={() => {
                  setCliente(inicializarCliente);
                  setShowModal(false);
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
