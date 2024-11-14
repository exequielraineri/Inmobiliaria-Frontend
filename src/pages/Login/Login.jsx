/* eslint-disable no-unused-vars */
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UsuarioContexto } from "../../Context/UsuarioContext";
import { postData } from "../../service/apiService";
import { Button, TextField } from "@mui/material";
export const Login = () => {
  const [dataForm, setDataForm] = useState({
    correo: "",
    password: "",
  });
  const { usuario, setUsuario } = useContext(UsuarioContexto);
  const [error, setError] = useState();
  const navigate = useNavigate();

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      toast.promise(postData("/autenticacion/login", dataForm), {
        loading: "Cargando...",
        success: ({ data }) => {
          setUsuario(data);
          console.log(data);
          sessionStorage.setItem("usuario", JSON.stringify(data));
          navigate(0);
          return "Bienvenido, " + data?.nombre + " " + data?.apellido;
        },
        error: (response) => {
          console.log(response);
          return "Error al iniciar sesion";
        },
      });
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
        <form onSubmit={onSubmitLogin} className="d-flex flex-column gap-2">
          <TextField
            variant="standard"
            label="Correo"
            fullWidth
            type="email"
            name="email"
            value={dataForm?.correo}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                correo: e.target.value,
              });
            }}
          />
          <TextField
            variant="standard"
            label="Contraseña"
            fullWidth
            type="password"
            name="password"
            value={dataForm?.password}
            onChange={(e) => {
              setDataForm({
                ...dataForm,
                password: e.target.value,
              });
            }}
          />
          <Button type="submit" variant="contained">
            Iniciar
          </Button>
          {/* <div>
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
          </div> */}
          <div className="d-flex justify-content-end mt-3 d-none">
            <button className="btn btn-primary">Iniciar Sesión</button>
          </div>
        </form>
        <hr />
        {error && <p className="text-danger">Credenciales Incorrectas</p>}
      </div>
    </div>
  );
};
