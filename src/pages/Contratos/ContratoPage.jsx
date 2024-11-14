/* eslint-disable react/jsx-key */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ESTADOS_CONTRATO } from "../../data/data";
import { ContratoTable } from "./ContratoTable";
import { getData } from "../../service/apiService";
export const ContratoPage = () => {
  const [clientes, setClientes] = useState();
  const [filtro, setFiltro] = useState({
    estado: null,
    activo: null,
    fechaDesde: null,
    fechaHasta: null,
  });

  const fetchClientes = async () => {
    try {
      const response = await getData("clientes");
      setClientes(response?.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchClientes();
  }, []);
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Contratos</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <div className="d-flex flex-wrap gap-3 col-auto">
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
              {ESTADOS_CONTRATO.map((estado) => {
                return <option value={estado}>{estado}</option>;
              })}
            </select>
          </div>
          <div className="col-auto">
            <label className="form-label mb-1">Cliente</label>
            <select
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  cliente: e.target.value,
                });
              }}
              className="form-select"
            >
              <option value="">Todos</option>
              {clientes?.map((cliente) => {
                return (
                  <option key={cliente?.id} value={cliente?.id}>
                    {cliente?.nombre + " " + cliente?.apellido}
                  </option>
                );
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
        </div>
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
