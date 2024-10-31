import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import { LayoutPrincipal } from "./Layout/LayoutPrincipal";
import { UsuarioContexto, UsuarioProvider } from "./Context/UsuarioContext";
import { Login } from "./pages/Login/Login";
import { useContext } from "react";
import { Toaster } from "sonner";

function App() {
  const { usuario } = useContext(UsuarioContexto);

  return (
    <BrowserRouter>
      {usuario == null ? <Login /> : <LayoutPrincipal />}
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
