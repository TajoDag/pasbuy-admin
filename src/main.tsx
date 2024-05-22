import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./stores/index.js";
import AppRoutes from "./routes/index.js";
import AutoTranslate from "./utils/AutoTranslate.js";
import CrispWidget from "./utils/CrispWidget.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <AutoTranslate /> */}
        <AppRoutes />
        <CrispWidget />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
