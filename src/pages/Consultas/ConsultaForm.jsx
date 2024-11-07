import { useContext, useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData, postData, putData } from "../../service/apiService";

export const ConsultaForm = ({
  actualizarTabla,
  setActualizarTabla,
  isOpenConsultaForm,
  setIsOpenConsultaForm,
  consultaSelect,
  setConsultaSelect,
}) => {
  const { usuario } = useContext(UsuarioContexto);
  const [consulta, setConstulta] = useState();
  const [clientes, setClientes] = useState([]);
  const [inmuebles, setInmuebles] = useState([]);
  const fetchDatos = async () => {
    try {
      const responseClientes = await getData("clientes");
      const responseInmuebles = await getData("inmuebles");

      setClientes(responseClientes?.data);
      setInmuebles(responseInmuebles?.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const newConsulta = {
        ...consulta,
        agente: usuario,
      };
      // console.log(newConsulta);

      let responseData;
      if (newConsulta?.id) {
        responseData = putData("consultas/" + newConsulta?.id, newConsulta);
      } else {
        responseData = postData("consultas", newConsulta);
      }

      toast.promise(responseData, {
        loading: "Cargando...",
        success: (response) => {
          // console.log(response);
          setConstulta(null);
          setConsultaSelect(null);
          setIsOpenConsultaForm(false);
          setActualizarTabla(!actualizarTabla);
          return "Acción exitosa";
        },
        error: (response) => {
          console.error(response);
          return "Hubo un error";
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  useEffect(() => {
    setConstulta(consultaSelect);
  }, [consultaSelect]);

  return (
    <>
      <Modal
        show={isOpenConsultaForm}
        onHide={() => {
          setConsultaSelect(null);
          setConstulta(null);
          setIsOpenConsultaForm(false);
        }}
      >
        <form onSubmit={onSubmit}>
          <ModalHeader>Nueva consulta</ModalHeader>
          <ModalBody className="d-flex gap-3 flex-column">
            <div>
              <label className="form-label mb-1" htmlFor="cliente">
                Cliente
              </label>
              <select
                required
                defaultValue={""}
                className="form-select"
                value={consulta?.cliente?.id}
                onChange={(e) => {
                  setConstulta({
                    ...consulta,
                    cliente: {
                      id: Number.parseInt(e.target.value),
                    },
                  });
                }}
              >
                <option value="" disabled>
                  Seleccione...
                </option>
                {clientes?.map((cliente) => {
                  return (
                    <option key={cliente?.id} value={cliente?.id}>
                      {cliente?.nombre + " " + cliente?.apellido}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="form-label mb-1" htmlFor="inmueble">
                Inmueble
              </label>
              <select
                required
                defaultValue={""}
                className="form-select"
                value={consulta?.inmueble?.id}
                onChange={(e) => {
                  setConstulta({
                    ...consulta,
                    inmueble: {
                      id: Number.parseInt(e.target.value),
                    },
                  });
                }}
              >
                <option value="" disabled>
                  Seleccione...
                </option>
                {inmuebles?.map((inmumeble) => {
                  return (
                    <option key={inmumeble?.id} value={inmumeble?.id}>
                      {inmumeble?.titulo + ", " + inmumeble?.direccion}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <label className="form-label mb-1" htmlFor="descripcion">
                Descripcion
              </label>
              <textarea
                className="form-control"
                rows={3}
                required
                value={consulta?.descripcion}
                onChange={(e) => {
                  setConstulta({
                    ...consulta,
                    descripcion: e.target.value,
                  });
                }}
              ></textarea>
            </div>
          </ModalBody>
          <ModalFooter>
            <button
              type="reset"
              onClick={() => {
                setConstulta(null);
                setConsultaSelect(null);
                setIsOpenConsultaForm(false);
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
    </>
  );
};
