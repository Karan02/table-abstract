import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import data from "./data";
import columns from "./columns";

// 1) This is abstract table component you just need to pass
//data and column titles. Check out data.js and column.js for better understanding
// 2) Filter functionality is in developing stage
// 3) Install create react app according to here:https://ant.design/docs/react/use-with-create-react-app
// 4) if you have doubt about how to use it then email me at : krnptl1234@gmail,com

ReactDOM.render(
  <App data={data} columns={columns} />,
  document.getElementById("root")
);
