/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UsuarioContexto } from "../Context/UsuarioContext";
import { RoutesComponent } from "../Routes/RoutesComponent";
import "./layoutPrincipal.css";
export const LayoutPrincipal = () => {
  const location = useLocation();
  const { usuario } = useContext(UsuarioContexto);

  return (
    <div className="wrapper">
      <aside id="sidebar" className={"expand"}>
        <div className="d-flex justify-content-center px-4 py-3">
          <div className="sidebar-logo">
            <Link to={"/"} className="fw-bold text-white">
              Real State | NOA
            </Link>
          </div>
        </div>
        <hr className="text-white" />
        <ul className="sidebar-nav p-0">
          <li
            className={`sidebar-item ${
              location.pathname === "/" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/"} title="Inicio" className="sidebar-link">
              <i className="fa-solid fa-home"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname.endsWith("inmuebles") ? "bg-primary" : ""
            }`}
          >
            <Link title="Inmuebles" to={"/inmuebles"} className="sidebar-link">
              <i className="fa-solid fa-tag"></i>
              <span>Inmuebles</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname.includes("clientes") ? "bg-primary" : ""
            }`}
          >
            <Link
              title="Clientes"
              to={"/clientes"}
              className="sidebar-link has-dropdown"
            >
              <i className="fa-solid fa-users"></i>
              <span>Clientes</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              location.pathname.endsWith("consultas") ? "bg-primary" : ""
            }`}
          >
            <Link title="Consultas" to={"/consultas"} className="sidebar-link">
              <i className="fa-solid fa-archive"></i>
              <span>Consultas</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname.endsWith("contratos") ? "bg-primary" : ""
            }`}
          >
            <Link title="Contratos" to={"/contratos"} className="sidebar-link">
              <i className="fa-solid fa-shop"></i>
              <span>Contratos</span>
            </Link>
          </li>
          <hr className="text-white" />

          <li
            className={`sidebar-item ${
              location.pathname.endsWith("transacciones") ? "bg-primary" : ""
            }`}
          >
            <Link
              title="Transacciones"
              to={"/transacciones"}
              className="sidebar-link"
            >
              <i className="fa-solid fa-history"></i>
              <span>Transacciones</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname.endsWith("reportes") ? "bg-primary" : ""
            }`}
          >
            <Link title="reportes" to={"/reportes"} className="sidebar-link">
              <i className="fa-solid fa-filter"></i>
              <span>Reportes</span>
            </Link>
          </li>
          {usuario?.rol == "ADMIN" && (
            <li
              className={`sidebar-item ${
                location.pathname.endsWith("agentes") ? "bg-primary" : ""
              }`}
            >
              <Link title="Agentes" to={"/agentes"} className="sidebar-link">
                <i className="fa-solid fa-users"></i>
                <span>Agentes</span>
              </Link>
            </li>
          )}
        </ul>
        <div className="sidebar-footer">
          <a
            href="/"
            onClick={() => {
              sessionStorage.removeItem("usuario");
            }}
            className="sidebar-link link-danger"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>
      <div className="main bg-light">
        <nav className="border-bottom navbar navbar-expand px-4 py-3">
          <div className=" w-100 d-flex justify-content-between align-items-center">
            <h3 className="fw-light">
              Bienvenido <span className="fw-bold"> {usuario?.nombre}</span>
            </h3>

            <Link title="Perfil" to={"/perfil"}>
              <span>{usuario?.rol}</span>
              <i className="ps-2 fa-solid fa-user"></i>
            </Link>
          </div>
        </nav>
        <main className="container-fluid p-3">
          <RoutesComponent />
        </main>
      </div>
    </div>
  );
};
