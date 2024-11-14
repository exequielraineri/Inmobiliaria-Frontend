import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { getData } from "../../service/apiService";

export default function BasicPie() {
  const [estadisticas, setEstadisticas] = useState({
    alquiler: 0,
    venta: 0,
    otros: 0,
    impuestos: 0,
    expensas: 0,
    mantenimiento: 0,
  });

  const fetchTransacciones = async () => {
    try {
      let alquiler = 0;
      let venta = 0;
      let otros = 0;
      let impuestos = 0;
      let expensas = 0;
      let mantenimiento = 0;
      const response = await getData("/transacciones");
      console.log(response?.data);
      response?.data?.map((transaccion) => {
        switch (transaccion?.tipoOperacion) {
          case "ALQUILER":
            alquiler++;
            break;
          case "VENTA":
            venta++;
            break;
          case "MANTENIMIENTO":
            mantenimiento++;
            break;
          case "OTROS":
            otros++;
            break;
          case "EXPENSAS":
            expensas++;
            break;
          case "IMPUESTOS":
            impuestos++;
            break;
        }
      });
      setEstadisticas({
        alquiler,
        mantenimiento,
        expensas,
        venta,
        impuestos,
        otros,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchTransacciones();
  }, []);

  return (
    <div>
      <h5>Tipo de Operación</h5>
      <hr />
      <PieChart
        series={[
          {
            arcLabel: "formattedValue",
            data: [
              { id: 0, value: estadisticas?.alquiler, label: "Alquiler" },
              { id: 1, value: estadisticas?.venta, label: "Ventas" },
              { id: 2, value: estadisticas?.otros, label: "Otros" },
              {
                id: 3,
                value: estadisticas?.mantenimiento,
                label: "Mantenimiento",
              },
              { id: 4, value: estadisticas?.expensas, label: "Expensas" },
              { id: 5, value: estadisticas?.impuestos, label: "Impuestos" },
            ],
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
}
