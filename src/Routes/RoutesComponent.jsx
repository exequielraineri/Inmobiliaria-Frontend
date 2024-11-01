import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsuarioContexto } from "../Context/UsuarioContext";
import { Agentes } from "../pages/Agentes/Agentes";
import { Clientes } from "../pages/Clientes/Clientes";
import { Consultas } from "../pages/Consultas/Consultas";
import { Contratos } from "../pages/Contratos/Contratos";
import { FormContrato } from "../pages/Contratos/FormContrato";
import { VerContrato } from "../pages/Contratos/VerContrato";
import { Inicio } from "../pages/Inicio/Inicio";
import { FormularioIngresoInmueble } from "../pages/Inmuebles/FormularioIngresoInmueble";
import { Inmuebles } from "../pages/Inmuebles/Inmuebles";
import { Perfil } from "../pages/Perfil/Perfil";
import { Transacciones } from "../pages/Transacciones/Transacciones";
import { toast } from "sonner";

export const RoutesComponent = () => {
  const { usuario } = useContext(UsuarioContexto);
  return (
    <Routes>
      <Route path="" element={<Inicio />} />
      <Route path="/inmuebles">
        <Route index element={<Inmuebles />} />
        <Route path="nuevo" element={<FormularioIngresoInmueble />} />
        <Route path="editar/:id" element={<FormularioIngresoInmueble />} />
      </Route>
      <Route path="/clientes" element={<Clientes />} />
      <Route path="/contratos">
        <Route index element={<Contratos />} />
        <Route path="nuevo" element={<FormContrato />} />
        <Route path=":id" element={<VerContrato />} />
      </Route>
      <Route
        path="/agentes"
        element={usuario?.rol == "ADMIN" ? <Agentes /> : <Navigate to="/" />}
      />
      {/* <Route path="/consultas" element={<Consultas />} /> */}
      <Route path="/contratos" element={<Contratos />} />
      <Route path="/transacciones" element={<Transacciones />} />
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
};
