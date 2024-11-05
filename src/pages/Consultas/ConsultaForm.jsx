import { useEffect, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import { getData, postData, putData } from "../../service/apiService";
import { toast } from "sonner";

export const ConsultaForm = ({
  actualizarTabla,
  setActualizarTabla,
  isOpenConsultaForm,
  setIsOpenConsultaForm,
  consultaSelect,
  setConsultaSelect,
}) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    try {
      let response;
      if (consulta?.id) {
        putData("consultas/" + consulta?.id, consulta);
      } else {
        postData("consultas", consulta);
      }

      toast.promise(response, {
        loading: "Carngando...",
        success: (response) => {
          setConstulta(null);
          setConsultaSelect(null);
          setIsOpenConsultaForm(false);
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
                    id: e.target.value,
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
                    id: e.target.value,
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
  );
};
