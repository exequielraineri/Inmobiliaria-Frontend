/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react";
import { deleteData, getData } from "../../service/apiService";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";

export const ClienteTable = ({
  actualizarTabla,
  setActualizarTabla,
  clienteSelect,
  setClienteSelect,
  setIsOpenClienteForm,
  filtro,
  setFiltro,
}) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(UsuarioContexto);
  const fetchClientes = async () => {
    setLoading(true);
    try {
      let parametros = "";

      if (filtro?.provincia) {
        parametros += `&provincia=${filtro?.provincia}`;
      }
      if (filtro?.estado) {
        parametros += `&estado=${filtro?.estado}`;
      }

      const response = await getData("clientes?" + parametros);
      setClientes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, [actualizarTabla, filtro]);

  //Eliminar cliente
  const eliminarCliente = async (id) => {
    try {
      if (confirm("Seguro desea eliminar el cliente?")) {
        const response = await deleteData("clientes/" + id, usuario?.rol);
        if (response instanceof Error) {
          toast.warning(response?.message);
          return new Error(response?.message);
        }

        toast.success("Cliente eliminado");
        setActualizarTabla(!actualizarTabla);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <div>Cargando...</div>;

  return (
    <div>
      <div className="bloque mt-4">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados {clientes?.length}</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Nombre</th>
                <th className="col">Apellido</th>
                <th className="col">Telefono</th>
                <th className="col">Provincia</th>
                <th className="col">Fecha Registro</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {clientes?.length == 0 && (
                <tr>
                  <td colSpan={8}>No se encontro clientes</td>
                </tr>
              )}
              {clientes?.map((cliente, index) => {
                return (
                  <tr key={cliente.id}>
                    <td>{++index}</td>
                    <td>{cliente?.nombre || "-"}</td>
                    <td>{cliente?.apellido || "-"}</td>
                    <td>{cliente?.telefono || "-"}</td>
                    <td>{cliente?.provincia || "-"}</td>
                    <td>
                      <span>
                        {new Date(cliente?.fechaRegistro).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div className="d-flex gap-1">
                        <button hidden className="btn btn-primary btn-sm">
                          <i className="fa-solid fa-eye"></i>
                        </button>
                        <button
                          onClick={() => {
                            setClienteSelect(cliente);
                            setIsOpenClienteForm(true);
                          }}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            eliminarCliente(cliente.id);
                          }}
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
