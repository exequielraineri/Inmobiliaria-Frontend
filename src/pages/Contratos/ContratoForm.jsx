import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData, postData } from "../../service/apiService";
import { InputText } from "../../components/InputText/InputText";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
export const ContratoForm = () => {
  const { usuario } = useContext(UsuarioContexto);
  const [contrato, setContrato] = useState({
    inmueble: {
      id: null,
    },
    cliente: {
      id: null,
    },
    agente: {
      id: usuario?.id,
    },
    fechaInicio: "",
    fechaFin: "",
    tipoContrato: "",
  });
  const [inmuebles, setInmuebles] = useState([]);
  const [inmueblesFiltrados, setInmueblesFiltrados] = useState([]);
  const [clientes, setClientes] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchDatos = async () => {
    setLoading(true);
    try {
      const responseInmuebles = await getData("/inmuebles?estado=DISPONIBLES");
      const responseClientes = await getData("/clientes");

      setInmuebles(responseInmuebles?.data);
      //filtramos todos menos los propietarios
      let resultado = responseClientes?.data?.filter(
        (cliente) => cliente?.tipoCliente?.toLowerCase() != "propietario"
      );
      setClientes(resultado);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDatos();
  }, []);

  useEffect(() => {
    if (inmuebles) {
      let isVenta = contrato?.tipoContrato?.toLowerCase() == "venta";
      let inmueblesFiltrados = inmuebles?.filter(
        (inmueble) => inmueble?.venta == isVenta
      );
      setInmueblesFiltrados(inmueblesFiltrados);
    }
  }, [contrato?.tipoContrato]);

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(contrato);

    try {
      toast.promise(postData("/contratos", contrato), {
        loading: "Cargando...",
        success: (response) => {
          setContrato(null);
          navigate("/contratos");
          return "Contrato creado exitosamente";
        },
        error: (response) => {
          console.log(response);
          return "Error al generar un contrato";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const verificarFechas = (fechaSelect) => {
    const fechaFinValue = fechaSelect;
    const fechaInicioValue = contrato?.fechaInicio;

    if (fechaInicioValue && fechaFinValue <= fechaInicioValue) {
      toast.warning("La fecha final debe ser mayor que la fecha de inicio.");
    } else {
      setContrato({
        ...contrato,
        fechaFin: fechaSelect,
      });
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <main className="container-fluid">
      <div>
        <h4 className="border-start border-primary text-primary ps-1">
          Nuevo Contrato
        </h4>
        <p>Proceso para la generación de nuevo contrato.</p>
      </div>
      <div className="mb-3 col-12 col-md">
        <h6 className=" bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
          Operación
        </h6>
        <div className="row col-12 col-md-7">
          <div className="form-group col">
            <label className="form-label mb-1" htmlFor="inmueble-select">
              Tipo de Contrato
            </label>

            <select
              defaultValue={""}
              value={contrato?.tipoContrato}
              onChange={(e) => {
                setContrato({
                  ...contrato,
                  tipoContrato: e.target.value,
                });
              }}
              className="form-select"
              name="inmueble-select"
              id="inmueble-select"
            >
              <option value="">Seleccione...</option>
              <option value="ALQUILER">Alquiler</option>
              <option value="VENTA">Venta</option>
            </select>
          </div>
        </div>
      </div>
      <form hidden={contrato?.tipoContrato == ""} onSubmit={onSubmit}>
        <div className="bloque d-flex flex-column align-items-stretch gap-2 justify-content-between">
          <div className="mb-3 col-12 col-md">
            <h6 className=" bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
              Datos del Inmueble
            </h6>
            <div className="row col-12 col-md-7">
              <div className="form-group col-auto">
                <label className="form-label mb-1" htmlFor="searchInmueble">
                  Buscar
                </label>
                <input
                  type="text"
                  id="searchInmueble"
                  name="searchInmueble"
                  className="form-control"
                  placeholder="Ingrese un inmueble"
                />
              </div>
              <div className="form-group col">
                <label className="form-label mb-1" htmlFor="inmueble-select">
                  Inmuebles
                </label>

                <select
                  defaultValue={""}
                  value={contrato?.inmueble?.id}
                  onChange={(e) => {
                    setContrato({
                      ...contrato,
                      inmueble: { id: Number.parseInt(e.target.value) },
                    });
                  }}
                  // required

                  className="form-select"
                  name="inmueble-select"
                  id="inmueble-select"
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {inmueblesFiltrados?.map((inm) => {
                    return (
                      <option key={inm?.id} value={inm?.id}>
                        {inm?.titulo + " - " + inm?.direccion}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="mb-3 col-12 col-md">
            <h6 className="bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
              Datos del Cliente
            </h6>
            <div className="row col-12 col-md-7">
              <div className="form-group col-auto">
                <label className="form-label mb-1" htmlFor="search">
                  Buscar
                </label>
                <div className="d-flex gap-2 align-items-end">
                  <input
                    type="text"
                    id="search"
                    name="search"
                    className="form-control"
                    placeholder="Ingrese un dni"
                  />
                </div>
              </div>
              <div className="form-group col">
                <label className="form-label mb-1" htmlFor="cliente-select">
                  Clientes
                </label>
                <select
                  defaultValue={""}
                  value={contrato?.cliente?.id}
                  onChange={(e) => {
                    setContrato({
                      ...contrato,
                      cliente: { id: Number.parseInt(e.target.value) },
                    });
                  }}
                  // required

                  className="form-select"
                  name="cliente-select"
                  id="cliente-select"
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {clientes?.map((cliente) => {
                    return (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombre +
                          " " +
                          cliente.apellido +
                          " - " +
                          cliente.telefono}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          {contrato?.tipoContrato?.toLowerCase() == "alquiler" && (
            <div className="mb-3 col-12 col-md  ">
              <h6 className=" bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
                Detalles del Contrato
              </h6>
              <div className="row col-12 col-md-7">
                <div className="form-group col">
                  <label className="form-label mb-1" htmlFor="fechaInicio">
                    Fecha Inicio
                  </label>
                  <input
                    required={contrato?.tipoContrato == "ALQUILER"}
                    type="date"
                    value={contrato?.fechaInicio}
                    onChange={(e) =>
                      setContrato({
                        ...contrato,
                        fechaInicio: e.target.value,
                      })
                    }
                    id="fechaInicio"
                    name="fechaInicio"
                    className="form-control"
                  />
                </div>
                <div className="form-group col">
                  <label className="form-label mb-1" htmlFor="fechaFin">
                    Fecha Fin
                  </label>
                  <input
                    value={contrato?.fechaFin}
                    onChange={(e) => {
                      verificarFechas(e.target.value);
                    }}
                    required={contrato?.tipoContrato == "ALQUILER"}
                    type="date"
                    id="fechaFin"
                    name="fechaFin"
                    className="form-control"
                  />
                </div>
              </div>
            </div>
          )}
          <div className="mb-3  col-12 col-md">
            <h6 className=" bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
              Pagos
            </h6>

            <div className="d-flex flex-wrap gap-3">
              <FormControl className="col" variant="filled">
                <InputLabel shrink>Frecuencia de pago</InputLabel>
                <Select
                  required
                  value={contrato?.frecuenciaPago}
                  onChange={(e) =>
                    setContrato({
                      ...contrato,
                      frecuenciaPago: e.target.value,
                    })
                  }
                  defaultValue={""}
                  displayEmpty
                >
                  <MenuItem disabled>Seleccion...</MenuItem>
                  <MenuItem value="UNICO_PAGO">Pago Unico</MenuItem>
                  <MenuItem value="MENSUAL">Mensual</MenuItem>
                </Select>
              </FormControl>

              {contrato?.tipoContrato == "VENTA" && (
                <>
                  <InputText
                    className={"col-auto"}
                    label={"Entrega (%)"}
                    required={
                      contrato?.venta && contrato?.frecuenciaPago == "MENSUAL"
                    }
                    // fullWidth={true}
                    value={contrato?.entrega}
                    onChange={(e) => {
                      setContrato({
                        ...contrato,
                        entrega: e.target.value,
                      });
                    }}
                    type={"number"}
                    min={0}
                    helperText={"Ingrese un valor de la entrega"}
                  />
                  <InputText
                    className={"col-auto"}
                    label={"Cuotas"}
                    required={
                      contrato?.venta && contrato?.frecuenciaPago == "MENSUAL"
                    }
                    // fullWidth={true}
                    value={contrato?.cuotas}
                    onChange={(e) => {
                      setContrato({
                        ...contrato,
                        cuotas: e.target.value,
                      });
                    }}
                    type={"number"}
                    min={1}
                    helperText={"Ingrese cantidad de cuotas"}
                  />
                </>
              )}
            </div>
          </div>
        </div>
        <div className="bloque mt-4 d-flex justify-content-end">
          <button
            type="reset"
            onClick={() => navigate("/contratos")}
            className="btn btn-outline-primary me-2"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>
        </div>
      </form>
    </main>
  );
};
