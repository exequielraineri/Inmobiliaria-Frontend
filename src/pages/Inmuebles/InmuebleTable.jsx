/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Imagen } from "../../components/Imagen/Imagen";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { formatearPrecio } from "../../data/funciones";
import { deleteData, getData } from "../../service/apiService";

export const InmuebleTable = ({ filtro, setFiltro }) => {
  const [inmuebles, setInmuebles] = useState([]);
  const [loading, setLoading] = useState(false);

  const { usuario } = useContext(UsuarioContexto);
  const fetchInmuebles = async () => {
    setLoading(true);
    try {
      let parametros = "";
      if (filtro?.direccion) {
        parametros += `&direccion=${filtro.direccion}`;
      }
      if (filtro?.tipoInmueble) {
        parametros += `&tipoInmueble=${filtro.tipoInmueble}`;
      }
      if (filtro?.estado) {
        parametros += `&estado=${filtro.estado}`;
      }

      const response = await getData("inmuebles?" + parametros);
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
  }, [filtro]);

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
              <th className="col">Prec. Alquiler Dia</th>
              <th className="col">Prec. Alquiler Mes</th>
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
                    <Imagen imagen={inmueble?.imagenes[0]} width={100} />

                    {inmueble?.imagenes[0] && (
                      <span className="ms-2 text-secondary">
                        + {inmueble?.imagenes?.length - 1}
                      </span>
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
                      ? formatearPrecio(inmueble.precioVenta)
                      : "-"}
                  </td>
                  <td>
                    {inmueble.venta == false
                      ? formatearPrecio(inmueble.precioAlquilerDia)
                      : "-"}
                  </td>
                  <td>
                    {inmueble.venta == false
                      ? formatearPrecio(inmueble.precioAlquilerMes)
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={"px-2 rounded ".concat(
                        inmueble?.estado == "ALQUILADO"
                          ? "text-bg-warning"
                          : inmueble?.estado == "PRIMARY"
                          ? "text-bg-success"
                          : inmueble?.estado == "VENDIDO"
                          ? "text-bg-primary"
                          : "text-bg-success"
                      )}
                    >
                      {inmueble?.estado || "-"}
                    </span>
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <Link hidden className="btn btn-sm btn-outline-info">
                        <i className="fa-solid fa-search"></i>
                      </Link>
                      <button
                        disabled={inmueble.estado == "ALQUILADO"}
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
