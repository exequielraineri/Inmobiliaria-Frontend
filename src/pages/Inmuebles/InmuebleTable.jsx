import React, { useContext, useEffect, useState } from "react";
import { Imagen } from "../../components/Imagen/Imagen";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../../service/apiService";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";

export const InmuebleTable = () => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(UsuarioContexto);
  const fetchInmuebles = async () => {
    setLoading(true);
    try {
      const response = await getData("inmuebles");
      setInmuebles(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarInmueble = async (id) => {
    try {
      if (confirm("Seguro desea eliminar el inmueble?")) {
        const response = await deleteData("inmuebles/" + id, usuario?.rol);

        if (response instanceof Error) {
          toast.warning(response?.message);
          throw new Error(response.message);
        }

        toast.success("Inmueble eliminado");
        fetchInmuebles();
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInmuebles();
  }, []);

  return (
    <div>
      <h3>Listado</h3>
      <p className="pb-0 mb-0 fw-ligth">Encontrados {inmuebles?.length}</p>
      <div className="table-responsive">
        <table className="table table-hover table-ligth table-striped table-sm ">
          <thead>
            <tr>
              <th className="col-auto">#</th>
              <th className="col">Imagen</th>
              <th className="col">Titulo</th>
              <th className="col">Propietario</th>
              <th className="col">Tipo de Inmueble</th>
              <th className="col">Dirección</th>
              <th className="col">Prec. Venta</th>
              <th className="col">Prec. Alquiler</th>
              <th className="col">Estado</th>
              <th className="col-auto"></th>
            </tr>
          </thead>

          <tbody>
            {inmuebles?.map((inmueble, index) => {
              return (
                <tr
                  key={inmueble.id}
                  style={{
                    fontSize: ".9em",
                  }}
                  className="text-capitalize"
                >
                  <td>{++index}</td>
                  <td>
                    {inmueble.imagenes[0] && (
                      <Imagen imagen={inmueble?.imagenes[0]} width={100} />
                    )}
                  </td>
                  <td>{inmueble?.titulo || "-"}</td>
                  <td>
                    {inmueble.propietario?.apellido +
                      " " +
                      inmueble.propietario?.nombre}
                  </td>
                  <td>{inmueble.tipoInmueble || "-"}</td>
                  <td>{inmueble.direccion || "-"}</td>
                  <td>
                    {inmueble.venta
                      ? new Intl.NumberFormat("en-ES", {
                          currency: "ARS",
                          style: "currency",
                          currencyDisplay: "narrowSymbol",
                        }).format(inmueble.precioVenta)
                      : "-"}
                  </td>
                  <td>
                    {inmueble.venta == false
                      ? new Intl.NumberFormat("en-ES", {
                          currency: "ARS",
                          style: "currency",
                          currencyDisplay: "narrowSymbol",
                        }).format(inmueble.precioAlquiler)
                      : "-"}
                  </td>
                  <td>{inmueble?.estado || "-"}</td>
                  <td>
                    <div className="d-flex gap-1">
                      <Link className="btn btn-sm btn-outline-info">
                        <i className="fa-solid fa-search"></i>
                      </Link>
                      <button
                        onClick={() => {
                          eliminarInmueble(inmueble.id);
                        }}
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="fa-solid fa-trash"></i>
                      </button>
                      <Link
                        className="btn btn-sm btn-outline-warning"
                        to={"/inmuebles/editar/" + inmueble.id}
                      >
                        <i className="fa-solid fa-edit"></i>
                      </Link>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
