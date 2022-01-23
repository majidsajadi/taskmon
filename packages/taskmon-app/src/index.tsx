import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./components/App";

import 'tippy.js/dist/tippy.css';
import "./assets/styles/main.css";
import { AppProvider } from "./context/App";

ReactDOM.render(
  <React.StrictMode>
      <AppProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </AppProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
