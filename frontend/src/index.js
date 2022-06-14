import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div className="mockup-phone border-primary">
    <div className="camera"></div>
    <div className="display">
      <div className="artboard artboard-demo phone-2">
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </div>
    </div>
  </div>
);
