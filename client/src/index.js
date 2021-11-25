import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

ReactDOM.render(
  <div className="App">
    <Routes />
  </div>,
  document.getElementById("root")
);
