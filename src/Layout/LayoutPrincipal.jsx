import { useState } from "react";
import "./layoutPrincipal.css";
import { Link } from "react-router-dom";
import { RoutesComponent } from "../Routes/RoutesComponent";
export const LayoutPrincipal = () => {
  const [isOpen, setIsOpen] = useState(false);

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
            <Link to={"/"} className="sidebar-link">
              <i className="fa-solid fa-home"></i>
              <span>Inicio</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname === "/inmuebles" ? "bg-primary" : ""
            }`}
          >
            <a
              className="sidebar-link has-dropdown"
              data-bs-toggle="collapse"
              href="#menuInmueble"
              role="button"
              aria-expanded="false"
              aria-controls="menuInmueble"
            >
              <i className="fa-solid fa-tag"></i>
              <span>Inmuebles</span>
            </a>
            <div className="collapse sidebar-dropdown" id="menuInmueble">
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
            </div>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname === "/inmuebles" ? "bg-primary" : ""
            }`}
          >
            <a
              className="sidebar-link has-dropdown"
              data-bs-toggle="collapse"
              href="#menuClientes"
              role="button"
              aria-expanded="false"
              aria-controls="menuClientes"
            >
              <i className="fa-solid fa-users"></i>
              <span>Clientes</span>
            </a>
            <div className="collapse sidebar-dropdown" id="menuClientes">
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
            </div>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname === "/ventas" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/ventas"} className="sidebar-link">
              <i className="fa-solid fa-credit-card"></i>
              <span>Ventas</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname === "/alquiler" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/alquiler"} className="sidebar-link ">
              <i className="fa-solid fa-box"></i>
              <span>Alquiler</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              location.pathname === "/consultas" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/consultas"} className="sidebar-link">
              <i className="fa-solid fa-archive"></i>
              <span>Consultas</span>
            </Link>
          </li>

          <hr className="text-white" />

          <li
            className={`sidebar-item ${
              location.pathname === "/agentes" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/agentes"} className="sidebar-link">
              <i className="fa-solid fa-users"></i>
              <span>Agentes</span>
            </Link>
          </li>
          <li
            className={`sidebar-item ${
              location.pathname === "/contratos" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/contratos"} className="sidebar-link">
              <i className="fa-solid fa-shop"></i>
              <span>Contratos</span>
            </Link>
          </li>

          <li
            className={`sidebar-item ${
              location.pathname === "/usuarios" ? "bg-primary" : ""
            }`}
          >
            <Link to={"/usuarios"} className="sidebar-link">
              <i className="fa-solid fa-user"></i>
              <span>Usuarios</span>
            </Link>
          </li>
        </ul>
        <div className="sidebar-footer">
          <a href="/" className="sidebar-link link-danger">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Cerrar Sesión</span>
          </a>
        </div>
      </aside>
      <div className="main bg-ligth">
        <nav className=" border-bottom navbar navbar-expand px-4 py-3">
          <div className=" w-100 d-flex justify-content-between align-items-center">
            <h3>
              <span className="fw-light"> Bienvenido</span>
            </h3>

            <Link to={"/perfil"}>
              <img
                src="logo.png"
                alt="Perfil"
                className="rounded-circle"
                width={40}
                style={{
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>
        </nav>
        <main className="content px-3 py-4">
          <RoutesComponent />
        </main>
      </div>
    </div>
  );
};
