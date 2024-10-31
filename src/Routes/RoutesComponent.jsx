import { Route, Routes } from "react-router-dom";
import { Inicio } from "../pages/Inicio/Inicio";
import { Inmuebles } from "../pages/Inmuebles/Inmuebles";
import { Clientes } from "../pages/Clientes/Clientes";
import { Agentes } from "../pages/Agentes/Agentes";
import { Consultas } from "../pages/Consultas/Consultas";
import { Contratos } from "../pages/Contratos/Contratos";
import { FormularioIngresoInmueble } from "../pages/Inmuebles/FormularioIngresoInmueble";
import { VerContrato } from "../pages/Contratos/VerContrato";
import { FormContrato } from "../pages/Contratos/FormContrato";
import { Transacciones } from "../pages/Transacciones/Transacciones";

export const RoutesComponent = () => {
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
      <Route path="/agentes" element={<Agentes />} />
      <Route path="/consultas" element={<Consultas />} />
      <Route path="/contratos" element={<Contratos />} />
      <Route path="/transacciones" element={<Transacciones />} />
    </Routes>
  );
};
