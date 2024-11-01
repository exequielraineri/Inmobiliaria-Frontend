import { BarChart } from "@mui/x-charts/BarChart";

export default function BasicBars() {
  return (
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
          data: [4, 1, 2, 3],
          backgroundColor: ["#4caf50", "#2196f3", "#ff5722", "#ffc107"], // Colores para cada barra
        },
      ]}
      width={500}
      height={300}
    />
  );
}
