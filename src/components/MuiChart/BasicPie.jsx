import { PieChart } from "@mui/x-charts/PieChart";

export default function BasicPie() {
  return (
    <PieChart
      series={[
        {
          arcLabel: "formattedValue",
          data: [
            { id: 0, value: 130, label: "Alquiler" },
            { id: 1, value: 200, label: "Ventas" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
