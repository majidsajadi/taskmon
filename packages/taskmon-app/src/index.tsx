import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./context/App";
import App from "./components/App";

import 'tippy.js/dist/tippy.css';
import 'react-vis/dist/style.css';
import "./assets/styles/main.css";

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
