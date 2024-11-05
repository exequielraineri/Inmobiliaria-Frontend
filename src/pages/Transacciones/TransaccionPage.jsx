import { useState } from "react";
import { TransaccionTable } from "./TransaccionTable";
import { TransaccionForm } from "./TransaccionForm";

export const TransaccionPage = () => {
  const [isOpenTransaccionForm, setIsOpenTransaccionForm] = useState(false);
  const [actualizarTabla, setActualizarTabla] = useState(false);
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Transacciones</h3>
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
            className="btn btn-primary"
            onClick={() => {
              setIsOpenTransaccionForm(true);
            }}
          >
            Nuevo
          </button>
        </div>
      </div>

      <TransaccionForm
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        isOpenTransaccionForm={isOpenTransaccionForm}
        setIsOpenTransaccionForm={setIsOpenTransaccionForm}
      />

      <TransaccionTable
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
      />
    </main>
  );
};
