import React, { useEffect, useState } from "react";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";

export const ContratoResumen = ({ contrato }) => {
  const [cliente, setCliente] = useState();
  const [inmueble, setInmueble] = useState();
  const fetchDatos = async () => {
    try {
      if (contrato?.inmueble?.id) {
        const responseInmueble = await getData(
          "/inmuebles/" + contrato?.inmueble?.id
        );
        setInmueble(responseInmueble?.data);
      } else {
        setInmueble(null);
      }
      if (contrato?.cliente?.id) {
        const responseCliente = await getData(
          "/clientes/" + contrato?.cliente?.id
        );
        setCliente(responseCliente?.data);
      } else {
        setCliente(null);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchDatos();
  }, [contrato]);
  return (
    <div>
      <h5>Resumen del contrato</h5>
      <hr />
      <p>
        Titulo del Inmueble: <strong>{inmueble?.titulo || "-"}</strong>
        <br />
        {contrato?.tipoContrato == "VENTA" ? (
          <>
            Precio Venta:{" "}
            <strong>
              {inmueble?.precioVenta
                ? formatearPrecio(inmueble?.precioVenta)
                : "-"}
            </strong>
          </>
        ) : (
          <>
            Precio Alquiler / Dia:{" "}
            <strong>
              {inmueble?.precioAlquilerDia
                ? formatearPrecio(inmueble?.precioAlquilerDia)
                : "-"}
            </strong>
            <br />
            Precio Alquiler / Mes:{" "}
            <strong>
              {inmueble?.precioAlquilerMes
                ? formatearPrecio(inmueble?.precioAlquilerMes)
                : "-"}
            </strong>
          </>
        )}
        <br />
        Propieatrio:{" "}
        <strong>
          {(inmueble?.propietario?.nombre || "-") +
            " " +
            (inmueble?.propietario?.apellido || "-")}
        </strong>
        <hr />
        Cliente:{" "}
        <strong>
          {(cliente?.nombre || "-") + " " + (cliente?.apellido || "-")}
        </strong>
        <br />
        Tipo: <strong>{contrato?.tipoContrato || "-"}</strong>
        {contrato?.tipoContrato == "ALQUILER" && (
          <>
            <br />
            Periodo Alquiler:
            <strong>
              {(contrato?.fechaInicio
                ? new Date(contrato?.fechaInicio).toLocaleString(undefined, {
                    timeZone: "UTC",
                    dateStyle: "short",
                  })
                : "-") +
                " - " +
                (contrato?.fechaFin
                  ? new Date(contrato?.fechaFin).toLocaleString(undefined, {
                      timeZone: "UTC",
                      dateStyle: "short",
                    })
                  : "-")}
            </strong>
          </>
        )}
        <br />
        {contrato?.tipoContrato == "VENTA" && (
          <>
            Entrega de Primer pago:{" "}
            <strong>{contrato?.entrega ? contrato?.entrega + "%" : "-"}</strong>
            <br />
            Cantidad de cuotas: <strong>{contrato?.cuotas || "-"}</strong>
            <br />
          </>
        )}
        Frecuencia Pago: <strong>{contrato?.frecuenciaPago || "-"}</strong>
        <hr />
        Fecha del primer Pago:{" "}
        <strong>
          {new Date().toLocaleString(undefined, {
            timeZone: "UTC",
            dateStyle: "short",
          })}
        </strong>
      </p>
    </div>
  );
};
