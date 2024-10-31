import { Route, Routes } from "react-router-dom";
import { Inicio } from "../pages/Inicio/Inicio";
import { Inmuebles } from "../pages/Inmuebles/Inmuebles";
import { Clientes } from "../pages/Clientes/Clientes";
import { Usuarios } from "../pages/Usuarios/Usuarios";
import { Alquiler } from "../pages/Alquiler/Alquiler";
import { Ventas } from "../pages/Ventas/Ventas";
import { Agentes } from "../pages/Agentes/Agentes";
import { Consultas } from "../pages/Consultas/Consultas";
import { Contratos } from "../pages/Contratos/Contratos";
import { FormularioIngresoInmueble } from "../pages/Inmuebles/FormularioIngresoInmueble";
import { FormAlquiler } from "../pages/Alquiler/FormAlquiler";
import { VerAlquiler } from "../pages/Alquiler/verAlquiler";

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="" element={<Inicio />} />
      <Route path="/inmuebles">
        <Route index element={<Inmuebles />} />
        <Route path="nuevo" element={<FormularioIngresoInmueble />} />
        <Route path="editar/:id" element={<FormularioIngresoInmueble />} />
      </Route>
      <Route path="/clientes/*" element={<Clientes />} />
      <Route path="/alquiler">
        <Route index element={<Alquiler />} />
        <Route path="nuevo" element={<FormAlquiler />} />
        <Route path=":id" element={<VerAlquiler />} />
      </Route>
      <Route path="/ventas/*" element={<Ventas />} />
      <Route path="/agentes/*" element={<Agentes />} />
      <Route path="/consultas/*" element={<Consultas />} />
      <Route path="/contratos/*" element={<Contratos />} />
    </Routes>
  );
};
