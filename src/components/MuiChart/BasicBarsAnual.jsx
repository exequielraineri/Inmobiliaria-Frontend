import { BarChart } from "@mui/x-charts/BarChart";
import { useEffect, useState } from "react";
import { getData } from "../../service/apiService";
import { formatearPrecio } from "../../data/funciones";
import { LineChart } from "@mui/x-charts";

export default function BasicBarsAnual() {
  const [pagos, setPagos] = useState();
  const [dataMontos, setDataMontos] = useState([]);
  const fetchPagos = async () => {
    try {
      const response = await getData("pagos");
      let pagosPagados = response?.data?.filter(
        (pago) => pago?.estado == "PAGADO"
      );
      // console.log(pagosPagados);
      setPagos(pagosPagados);
    } catch (error) {
      console.error(error);
    }
  };

  const cargarDatosGrafico = () => {
    let montos = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    pagos?.forEach((pago) => {
      const fechaRegistro = new Date(pago?.fechaRegistro);
      const mes = fechaRegistro?.getMonth() + 1;
      switch (mes) {
        case 1:
          montos[0] += pago?.monto;
          break;
        case 2:
          montos[1] += pago?.monto;
          break;
        case 3:
          montos[2] += pago?.monto;
          break;
        case 4:
          montos[3] += pago?.monto;
          break;
        case 5:
          montos[4] += pago?.monto;
          break;
        case 6:
          montos[5] += pago?.monto;
          break;
        case 7:
          montos[6] += pago?.monto;
          break;
        case 8:
          montos[7] += pago?.monto;
          break;
        case 9:
          montos[8] += pago?.monto;
          break;
        case 10:
          montos[9] += pago?.monto;
          break;
        case 11:
          montos[10] += pago?.monto;
          break;
        case 12:
          montos[11] += pago?.monto;
          break;
      }
    });
    setDataMontos(montos);
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  useEffect(() => {
    cargarDatosGrafico();
  }, [pagos]);

  const dataMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  return (
    <div>
      <h5>Pagos Confimados</h5>
      <hr />
      {/* <BarChart
        xAxis={[
          {
            scaleType: "band",
            data: dataMeses,
            label: "Meses",
          },
        ]}
        series={[
          {
            label: "Monto",
            data: dataMontos,
            valueFormatter: (e) => formatearPrecio(e.toFixed(2)),
          },
        ]}
        width={1000}
        height={400}
        barLabel={(item) => {
          return formatearPrecio(item?.value);
        }}
      /> */}
      <LineChart
        xAxis={[
          {
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            label: "Meses",
            valueFormatter: (e) => dataMeses[e - 1],
          },
        ]}
        series={[
          {
            label: "Montos",
            data: dataMontos,
            valueFormatter: (e) => formatearPrecio(e),
          },
        ]}
        width={800}
        height={300}
      />
    </div>
  );
}
