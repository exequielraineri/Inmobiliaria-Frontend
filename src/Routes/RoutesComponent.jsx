import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { UsuarioContexto } from "../Context/UsuarioContext";
import { AgentePage } from "../pages/Agentes/AgentePage";
import { ClientePage } from "../pages/Clientes/ClientePage";
import { ContratoForm } from "../pages/Contratos/ContratoForm";
import { ContratoPage } from "../pages/Contratos/ContratoPage";
import { ContratoView } from "../pages/Contratos/ContratoView";
import { Inicio } from "../pages/Inicio/Inicio";
import { InmuebleForm } from "../pages/Inmuebles/InmuebleForm";
import { InmueblePage } from "../pages/Inmuebles/InmueblePage";
import { Perfil } from "../pages/Perfil/Perfil";
import { ConsultaPage } from "../pages/Consultas/ConsultaPage";
import { ReportePage } from "../pages/Reportes/ReportePage";
import { CajaPage } from "../pages/Caja/CajaPage";
export const RoutesComponent = () => {
  const { usuario } = useContext(UsuarioContexto);
  return (
    <Routes>
      <Route path="" element={<Inicio />} />
      <Route path="/inmuebles">
        <Route index element={<InmueblePage />} />
        <Route path="nuevo" element={<InmuebleForm />} />
        <Route path="editar/:id" element={<InmuebleForm />} />
      </Route>
      <Route path="/clientes" element={<ClientePage />} />
      <Route path="/contratos">
        <Route index element={<ContratoPage />} />
        <Route path="nuevo" element={<ContratoForm />} />
        <Route path=":id" element={<ContratoView />} />
      </Route>
      <Route
        path="/agentes"
        element={usuario?.rol == "ADMIN" ? <AgentePage /> : <Navigate to="/" />}
      />
      <Route path="/consultas" element={<ConsultaPage />} />
      <Route path="/caja" element={<CajaPage />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/reportes" element={<ReportePage />} />
    </Routes>
  );
};
