import { useContext, useEffect, useState } from "react";
import BasicBars from "../../components/MuiChart/BasicBars";
import BasicPie from "../../components/MuiChart/BasicPie";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";

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
      },
      {
        titulo: "Contratos",
        valor: estadisticas?.contratos?.cantidadContratos,
      },
      {
        titulo: "Inmuebles",
        valor: estadisticas?.inmuebles?.cantidadInmueble,
      },
      {
        titulo: "Inquilinos",
        valor: estadisticas?.clientes?.cantidadInquilinos,
      },
      {
        titulo: "Ingresos",
        valor: formatearPrecio(estadisticas?.transacciones.ingresos),
      },
      {
        titulo: "Egresos",
        valor: formatearPrecio(estadisticas?.transacciones.egresos),
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
      <section className="d-flex  gap-4 overflow-x-scroll py-3">
        {paneles?.map((panel) => {
          return (
            <Panel
              key={panel?.titulo}
              titulo={panel?.titulo}
              valor={panel?.valor}
            />
          );
        })}
      </section>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <BasicBars inmuebles={estadisticas?.inmuebles} />
        <BasicPie contratos={estadisticas?.contratos} />
      </div>
    </div>
  );
};

export const Panel = ({ titulo, valor }) => {
  return (
    <div className="col-4 shadow-sm p-3 rounded-3 bg-info-subtle">
      <span className="fw-bold fs-3">{valor}</span>
      <br />
      <span className="fw-ligth">{titulo}</span>
    </div>
  );
};
