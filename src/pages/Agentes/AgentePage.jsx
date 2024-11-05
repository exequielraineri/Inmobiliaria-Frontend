/* eslint-disable react/jsx-key */
import { useState } from "react";
import { provincias } from "../../data/data";
import { AgenteTable } from "./AgenteTable";
import { AgenteForm } from "./AgenteForm";

export const AgentePage = () => {
  const [isOpenAgenteForm, setIsOpenAgenteForm] = useState(false);
  const [actualizadoTabla, setActualizarTabla] = useState(false);
  const [usuarioSelect, setUsuarioSelect] = useState();
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Agentes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" method="get" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Provincia
            </label>
            <select className="form-select" name="provincia" id="provincia">
              <option value="Todos">Todos</option>
              {provincias.map((prov) => {
                return <option value={prov}>{prov}</option>;
              })}
            </select>
          </div>
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="estado">
              Estado
            </label>
            <select className="form-select" id="estado" name="estado">
              <option value="Todos">Todos</option>
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>

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
