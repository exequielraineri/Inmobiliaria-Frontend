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
  const [filtro, setFiltro] = useState({
    tipoCliente: null,
    provincia: null,
    estado: null,
  });
  return (
    <main>
      <div className="bloque">
        <h3 className="border-bottom pb-1 text-primary">Clientes</h3>
        <h6 className="text-secondary">Criterios de busqueda</h6>
        <div className="d-flex flex-wrap gap-3 col-12">
          <div className="col-auto">
            <label className="form-label mb-1" htmlFor="tipo">
              Tipo Cliente
            </label>
            <select
              value={filtro?.tipoCliente}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  tipoCliente: e.target.value,
                });
              }}
              defaultValue={""}
              className="form-select"
              name="tipo"
            >
              <option value="">Todos</option>
              {tipo_clientes?.map((tipo) => {
                return <option value={tipo}>{tipo}</option>;
              })}
            </select>
          </div>
          <div className="col-auto">
            <label className="form-label mb-1" htmlFor="ubicacion">
              Provincia
            </label>
            <select
              value={filtro?.provincia}
              onChange={(e) => {
                setFiltro({
                  ...filtro,
                  provincia: e.target.value,
                });
              }}
              defaultValue={""}
              className="form-select"
              name="provincia"
              id="provincia"
            >
              <option value="">Todos</option>
              {provincias.map((prov) => {
                return <option value={prov}>{prov}</option>;
              })}
            </select>
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
              defaultValue={"true"}
              className="form-select"
              name="estado"
            >
              <option value="true">Activo</option>
              <option value="false">Inactivo</option>
            </select>
          </div>
        </div>

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
        filtro={filtro}
        setFiltro={setFiltro}
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
