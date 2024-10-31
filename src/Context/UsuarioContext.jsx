/* eslint-disable react/prop-types */
import { useState, createContext, useEffect } from "react";

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

  return (
    <UsuarioContexto.Provider value={{ usuario, setUsuario }}>
      {children}
    </UsuarioContexto.Provider>
  );
};
