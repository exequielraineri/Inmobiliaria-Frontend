/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../data/funciones";
import { deleteData, getData } from "../../service/apiService";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";

export const ContratoTable = ({ filtro, setFiltro }) => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(UsuarioContexto);
  const fetchContratos = async () => {
    setLoading(true);
    try {
      let parametros = "";

      if (filtro?.estado) {
        parametros += `&estado=${filtro.estado}`;
      }
      if (filtro?.fechaDesde) {
        parametros += `&fechaDesde=${filtro.fechaDesde.replaceAll("-", "/")}`;
      }
      if (filtro?.fechaHasta) {
        parametros += `&fechaHasta=${filtro.fechaHasta.replaceAll("-", "/")}`;
      }
      if (filtro?.activo) {
        parametros += `&activo=${filtro.activo}`;
      }

      const response = await getData("contratos?" + parametros);
      setContratos(response?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContratos();
  }, [filtro]);

  const eliminarContrato = async (id) => {
    if (confirm("Seguro desea eliminar un contrato?")) {
      try {
        const response = await deleteData("contratos/" + id, usuario?.rol);
        if (response instanceof Error) {
          toast.warning(response.message);
          return new Error(response.message);
        }

        toast.success("Contrato eliminado");
        fetchContratos();
      } catch (error) {
        console.error(error);
      }
    }
  };

  if (loading) return <div>Cargando...</div>;
  return (
    <div>
      <div className="bloque">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados {contratos?.length}</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Fecha Contrato</th>
                <th className="col">Agente</th>
                <th className="col">Tipo Contrato</th>
                <th className="col">Monto</th>
                <th className="col">Fecha Inicio</th>
                <th className="col">Fecha Fin</th>
                <th className="col">Estado</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {contratos?.map((contrato, index) => {
                return (
                  <tr key={contrato.id}>
                    <td>{++index}</td>
                    <td>
                      {new Date(contrato?.fechaContrato).toLocaleDateString()}
                    </td>
                    <td>{contrato?.agente?.nombre || "-"}</td>
                    <td>{contrato?.tipoContrato || "-"}</td>
                    <td>{formatearPrecio(contrato?.importe)}</td>
                    <td>
                      {contrato?.fechaInicio &&
                        new Date(contrato?.fechaInicio).toLocaleDateString()}
                    </td>
                    <td>
                      {contrato?.fechaFin &&
                        new Date(contrato?.fechaFin).toLocaleDateString()}
                    </td>
                    <td>{contrato?.estado || "-"}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link to={"/contratos/" + contrato?.id}>
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </Link>
                        <button
                          onClick={() => eliminarContrato(contrato?.id)}
                          className="btn btn-outline-danger btn-sm"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
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
