import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";

export default function BasicBars({ inmuebles }) {
  const [propiedades, setPropiedades] = useState({
    casas: 0,
    departamento: 0,
    campos: 0,
    oficinas: 0,
  });

  const cargarDatos = () => {
    setPropiedades({
      ...propiedades,
      campos: inmuebles?.campo,
      casas: inmuebles?.casas,
      departamento: inmuebles?.departamentos,
      oficinas: inmuebles?.oficinas,
    });
  };

  useEffect(() => {
    if (inmuebles) {
      cargarDatos();
    }
  }, [inmuebles]);
  return (
    <div className="w-100">
      <h5>Inmuebles por tipo</h5>
      <hr />
      <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: ["CASAS", "DEPARTAMENTOS", "CAMPOS", "OFICINAS"],
            label: "Tipos de inmuebles",
          },
        ]}
        series={[
          {
            label: "Propiedades",
            data: [
              propiedades?.casas,
              propiedades?.departamento,
              propiedades?.campos,
              propiedades?.oficinas,
            ],
          },
        ]}
        // width={500}
        sx={{
          width: "100%",
          minWidth: "300px",
        }}
        height={300}
        barLabel={"value"}
      />
    </div>
  );
}
