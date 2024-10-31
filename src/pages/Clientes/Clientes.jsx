/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { provincias, tipo_clientes } from "../../data/data";
import { useContext, useEffect, useState } from "react";
import { ModalCliente } from "../../components/ModalCliente/ModalCliente";
import { deleteData, getData } from "../../service/apiService";
import { Loading } from "../../components/Loading/Loading";
import { toast } from "sonner";

export const Clientes = ({ mostrarAlerta }) => {
  const [showModal, setShowModal] = useState(false);

  const [clienteSelect, setClienteSelect] = useState(null);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false);
  const cargarClientes = async () => {
    setLoading(true);
    try {
      const response = await getData("clientes");
      setClientes(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const actualizarTabla = () => {
    cargarClientes();
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  //Eliminar cliente
  const eliminarCliente = async (id) => {
    try {
      toast.promise(deleteData("clientes/" + id), {
        loading: "Cargando...",
        success: (response) => {
          actualizarTabla();
          return "Eliminacion exitosa";
        },
        error: (response) => {
          console.log(response);
          return "Error";
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <Loading texto={"Cargando clientes?..."} />;

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Clientes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="tipo">
              Tipo Cliente
            </label>
            <select className="form-select" name="tipo">
              <option value="Todos">Todos</option>
              {tipo_clientes?.map((tipo) => {
                return <option value={tipo}>{tipo}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Provincia
            </label>
            <select className="form-select" name="provincia" id="provincia">
              <option value="Todos">Todos</option>
              {provincias.map((prov) => {
                return <option value={prov}>{prov}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" name="estado">
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>
        <ModalCliente
          showModal={showModal}
          setShowModal={setShowModal}
          clienteSelect={clienteSelect}
          actualizarTabla={actualizarTabla}
        />

        <div className="d-flex justify-content-end">
          <button
            onClick={() => setShowModal(true)}
            className="btn btn-primary"
            type="button"
          >
            Nuevo
          </button>
        </div>
      </div>
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
                <th className="col">Tipo</th>
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
                  <tr>
                    <td>{++index}</td>
                    <td>{cliente?.nombre || "-"}</td>
                    <td>{cliente?.apellido || "-"}</td>
                    <td>{cliente?.telefono || "-"}</td>
                    <td>{cliente?.provincia || "-"}</td>
                    <td>{cliente?.tipoCliente || "-"}</td>
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
                            setShowModal(true);
                          }}
                          className="btn btn-outline-warning btn-sm"
                        >
                          <i className="fa-solid fa-edit"></i>
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "¿Estás seguro de que deseas eliminar este cliente?"
                              )
                            ) {
                              eliminarCliente(cliente.id);
                            }
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
    </main>
  );
};
