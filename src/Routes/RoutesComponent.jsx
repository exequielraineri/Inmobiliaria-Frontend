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

export const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="" element={<Inicio />} />
      <Route path="/inmuebles">
        <Route index element={<Inmuebles />} />
        <Route path="nuevo" element={<FormularioIngresoInmueble />} />
        <Route path="editar/*" element={<FormularioIngresoInmueble />} />
      </Route>
      <Route path="/clientes/*" element={<Clientes />} />
      <Route path="/usuarios/*" element={<Usuarios />} />
      <Route path="/alquiler/*" element={<Alquiler />} />
      <Route path="/ventas/*" element={<Ventas />} />
      <Route path="/agentes/*" element={<Agentes />} />
      <Route path="/consultas/*" element={<Consultas />} />
      <Route path="/contratos/*" element={<Contratos />} />
    </Routes>
  );
};
