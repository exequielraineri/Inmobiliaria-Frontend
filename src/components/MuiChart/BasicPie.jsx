import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";

export default function BasicPie({ contratos }) {
  const [estadisticas, setEstadisticas] = useState({
    alquiler: 0,
    venta: 0,
  });

  useEffect(() => {
    if (contratos) {
      setEstadisticas({
        alquiler: contratos?.contratosAlquiler,
        venta: contratos?.contratosVentas,
      });
    }
  }, [contratos]);

  return (
    <PieChart
      series={[
        {
          arcLabel: "formattedValue",
          data: [
            { id: 0, value: estadisticas?.alquiler, label: "Alquiler" },
            { id: 1, value: estadisticas?.venta, label: "Ventas" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
