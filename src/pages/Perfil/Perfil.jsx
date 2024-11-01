import { useContext } from "react";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { formatearPrecio } from "../../data/funciones";

export const Perfil = () => {
  const { usuario } = useContext(UsuarioContexto);
  return (
    <div>
      <h3>Perfil</h3>
      <hr />
      <div className="d-flex gap-3 justify-content-between">
        <div className="bloque col">
          <h6>Datos principales</h6>
          <hr />
          <p>
            Nombre y apellido:{" "}
            <strong>{usuario?.nombre + " " + usuario?.apellido}</strong>
            <br />
            Telefono: <strong>{usuario?.telefono || "-"}</strong>
            <br />
            DNI: <strong>{usuario?.dni || "-"}</strong>
            <br />
            Correo: <strong>{usuario?.correo || "-"}</strong>
            <br />
            Contraseña: <strong>{usuario?.password || "-"}</strong>
            <br />
            Rol: <strong>{usuario?.rol || "-"}</strong>
            <br />
            Provincia: <strong>{usuario?.provincia || "-"}</strong>
            <br />
            Fecha Registro:{" "}
            <strong>
              {new Date(usuario?.fechaRegistro).toLocaleDateString()}
            </strong>
          </p>
        </div>

        {usuario?.rol != "ADMIN" && (
          <div className="bloque col">
            <h6>Datos operativos</h6>
            <hr />
            <p>
              Comision Venta:{" "}
              <strong>{Number(usuario?.comisionVenta || 0).toFixed(1)}%</strong>
              <br />
              Comision Alquiler:{" "}
              <strong>{Number(usuario?.comisionAlquiler).toFixed(1)}%</strong>
              <br />
              Total:{" "}
              <strong>{formatearPrecio(usuario?.totalGanancias || 0)}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
