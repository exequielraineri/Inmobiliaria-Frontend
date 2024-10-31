/* eslint-disable react/jsx-key */
import { useContext, useEffect, useState } from "react";
import { ModalCliente } from "../../components/ModalCliente/ModalCliente";
import { getData, postData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";
import { useNavigate } from "react-router-dom";
import { UsuarioContexto } from "../../Context/UsuarioContext";
export const FormVenta = () => {
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
  });
  const [inmuebles, setInmuebles] = useState();
  const [clientes, setClientes] = useState();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const cargarDatos = async () => {
    const responseInmuebles = await getData("/inmuebles");
    const responseClientes = await getData("/clientes");
    //filtramos solo inmuebles disponibles
    let disponibles = responseInmuebles?.data?.filter(
      (inm) => inm.estado != "Alquilado"
    );
    setInmuebles(disponibles);

    //filtramos todos menos los propietarios
    let resultado = responseClientes?.data?.filter(
      (cliente) => cliente.tipoCliente != "PROPIETARIO"
    );
    setClientes(resultado);
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const calcularImporte = () => {
    // let inmueble = inmuebles.find((inm) => inm.id == contrato.inmueble.id);
    // const fechaFin = new Date(contrato.fechaFin);
    // const fechaInicio = new Date(contrato.fechaInicio);
    // // console.log(inmueble?.cliente);
    // let diferencia = fechaFin.getTime() - fechaInicio.getTime();
    // const dias = Math.round(diferencia / (1000 * 60 * 60 * 24));
    // setContrato({
    //   ...contrato,
    //   inmueble: inmueble,
    //   dias: dias,
    //   importe: dias * inmueble?.precioAlquiler,
    //   meses: Number(dias / 30).toFixed(1),
    //   precioPorDia: inmueble?.precioAlquiler,
    //   precioPorMes: inmueble?.precioAlquiler * 30,
    // });
  };

  useEffect(() => {
    if (contrato.fechaFin != "") {
      calcularImporte();
    }
  }, [contrato.fechaFin, contrato.inmueble]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(contrato);
      await postData("/alquiler", contrato);
      navigate("/alquiler");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="container-fluid">
      <div>
        <h4 className="border-start border-primary text-primary ps-1">
          Nuevo Alquiler
        </h4>
        <p>Proceso para la generación de nuevo alquiler.</p>
      </div>
      <form onSubmit={onSubmit}>
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
                  required
                  className="form-select"
                  name="inmueble-select"
                  id="inmueble-select"
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {inmuebles?.map((inm) => {
                    return (
                      <option value={inm.id}>
                        {inm.titulo + " - " + inm.direccion}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <p className="text-end">
              Precio alquiler:{" "}
              <span className="fw-bold">
                {formatearPrecio(contrato.inmueble?.precioAlquiler) + " / dia"}
              </span>
            </p>
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
                  <button
                    onClick={() => setShowModal(true)}
                    className="btn btn-primary"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
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
                  required
                  className="form-select"
                  name="cliente-select"
                  id="cliente-select"
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  {clientes?.map((cliente) => {
                    return (
                      <option value={cliente.id}>
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
                  required
                  type="date"
                  value={contrato.fechaInicio}
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
                  value={contrato.fechaFin}
                  onChange={(e) => {
                    const fechaFinValue = e.target.value;
                    const fechaInicioValue = contrato.fechaInicio;

                    if (!fechaFinValue) {
                      window.alert("Por favor, selecciona una fecha válida.");
                      return;
                    }

                    if (fechaInicioValue && fechaFinValue <= fechaInicioValue) {
                      window.alert(
                        "La fecha final debe ser mayor que la fecha de inicio."
                      );
                    } else {
                      setContrato({
                        ...contrato,
                        fechaFin: e.target.value,
                      });
                    }
                  }}
                  required
                  type="date"
                  id="fechaFin"
                  name="fechaFin"
                  className="form-control"
                />
              </div>
            </div>
          </div>
          <div hidden={contrato.fechaFin == ""} className="mb-3  col-12 col-md">
            <h6 className=" bg-primary bg-opacity-10 border-bottom p-2 rounded-1">
              Pagos
            </h6>

            <div className="row col-12 col-md-7">
              <div>
                <label className="form-label" htmlFor="frecuenciaPago">
                  Frecuencia de Pago
                </label>
                <select
                  className="form-select"
                  defaultValue=""
                  required
                  value={contrato?.frecuenciaPago}
                  onChange={(e) =>
                    setContrato({
                      ...contrato,
                      frecuenciaPago: e.target.value,
                    })
                  }
                >
                  <option value="" disabled>
                    Seleccione...
                  </option>
                  <option value="UNICO_PAGO">Pago Unico</option>
                  <option value="MENSUAL">Mensual</option>
                </select>
              </div>
              <div hidden className="form-group col-auto">
                <div hidden={contrato.meses < 1} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoPago"
                    id="tipoPagoMensual"
                  />
                  <label className="form-check-label" htmlFor="tipoPagoMensual">
                    Mensual
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="tipoPago"
                    defaultChecked
                    id="tipoPagoDiario"
                  />
                  <label className="form-check-label" htmlFor="tipoPagoDiario">
                    Diario
                  </label>
                </div>
              </div>

              <div hidden className="col border-start ps-2">
                <p>
                  Importe total:{" "}
                  <strong>
                    {new Intl.NumberFormat("en-ES", {
                      currency: "ARS",
                      style: "currency",
                      currencyDisplay: "narrowSymbol",
                    }).format(Number.parseInt(contrato.importe || 0))}
                  </strong>
                  <br />
                  Dias: <strong>{contrato.dias}</strong>
                  <br />
                  Meses: <strong>{contrato.meses}</strong>
                </p>
                <p>
                  <strong>
                    {formatearPrecio(contrato.precioPorMes)} / mes
                  </strong>
                  <br />
                  <strong>
                    {formatearPrecio(contrato.precioPorDia)} / dia
                  </strong>
                </p>
              </div>
              <div hidden className="mt-3 border rounded p-2 ms-3">
                <h6 className="border-bottom pb-1">Pago por adelantado</h6>
                <div className="col-12 col-md-3">
                  <p>
                    Mes a pagar: <strong>Ocutbre</strong>
                    <br />
                    Importe: <strong>5499</strong>
                  </p>
                </div>
              </div>

              <div hidden>
                <p className="fs-5">
                  Total:{" "}
                  <strong>
                    {new Intl.NumberFormat("es-ES", {
                      currency: "ARS",
                      style: "currency",
                      currencyDisplay: "symbol",
                    }).format(1234546.35)}
                  </strong>{" "}
                  por 39 dias
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="bloque mt-4">
          <button
            type="reset"
            onClick={() => navigate("/alquiler")}
            className="btn btn-outline-primary me-2"
          >
            Cancelar
          </button>
          <button type="submit" className="btn btn-primary">
            Alquilar
          </button>
        </div>
      </form>
      <ModalCliente
        showModal={showModal}
        setShowModal={setShowModal}
        actualizarTabla={cargarDatos}
      />
    </main>
  );
};
