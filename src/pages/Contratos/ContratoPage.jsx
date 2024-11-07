/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Link } from "react-router-dom";
import { estados_contrato } from "../../data/data";
import { ContratoTable } from "./ContratoTable";
export const ContratoPage = () => {
  const [filtro, setFiltro] = useState({
    estado: null,
    activo: null,
    fechaDesde: null,
    fechaHasta: null,
  });

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Contratos</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form
          action="/"
          method="get"
          className="d-flex flex-wrap gap-3 col-auto"
        >
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado del Contrato
            </label>
            <select
              value={filtro?.estado}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  estado: e.target.value,
                });
              }}
              defaultValue={""}
              className="form-select"
              id="estado"
              name="estado"
            >
              <option value="">Todos</option>
              {estados_contrato.map((estado) => {
                return <option value={estado}>{estado}</option>;
              })}
            </select>
          </div>
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="activo">
              Estado
            </label>
            <select
              value={filtro?.activo}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  activo: e.target.value,
                });
              }}
              defaultValue={"true"}
              className="form-select"
              id="activo"
              name="activo"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Desde
            </label>
            <input
              value={filtro?.fechaDesde}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  fechaDesde: e.target.value,
                });
              }}
              type="date"
              className="form-control"
            />
          </div>
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Hasta
            </label>
            <input
              value={filtro?.fechaHasta}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  fechaHasta: e.target.value,
                });
              }}
              type="date"
              className="form-control"
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
        <Link to={"/contratos/nuevo"} className="btn btn-sm btn-primary my-3">
          Nuevo
        </Link>
      </div>

      <ContratoTable filtro={filtro} setFiltro={setFiltro} />
    </main>
  );
};
