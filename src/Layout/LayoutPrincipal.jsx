/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import "./layoutPrincipal.css";
import { Link, useLocation } from "react-router-dom";
import { RoutesComponent } from "../Routes/RoutesComponent";
import { UsuarioContexto } from "../Context/UsuarioContext";
export const LayoutPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { usuario } = useContext(UsuarioContexto);
  const [alerta, setAlerta] = useState({ mensaje: "", tipo: "" });

  return (
    <div className="wrapper">
      <aside id="sidebar" className={isOpen && "expand"}>
        <div className="d-flex">
          <button
            className="toggle-btn"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
          >
            <i className="fa-solid fa-bars text-white"></i>
          </button>
          <div className="sidebar-logo">
            <Link to={"/"} className="fw-bold text-white">
              Real State | NOA
            </Link>
          </div>
        </div>
        <hr className="text-white" />
        <ul className="sidebar-nav">
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
            <Link
              title="Inmuebles"
              to={"/inmuebles"}
              className="sidebar-link"
              // " has-dropdown"
              // data-bs-toggle="collapse"
              // href="#menuInmueble"
              // role="button"
              // aria-expanded="false"
              // aria-controls="menuInmueble"
            >
              <i className="fa-solid fa-tag"></i>
              <span>Inmuebles</span>
            </Link>
            {/* <div className="collapse sidebar-dropdown" id="menuInmueble">
              <ul className="nav flex-column ms-4">
                <li className="">
                  <Link to={"/inmuebles"} className="sidebar-link" href="#">
                    Publicados
                  </Link>
                </li>
                <li className="">
                  <Link to={"/inmuebles"} className="sidebar-link" href="#">
                    Pendientes
                  </Link>
                </li>
              </ul>
            </div> */}
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
              // data-bs-toggle="collapse"
              // href="#menuClientes"
              // role="button"
              // aria-expanded="false"
              // aria-controls="menuClientes"
            >
              <i className="fa-solid fa-users"></i>
              <span>Clientes</span>
            </Link>
            {/* <div className="collapse sidebar-dropdown" id="menuClientes">
              <ul className="nav flex-column ms-4">
                <li className="">
                  <Link
                    to={"/clientes/inquilinos"}
                    className="sidebar-link"
                    href="#"
                  >
                    Inquilinos
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/clientes/compradores"}
                    className="sidebar-link"
                    href="#"
                  >
                    Compradores
                  </Link>
                </li>
                <li className="">
                  <Link
                    to={"/clientes/propietarios"}
                    className="sidebar-link"
                    href="#"
                  >
                    Propietarios
                  </Link>
                </li>
              </ul>
            </div> */}
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
              location.pathname.endsWith("agentes") ? "bg-primary" : ""
            }`}
          >
            <Link title="Agentes" to={"/agentes"} className="sidebar-link">
              <i className="fa-solid fa-users"></i>
              <span>Agentes</span>
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
      <div className="main bg-ligth">
        <nav className=" border-bottom navbar navbar-expand px-4 py-3">
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
