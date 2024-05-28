import React from "react";
import ReactDOM from "react-dom/client";
import "antd/dist/reset.css";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./stores/index.js";
import AppRoutes from "./routes/index.js";
import AutoTranslate from "./utils/AutoTranslate.js";
import { LocalizationProvider } from "./context/LocalizationWrapper.js";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <LocalizationProvider>
        <BrowserRouter>
          {/* <AutoTranslate /> */}
          <AppRoutes />
        </BrowserRouter>
      </LocalizationProvider>
    </Provider>
  </React.StrictMode>
);
