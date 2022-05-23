import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./routers/AppRouter";
import { store } from "./store/store";
import { Provider } from "react-redux";
import "./sass/styles.scss";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <AppRouter />
  </Provider>
  // </React.StrictMode>
);
