import "./index.css";
import React from "react";
import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux_store/store";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    {/*passing access to the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);


