/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { postData } from "../../service/apiService";
import { toast } from "sonner";
export const Login = () => {
  const [dataForm, setDataForm] = useState({
    correo: "",
    password: "",
  });
  const { usuario, setUsuario } = useContext(UsuarioContexto);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      toast.promise(postData("/autenticacion/login", dataForm), {
        loading: "Cargando...",
        success: ({ data }) => {
          setUsuario(data);
          sessionStorage.setItem("usuario", JSON.stringify(data));
          return "Bienvenido, " + data?.nombre + " " + data?.apellido;
        },
        error: (response) => {
          console.log(response);
          return "Error al iniciar sesion";
        },
      });
      // const response = await postData("/autenticacion/login", dataForm);
      // setUsuario(response?.data);
    } catch (error) {
      console.log(error);
      if (error?.status == 404) {
        setError("Credenciales Incorrectas");
      } else {
        setError();
      }
    }
  };

  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
      }}
    >
      <div
        className="w-100 p-4 rounded shadow"
        style={{
          maxWidth: "400px",
        }}
      >
        <h3 className="border-bottom">Inicio de Sesión</h3>
        <form onSubmit={onSubmitLogin}>
          <div>
            <label className="form-label mb-1" htmlFor="correo">
              Correo
            </label>
            <input
              value={dataForm?.correo}
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  correo: e.target.value,
                });
              }}
              className="form-control"
              placeholder="Ingrese su correo electronico"
              type="email"
              name=""
              id="correo"
            />
          </div>
          <div className="mt-2">
            <label className="form-label mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              value={dataForm?.password}
              onChange={(e) => {
                setDataForm({
                  ...dataForm,
                  password: e.target.value,
                });
              }}
              className="form-control"
              type="password"
              id="password"
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </div>
        </form>
        <hr />
        {error && <p className="text-danger">Credenciales Incorrectas</p>}
      </div>
    </div>
  );
};
