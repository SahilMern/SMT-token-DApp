import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import Wallet from "./context/Wallet.jsx";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
    <Wallet>

      <App />
    </Wallet>
    </BrowserRouter>
);
