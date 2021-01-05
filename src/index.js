import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import Calculator from "./components/Calculator";
import "./index.css";

ReactDOM.render(
  <StrictMode>
    <Calculator />
  </StrictMode>,
  document.getElementById("root")
);
