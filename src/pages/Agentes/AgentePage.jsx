/* eslint-disable react/jsx-key */
import { useState } from "react";
import { AgenteForm } from "./AgenteForm";
import { AgenteTable } from "./AgenteTable";

export const AgentePage = () => {
  const [isOpenAgenteForm, setIsOpenAgenteForm] = useState(false);
  const [actualizadoTabla, setActualizarTabla] = useState(false);
  const [usuarioSelect, setUsuarioSelect] = useState();
  const [filtro, setFiltro] = useState({
    provincia: null,
    activo: null,
  });
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Agentes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <div className="d-flex flex-wrap gap-3 col-12">
          <div className="col-auto">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Provincia
            </label>
            <input
              placeholder="Ingrese provincia"
              className="form-control"
              type="text"
              value={filtro?.provincia}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  provincia: e.target.value,
                });
              }}
            />
          </div>
          <div className="col-auto">
            <label
              defaultValue={""}
              className="form-label mb-1"
              htmlFor="estado"
            >
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
              className="form-select"
              id="estado"
              name="estado"
              defaultValue="true"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              setUsuarioSelect(null);
              setIsOpenAgenteForm(true);
            }}
            className="btn btn-primary"
            type="button"
          >
            Nuevo
          </button>
        </div>
      </div>

      <AgenteTable
        actualizarTabla={actualizadoTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenAgenteForm={isOpenAgenteForm}
        setIsOpenAgenteForm={setIsOpenAgenteForm}
        setUsuarioSelect={setUsuarioSelect}
        usuarioSelect={usuarioSelect}
        filtro={filtro}
        setFiltro={setFiltro}
      />

      <AgenteForm
        actualizarTabla={actualizadoTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenAgenteForm={isOpenAgenteForm}
        setIsOpenAgenteForm={setIsOpenAgenteForm}
        setUsuarioSelect={setUsuarioSelect}
        usuarioSelect={usuarioSelect}
      />
    </main>
  );
};
