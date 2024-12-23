/* eslint-disable react/jsx-key */
import { useState } from "react";
import { TIPOS_OPERACION } from "../../data/data";
import { CajaForm } from "./CajaForm";
import { CajaTable } from "./CajaTable";

export const CajaPage = () => {
  const [isOpenTransaccionForm, setIsOpenTransaccionForm] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);
  const [filtro, setFiltro] = useState({
    tipoTransaccion: null,
    tipoOperacion: null,
    fechaDesde: null,
    fechaHasta: null,
  });

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Caja</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="tipoTransaccion">
              Tipo de Transacción
            </label>
            <select
              value={filtro?.tipoTransaccion}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  tipoTransaccion: e.target.value,
                });
              }}
              defaultValue={""}
              className="form-select"
              id="tipoTransaccion"
              name="tipoTransaccion"
            >
              <option value="">Todos</option>
              <option value="INGRESO">INGRESO</option>
              <option value="EGRESO">EGRESO</option>
            </select>
          </div>
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="tipoOperacion">
              Tipo de Operación
            </label>
            <select
              value={filtro?.tipoOperacion}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  tipoOperacion: e.target.value,
                });
              }}
              defaultValue={""}
              className="form-select"
              id="tipoOperacion"
              name="tipoOperacion"
            >
              <option value="">Todos</option>
              {TIPOS_OPERACION.map((tipo) => {
                return <option value={tipo}>{tipo}</option>;
              })}
            </select>
          </div>
          <div className="col-auto col-md-2 col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Desde
            </label>
            <input
              value={
                filtro?.fechaDesde ? filtro?.fechaDesde?.split("T")[0] : ""
              }
              onChange={(e) => {
                const fecha = e.target.value;
                setFiltro({
                  ...filtro,
                  fechaDesde: fecha + "T00:00:00",
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
              value={
                filtro?.fechaHasta ? filtro?.fechaHasta?.split("T")[0] : ""
              }
              onChange={(e) => {
                const fecha = e.target.value;
                setFiltro({
                  ...filtro,
                  fechaHasta: fecha + "T23:59:59",
                });
              }}
              type="date"
              className="form-control"
            />
          </div>
        </form>
        <div className="d-flex justify-content-end">
          <button
            className="btn btn-primary"
            onClick={() => {
              setIsOpenTransaccionForm(true);
            }}
          >
            Nuevo
          </button>
        </div>
      </div>

      <CajaForm
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenTransaccionForm={isOpenTransaccionForm}
        setIsOpenTransaccionForm={setIsOpenTransaccionForm}
      />

      <CajaTable
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        filtro={filtro}
        setFiltro={setFiltro}
      />
    </main>
  );
};
