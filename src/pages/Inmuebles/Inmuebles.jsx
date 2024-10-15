import { Link } from "react-router-dom";

export const Inmuebles = () => {
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Inmuebles</h3>

        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="tipo">
              Tipo Inmumeble
            </label>
            <select className="form-select" id="tipo" name="tipo">
              <option value="Todos">Todos</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Campo">Campo</option>
              <option value="Oficina">Oficina</option>
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Ubicación
            </label>
            <input
              className="form-control"
              type="text"
              id="ubicacion"
              name="ubicacion"
              placeholder="Ubicacion"
            />
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Alquilado">Alquilado</option>
              <option value="Vendido">Vendido</option>
              <option value="Mantenimiento">Mantenimiento</option>
              <option value="Cancelado">Cancelado</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>

        <div className="d-flex justify-content-end">
          <div className="dropdown">
            <Link
              className="btn btn-sm btn-primary dropdown-toggle"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Nuevo
            </Link>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <Link to={"/inmuebles/nuevo"} className="dropdown-item" href="">
                  Casa
                </Link>
              </li>
              <li>
                <a className="dropdown-item" href="">
                  Departamento
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="">
                  Campo
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="">
                  Oficina
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-4 bloque">
        <h3>Listado </h3>
        <p className="pb-0 mb-0 fw-ligth"></p>
        <div className="table-responsive">
          <table className="table table-hover table-ligth table-striped table-sm ">
            <thead style={{ fontSize: ".8em" }}>
              <tr>
                <th>Imagen</th>
                <th>Cliente</th>
                <th>Tipo de Inmueble</th>
                <th>Ubicación</th>
                <th>Prec. Venta</th>
                <th>Prec. Alquiler</th>
                <th hidden>Imp. Municipal</th>
                <th hidden> Imp. Inmobiliario</th>
                <th hidden> Fecha Registro</th>
                <th hidden> fecha Publicación</th>
                <th hidden>Mts2</th>
                <th hidden> Ambientes</th>
                <th hidden> Tipo Ambiente</th>
                <th hidden>Expensas</th>
                <th hidden>Hectareas</th>
                <th hidden>Riego</th>
                <th hidden>Acceso Ruta</th>
                <th hidden>Vidriera</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr
                style={{
                  fontSize: ".9em",
                }}
                className="text-capitalize"
              >
                <td>
                  <img alt="alt" src="/" />
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>

                <td>
                  <a className="btn btn-sm btn-outline-info" href="">
                    <i className="fa-solid fa-search"></i>
                  </a>
                  <a className="btn btn-sm btn-outline-danger" href="">
                    <i className="fa-solid fa-trash"></i>
                  </a>
                  <a className="btn btn-sm btn-outline-warning" href="">
                    <i className="fa-solid fa-edit"></i>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
