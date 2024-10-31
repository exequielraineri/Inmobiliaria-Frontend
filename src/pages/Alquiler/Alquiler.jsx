/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { formatearPrecio } from "../../data/funciones";
import { getData } from "../../service/apiService";
export const Alquiler = () => {
  const [fecha, setFecha] = useState(
    new Date().toLocaleDateString(undefined, { year: "numeric" }) +
      "-" +
      new Date().toLocaleDateString(undefined, { month: "2-digit" })
  );

  const [contratos, setContratos] = useState();
  const [loading, setLoading] = useState(false);

  const cargarContratos = async () => {
    setLoading(true);
    try {
      const response = await getData("/alquiler");
      setContratos(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarContratos();
  }, []);

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Alquiler</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Pendientes">Pendientes</option>
              <option value="Contestadas">Contestadas</option>
            </select>
          </div>
          <div className="col-12 col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Mes
            </label>
            <input
              type="month"
              className="form-control"
              value={fecha}
              onChange={(e) => {
                setFecha(e.target.value);
              }}
            />
          </div>
          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button className="btn btn-sm btn-danger my-3">Imprimir</button>
        <Link to={"/alquiler/nuevo"} className="btn btn-sm btn-primary my-3">
          Nuevo
        </Link>
      </div>
      <div className="bloque">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth">Encontrados</p>
        <div className="table-responsive">
          <table className="table table-dense table-sm table-striped table-hover">
            <thead>
              <tr>
                <th className="col-auto">#</th>
                <th className="col">Cliente</th>
                <th className="col">Inmueble</th>
                <th className="col">Monto</th>
                <th className="col">Contrato</th>
                <th className="col">Inicio</th>
                <th className="col">Fin</th>
                <th className="col">Estado</th>
                <th className="col-auto"></th>
              </tr>
            </thead>
            <tbody>
              {contratos?.map((contrato, index) => {
                console.log(contrato);

                return (
                  <tr>
                    <td>{++index}</td>
                    <td>
                      {contrato?.cliente?.apellido +
                        " " +
                        contrato?.cliente?.nombre}
                    </td>
                    <td>{contrato?.inmueble?.titulo}</td>
                    <td>{formatearPrecio(contrato?.importe)}</td>
                    <td>
                      {new Date(contrato?.fechaContrato).toLocaleDateString()}
                    </td>
                    <td>
                      {new Date(contrato?.fechaInicio).toLocaleDateString()}
                    </td>
                    <td>
                      <span
                        className={
                          new Date() >= new Date(contrato?.fechaFin)
                            ? "bg-warning p-1"
                            : "bg-none p-1"
                        }
                      >
                        {new Date(contrato?.fechaFin).toLocaleDateString()}
                      </span>
                    </td>
                    <td>{contrato?.estado}</td>
                    <td>
                      <div className="d-flex gap-1">
                        <Link to={"/alquiler/" + contrato?.id}>
                          <button className="btn btn-primary btn-sm">
                            <i className="fa-solid fa-eye"></i>
                          </button>
                        </Link>
                        <button className="btn btn-danger btn-sm">
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
