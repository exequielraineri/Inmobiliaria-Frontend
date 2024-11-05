import { useContext, useEffect, useState } from "react";
import { deleteData, getData } from "../../service/apiService";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";

export const AgenteTable = ({
  actualizarTabla,
  setActualizarTabla,
  usuarioSelect,
  setUsuarioSelect,
  isOpenAgenteForm,
  setIsOpenAgenteForm,
}) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const { usuario } = useContext(UsuarioContexto);
  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await getData("usuarios");
      setUsuarios(response?.data);
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
  }, [actualizarTabla]);

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
                <th className="col">Nombre</th>
                <th className="col">Apellido</th>
                <th className="col">Email</th>
                <th className="col">Provincia</th>
                <th className="col">Rol</th>
                <th className="col">Fecha Registro</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {usuarios?.map((user, index) => {
                return (
                  <tr key={user.id}>
                    <td>{++index}</td>
                    <td>{user?.nombre || "-"}</td>
                    <td>{user?.apellido || "-"}</td>
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
