import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";

import myStyled from "src/myStyled";

import TestMyStyled from "./TestMyStyled";

const Main = myStyled("section")`
  margin: 20px;
`;

const app = (
  <Main>
    <header>
      <h1>
        Simple Styled Components Implementation
      </h1>
    </header>
    <TestMyStyled />
  </Main>
);

ReactDOM.render(
  app,
  document.getElementById("app"),
);
