import React, { useContext, useEffect, useState } from "react";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData } from "../../service/apiService";
import { Login } from "../Login/Login";
import BasicBars from "../../components/MuiChart/BasicBars";
import BasicPie from "../../components/MuiChart/BasicPie";

export const Inicio = () => {
  const { usuario } = useContext(UsuarioContexto);
  const [inmuebles, setInmuebles] = useState([]);

  const [paneles, setPaneles] = useState([]);

  const fetchInmuebles = async () => {
    try {
      const response = await getData("/inmuebles");
      setInmuebles(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchInmuebles();
  }, []);

  useEffect(() => {
    if (usuario) {
      setPaneles([
        {
          titulo: "Contratos",
          valor: usuario?.contratos?.length,
        },
        {
          titulo: "Inmuebles",
          valor: inmuebles?.length,
        },
        {
          titulo: "Alquilados",
          valor: 0,
        },
        {
          titulo: "Vendidos",
          valor: 0,
        },
        {
          titulo: "Clientes",
          valor: 0,
        },
        {
          titulo: "Ingreso",
          valor: 0,
        },
        {
          titulo: "Egreso",
          valor: 0,
        },
      ]);
    }
  }, [usuario, inmuebles]);

  return (
    <div>
      <h3 className="border-start ps-2 border-primary text-primary">
        Panel Principal
      </h3>
      <section className="d-flex flex-row gap-4 overflow-x-scroll py-3">
        {paneles?.map((panel) => {
          return <Panel titulo={panel?.titulo} valor={panel?.valor} />;
        })}
      </section>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <BasicBars />
        <BasicPie />
      </div>
    </div>
  );
};

export const Panel = ({ titulo, valor }) => {
  return (
    <div
      className="w-100 shadow-sm p-3 rounded-3 bg-info-subtle"
      style={{
        minWidth: "200px",
        // maxWidth: "200px",
      }}
    >
      <span className="fw-bold fs-3">{valor}</span>
      <br />
      <span className="fw-ligth">{titulo}</span>
    </div>
  );
};
