/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { PROVINCIAS } from "../../data/data";
import { postData, putData } from "../../service/apiService";

export const AgenteForm = ({
  actualizarTabla,
  setActualizarTabla,
  isOpenAgenteForm,
  setIsOpenAgenteForm,
  setUsuarioSelect,
  usuarioSelect,
}) => {
  const { usuario } = useContext(UsuarioContexto);
  const [agente, setAgente] = useState();

  useEffect(() => {
    setAgente(usuarioSelect);
  }, [usuarioSelect]);

  const onSubmitAgente = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (agente?.id) {
        response = putData("usuarios/" + agente.id, agente);
      } else {
        response = postData("usuarios", agente);
      }

      toast.promise(response, {
        loading: "Cargando...",
        success: (response) => {
          setUsuarioSelect(null);
          setAgente(null);
          setIsOpenAgenteForm(false);
          setActualizarTabla(!actualizarTabla);
          return "Accion exitosa";
        },
        error: (response) => {
          console.log(response);
          return "Error al guardar agente";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      show={isOpenAgenteForm}
      onHide={() => {
        setAgente(null);
        setUsuarioSelect(null);
        setIsOpenAgenteForm(false);
      }}
      backdrop="static"
      keyboard={false}
    >
      <form onSubmit={onSubmitAgente}>
        <Modal.Header closeButton>
          <Modal.Title className="text-primary">Nuevo Agente</Modal.Title>
        </Modal.Header>
        <Modal.Body className="container">
          <div className="d-flex flex-wrap justify-content-between px-2 gap-3">
            <p className="border-bottom col-12 mb-0 fw-bold">
              Datos del Agente
            </p>
            <input type="text" hidden value={agente?.id} />
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="nombre">
                Nombre
              </label>
              <input
                value={agente?.nombre}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    nombre: e.target.value,
                  })
                }
                required
                type="text"
                name="nombre"
                id="nombre"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="apellido">
                Apellido
              </label>
              <input
                value={agente?.apellido}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    apellido: e.target.value,
                  })
                }
                required
                type="text"
                name="apellido"
                id="apellido"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="correo">
                Correo
              </label>
              <input
                value={agente?.correo}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    correo: e.target.value,
                  })
                }
                required
                type="email"
                name="correo"
                id="correo"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="password">
                Contraseña
              </label>
              <input
                value={agente?.password}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    password: e.target.value,
                  })
                }
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="dni">
                DNI
              </label>
              <input
                value={agente?.dni}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    dni: e.target.value,
                  })
                }
                required
                type="text"
                name="dni"
                id="dni"
                className="form-control"
              />
            </div>

            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="telefono">
                Telefono
              </label>
              <input
                value={agente?.telefono}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    telefono: e.target.value,
                  })
                }
                required
                type="tel"
                name="telefono"
                id="telefono"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="dni">
                Comision Venta(%)
              </label>
              <input
                value={agente?.comisionVenta}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    comisionVenta: e.target.value,
                  })
                }
                required
                min={0}
                max={100}
                step={0.1}
                type="number"
                name="comisionVenta"
                id="comisionVenta"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="dni">
                Comision Alquiler (%)
              </label>
              <input
                value={agente?.comisionAlquiler}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    comisionAlquiler: e.target.value,
                  })
                }
                required
                min={0}
                max={100}
                step={0.1}
                type="number"
                name="comisionAlquiler"
                id="comisionAlquiler"
                className="form-control"
              />
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="provincia">
                Provincia
              </label>
              <select
                defaultValue={""}
                value={agente?.priovincia}
                onChange={(e) =>
                  setAgente({
                    ...agente,
                    provincia: e.target.value,
                  })
                }
                className="form-select"
                name="provincia"
                id="provincia"
              >
                <option value="" disabled>
                  Seleccione...
                </option>
                {PROVINCIAS.map((prov) => {
                  return (
                    <option key={prov} value={prov}>
                      {prov}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="col-12 col-md-5">
              <label className="form-label mb-1" htmlFor="rol">
                Rol
              </label>
              <select
                defaultValue={""}
                className="form-select"
                name="rol"
                id="rol"
                value={agente?.rol}
                onChange={(e) => setAgente({ ...agente, rol: e.target.value })}
              >
                <option value="" disabled>
                  Seleccione.. .
                </option>
                <option value="USER">Agente</option>
                <option value="ADMIN">Administrador</option>
              </select>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <>
            <button
              type="reset"
              className="btn btn-outline-primary"
              onClick={() => {
                setUsuarioSelect(null);
                setAgente(null);
                setIsOpenAgenteForm(false);
              }}
            >
              Cerrar
            </button>
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
          </>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
