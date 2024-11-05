import { useState } from "react";
import { ConsultaForm } from "./ConsultaForm";
import { ConsultaTable } from "./ConsultaTable";

export const ConsultaPage = () => {
  const [isOpenConsultaForm, setIsOpenConsultaForm] = useState(false);
  const [isOpenConsultaView, setIsOpenConsultaView] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);
  const [consultaSelect, setConsultaSelect] = useState();

  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Consultas</h3>
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

          <div className="col d-flex align-items-end">
            <button className="btn btn-outline-secondary" type="submit">
              Filtrar
            </button>
          </div>
        </form>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              setConsultaSelect(null);
              setIsOpenConsultaForm(true);
            }}
            className="btn btn-primary"
          >
            Nuevo
          </button>
        </div>
      </div>

      <ConsultaTable
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenConsultaView={isOpenConsultaView}
        setIsOpenConsultaView={setIsOpenConsultaView}
        consultaSelect={consultaSelect}
        setConsultaSelect={setConsultaSelect}
      />

      <ConsultaForm
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenConsultaForm={isOpenConsultaForm}
        setIsOpenConsultaForm={setIsOpenConsultaForm}
        consultaSelect={consultaSelect}
        setConsultaSelect={setConsultaSelect}
      />
    </main>
  );
};
