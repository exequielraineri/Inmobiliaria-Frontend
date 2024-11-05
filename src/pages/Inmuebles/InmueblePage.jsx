/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Link } from "react-router-dom";
import { InmuebleTable } from "./InmuebleTable";

export const InmueblePage = () => {
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Inmuebles</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-auto">
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
          <div className="col-auto">
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
          <div className="col-auto">
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
              to={"/inmuebles/nuevo"}
              className="btn btn-primary"
              type="button"
            >
              Nuevo
            </Link>
          </div>
        </div>
      </div>

      <div className="bloque mt-2">
        <InmuebleTable />
      </div>
    </main>
  );
};
