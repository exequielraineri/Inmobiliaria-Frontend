import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import { UsuarioContexto } from "./Context/UsuarioContext";
import { LayoutPrincipal } from "./Layout/LayoutPrincipal";
import { Login } from "./pages/Login/Login";

function App() {
  const { usuario } = useContext(UsuarioContexto);

  return (
    <BrowserRouter>
      {usuario == null ? <Login /> : <LayoutPrincipal />}
      <Toaster className="me-4" position="top-right" richColors closeButton />
    </BrowserRouter>
  );
}

export default App;
