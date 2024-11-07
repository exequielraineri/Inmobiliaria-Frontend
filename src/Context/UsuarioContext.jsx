/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";
import { Await } from "react-router-dom";
import { getData } from "../service/apiService";

export const UsuarioContexto = createContext();

export const UsuarioProvider = ({ children }) => {
  const [usuario, setUsuario] = useState();

  const obtenerUsuarioSession = () => {
    let usuarioSession = JSON.parse(sessionStorage.getItem("usuario"));
    setUsuario(usuarioSession);
  };

  useEffect(() => {
    obtenerUsuarioSession();
  }, []);

  const actualizarUsuario = async () => {
    try {
      console.log("desde contexto");
      const response = await getData("usuarios/" + usuario?.id);
      console.log(response.data);
      setUsuario(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UsuarioContexto.Provider
      value={{ usuario, setUsuario, actualizarUsuario }}
    >
      {children}
    </UsuarioContexto.Provider>
  );
};
