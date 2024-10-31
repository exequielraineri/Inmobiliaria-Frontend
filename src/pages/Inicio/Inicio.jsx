import React, { useContext, useEffect, useState } from "react";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { getData } from "../../service/apiService";
import { Login } from "../Login/Login";

export const Inicio = () => {
  const { usuario } = useContext(UsuarioContexto);
  const [inmuebles, setInmuebles] = useState([]);

  const [paneles, setPaneles] = useState([
    {
      titulo: "Contratos",
      valor: 0,
    },
    {
      titulo: "Inmuebles",
      valor: 0,
    },
    {
      titulo: "Transacciones",
      valor: 0,
    },
    {
      titulo: "Alquileres",
      valor: 0,
    },
  ]);

  const cargarInmuebles = async () => {
    const response = await getData("/inmuebles");
    console.log(response);

    setInmuebles(response.data);
  };

  useEffect(() => {
    cargarInmuebles();
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
          titulo: "Transacciones",
          valor: usuario?.transacciones?.length,
        },
        {
          titulo: "Consultas",
          valor: usuario?.consultas?.length,
        },
      ]);
    }
  }, [usuario, inmuebles]);

  return (
    <div>
      <h3 className="border-start ps-2 border-primary text-primary">
        Panel Principal
      </h3>
      <section className="mx-5 d-flex flex-row gap-4 justify-content-between overflow-y-hidden overflow-x-scroll py-3">
        {paneles?.map((panel) => {
          return <Panel titulo={panel?.titulo} valor={panel?.valor} />;
        })}
      </section>
      <hr />
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
