import { useState } from "react";

export const ConsultaTable = ({
  isOpenConsultaForm,
  setIsOpenConsultaForm,
  actualizarTabla,
  setActualizarTabla,
  consultaSelect,
  setConsultaSelect,
}) => {
  const [consultas, setConsultas] = useState([]);
  return (
    <div className="bloque mt-4">
      <h3>Listado </h3>
      <p className="pb-0 mb-0 fw-ligth">Encontrados {consultas?.length}</p>
      <div className="table-responsive">
        <table className="table table-dense table-sm table-striped table-hover">
          <thead>
            <tr>
              <th className="col-1">#</th>
              <th className="col">Cliente</th>
              <th className="col">Inmueble</th>
              <th className="col">Operación</th>
              <th className="col">Estado</th>
              <th className="col">Fecha Consulta</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody>
            {consultas?.map((consulta, index) => {
              return (
                <tr key={consulta?.id}>
                  <td>{++index}</td>
                  <td>{consulta?.cliente?.nombre || "-"}</td>
                  <td>{consulta?.inmueble?.titulo || "-"}</td>
                  <td>ALQUILER</td>
                  <td>PEDIENTE</td>
                  <td>
                    {new Date(consulta?.fechaRegistro).toLocaleDateString(
                      undefined,
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>
                  <td>
                    <div className="d-flex gap-1">
                      <button
                        onClick={() => {
                          setConsultaSelect(consulta);
                          setIsOpenConsultaForm(true);
                        }}
                        className="btn btn-outline-primary btn-sm"
                      >
                        <i className="fa-solid fa-search"></i>
                      </button>
                      <button className="btn btn-outline-danger btn-sm">
                        <i className="fa-solid fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
