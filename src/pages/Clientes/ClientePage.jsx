/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { useState } from "react";
import { provincias, tipo_clientes } from "../../data/data";
import { ClienteForm } from "./ClienteForm";
import { ClienteTable } from "./ClienteTable";

export const ClientePage = () => {
  const [isOpenClienteForm, setIsOpenClienteForm] = useState(false);
  const [clienteSelect, setClienteSelect] = useState(null);
  const [actualizarTabla, setActualizarTabla] = useState(false);
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Clientes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <form action="/" className="d-flex flex-wrap gap-3 col-12">
          <div className="col-12 col-md col-sm-4">
            <label className="form-label mb-1" htmlFor="tipo">
              Tipo Cliente
            </label>
            <select className="form-select" name="tipo">
              <option value="Todos">Todos</option>
              {tipo_clientes?.map((tipo) => {
                return <option value={tipo}>{tipo}</option>;
              })}
            </select>
          </div>
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
            <select className="form-select" name="estado">
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
              setClienteSelect(null);
              setIsOpenClienteForm(true);
            }}
            className="btn btn-primary"
            type="button"
          >
            Nuevo
          </button>
        </div>
      </div>

      <ClienteTable
        clienteSelect={clienteSelect}
        setClienteSelect={setClienteSelect}
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        setIsOpenClienteForm={setIsOpenClienteForm}
      />
      <ClienteForm
        actualizarTabla={actualizarTabla}
        setActualizarTabla={setActualizarTabla}
        clienteSelect={clienteSelect}
        setClienteSelect={setClienteSelect}
        isOpenClienteForm={isOpenClienteForm}
        setIsOpenClienteForm={setIsOpenClienteForm}
      />
    </main>
  );
};
