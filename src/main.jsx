import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UsuarioProvider } from "./Context/UsuarioContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UsuarioProvider>
      <App />
    </UsuarioProvider>
  </StrictMode>
);
