import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import Routing from "./Routes.jsx";
import TripProvider from "./contexts/TripContext.jsx";

createRoot(document.getElementById("app-container")).render(
  <TripProvider>
    <Routing />
  </TripProvider>
);
