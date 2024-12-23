/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { formatearPrecio } from "../../data/funciones";
import { deleteData, getData } from "../../service/apiService";

export const AgenteTable = ({
  actualizarTabla,
  setActualizarTabla,
  setUsuarioSelect,
  setIsOpenAgenteForm,
  filtro,
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [pagos, setPagos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(UsuarioContexto);
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      let parametros = "";
      if (filtro?.activo) {
        parametros += `&activo=${filtro?.activo}`;
      }

      if (filtro?.provincia) {
        parametros += `&provincia=${filtro?.provincia}`;
      }

      const response = await getData("usuarios?" + parametros);
      setUsuarios(response?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fecthPagos = async () => {
    setLoading(true);
    try {
      let parametrosPagos = "&isFechaRegistro=true";
      if (filtro?.fechaDesde) {
        parametrosPagos += `&fechaDesde=${filtro?.fechaDesde}`;
      }
      if (filtro?.fechaHasta) {
        parametrosPagos += `&fechaHasta=${filtro?.fechaHasta}`;
      }
      const responsePagos = await getData("pagos?" + parametrosPagos);
      setPagos(responsePagos?.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const eliminarUsuario = async (id) => {
    if (confirm("Seguro desea eliminar un agente?")) {
      try {
        const response = await deleteData("usuarios/" + id, usuario?.rol);
        if (response instanceof Error) {
          toast.warning(response?.message);
          return new Error();
        }

        toast.success("Agente eliminado");
        setActualizarTabla(!actualizarTabla);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchUsuarios();
    fecthPagos();
  }, [actualizarTabla, filtro]);

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="bloque mt-4">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados {usuarios?.length}</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Agente</th>
                <th className="col">Comision Venta</th>
                <th className="col">Comision Alquiler</th>
                <th className="col">Ganancia</th>
                <th className="col">Ganancias Total</th>
                <th className="col">Email</th>
                <th className="col">Provincia</th>
                <th className="col">Rol</th>
                <th className="col">Fecha Registro</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {usuarios &&
                pagos &&
                usuarios?.map((user, index) => {
                  let ganancia = 0;
                  pagos?.map((pago) => {
                    if (pago?.contrato?.agente?.id == user?.id) {
                      ganancia += pago?.gananciaAgente;
                    }
                  });
                  return (
                    <tr key={user.id}>
                      <td>{++index}</td>
                      <td>
                        {(user?.nombre || "-") + " " + (user?.apellido || "-")}
                      </td>
                      <td>{user?.comisionVenta || "-"}</td>
                      <td>{user?.comisionAlquiler || "-"}</td>
                      <td>{formatearPrecio(ganancia || 0)}</td>
                      <td>{formatearPrecio(user?.totalGanancias)}</td>
                      <td>{user?.correo || "-"}</td>
                      <td>{user?.provincia || "-"}</td>
                      <td>{user?.rol || "-"}</td>
                      <td>
                        {new Date(user?.fechaRegistro).toLocaleDateString()}
                      </td>
                      <td>
                        <div className="d-flex gap-1">
                          <button hidden className="btn btn-primary btn-sm">
                            <i className="fa-solid fa-search"></i>
                          </button>
                          <button
                            onClick={() => {
                              setUsuarioSelect(user);
                              setIsOpenAgenteForm(true);
                            }}
                            className="btn btn-outline-warning btn-sm"
                          >
                            <i className="fa-solid fa-edit"></i>
                          </button>
                          {usuario?.id != user?.id && (
                            <button
                              onClick={() => {
                                eliminarUsuario(user?.id);
                              }}
                              className="btn btn-outline-danger  btn-sm"
                            >
                              <i className="fa-solid fa-trash "></i>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
