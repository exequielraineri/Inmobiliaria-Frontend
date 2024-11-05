import { Link } from "react-router-dom";
import { ContratoTable } from "./ContratoTable";
export const ContratoPage = () => {
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Contratos</h3>
        {/* <h6 className="text-secondary">Criterios de busqueda</h6>
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
        </form> */}
      </div>
      <div className="d-flex justify-content-end gap-2">
        {/* <button className="btn btn-sm btn-danger my-3">Imprimir</button> */}
        <Link to={"/contratos/nuevo"} className="btn btn-sm btn-primary my-3">
          Nuevo
        </Link>
      </div>

      <ContratoTable />
    </main>
  );
};
