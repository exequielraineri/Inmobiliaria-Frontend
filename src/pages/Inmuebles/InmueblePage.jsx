/* eslint-disable react/jsx-key */
import { useState } from "react";
import { Link } from "react-router-dom";
import { InmuebleTable } from "./InmuebleTable";
import { tipo_inmuebles } from "../../data/data";

export const InmueblePage = () => {
  const [filtro, setFiltro] = useState({
    tipoInmueble: null,
    direccion: null,
    estado: null,
  });
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
            <select
              defaultValue={""}
              className="form-select"
              id="tipo"
              name="tipo"
              value={filtro?.tipoInmueble}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  tipoInmueble: e.target.value,
                });
              }}
            >
              <option value="">Todos</option>
              {tipo_inmuebles.map((inmueble) => {
                return <option value={inmueble}>{inmueble}</option>;
              })}
            </select>
          </div>
          <div className="col-auto">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Ubicación
            </label>
            <input
              value={filtro?.direccion}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  direccion: e.target.value,
                });
              }}
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
            <select
              value={filtro?.estado}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  estado: e.target.value,
                });
              }}
              className="form-select"
              id="estado"
              name="estado"
            >
              <option value="">Todos</option>
              <option value="DISPONIBLE">DISPONIBLE</option>
              <option value="MANTENIMIENTO">MANTENIMIENTO</option>
              <option value="ALQUILADO">ALQUILADO</option>
              <option value="VENDIDO">VENDIDO</option>
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
        <InmuebleTable filtro={filtro} setFiltro={setFiltro} />
      </div>
    </main>
  );
};