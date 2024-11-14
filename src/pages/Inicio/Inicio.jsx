import { useContext, useEffect, useState } from "react";
import BasicBars from "../../components/MuiChart/BasicBars";
import BasicPie from "../../components/MuiChart/BasicPie";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";
import BasicBarsAnual from "../../components/MuiChart/BasicBarsAnual";

export const Inicio = () => {
  const { usuario } = useContext(UsuarioContexto);
  const [paneles, setPaneles] = useState([]);
  const [estadisticas, setEstadisticas] = useState();
  const fetchEstadisticas = async () => {
    try {
      const response = await getData("reportes");
      console.log(response);
      setEstadisticas(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEstadisticas();
  }, []);

  const cargarPaneles = () => {
    setPaneles([
      {
        titulo: "Diferencia en caja",
        valor: formatearPrecio(
          estadisticas?.transacciones?.ingresos -
            estadisticas?.transacciones?.egresos
        ),
        monto:
          estadisticas?.transacciones?.ingresos -
          estadisticas?.transacciones?.egresos,
      },
      {
        titulo: "Ingresos",
        valor: formatearPrecio(estadisticas?.transacciones.ingresos),
      },
      {
        titulo: "Egresos",
        valor: formatearPrecio(estadisticas?.transacciones.egresos),
      },
      {
        titulo: "Contratos",
        valor: estadisticas?.contratos?.cantidadContratos,
      },
      {
        titulo: "Inmuebles",
        valor: estadisticas?.inmuebles?.cantidadInmueble,
      },
    ]);
  };

  useEffect(() => {
    cargarPaneles();
  }, [estadisticas]);

  return (
    <div>
      <h3 className="border-start ps-2 border-primary text-primary">
        Panel Principal
      </h3>
      <section className="d-flex gap-4 overflow-x-scroll py-3">
        {paneles?.map((panel) => {
          return (
            <Panel
              key={panel?.titulo}
              titulo={panel?.titulo}
              valor={panel?.valor}
              monto={panel?.monto}
            />
          );
        })}
      </section>
      <hr />
      <div className="d-flex flex-wrap justify-content-between gap-3">
        <div className="bloque p-3 col d-flex justify-content-center align-items-center">
          <BasicBars inmuebles={estadisticas?.inmuebles} />
        </div>
        <div className="bloque p-3 col d-flex justify-content-center align-items-center">
          <BasicPie contratos={estadisticas?.contratos} />
        </div>
        <div className="bloque p-3 col-12 d-flex justify-content-center align-items-center">
          <BasicBarsAnual inmuebles={estadisticas?.inmuebles} />
        </div>
      </div>
    </div>
  );
};

export const Panel = ({ titulo, valor, monto }) => {
  return (
    <div className="col-3 shadow-sm p-3 rounded-3 border-start border-primary text-primary border-3 bg-white">
      <span className={monto < 0 ? "fw-bold fs-3 text-danger" : "fw-bold fs-3"}>
        {valor}
      </span>
      <br />
      <span className="fw-ligth">{titulo}</span>
    </div>
  );
};
