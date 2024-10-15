import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { LayoutPrincipal } from "./Layout/LayoutPrincipal";

function App() {
  return (
    <>
      <BrowserRouter>
        <LayoutPrincipal />
      </BrowserRouter>
    </>
  );
}

export default App;
