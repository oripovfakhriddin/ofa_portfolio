import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import StoreProvider from "./redux/store/index.jsx";

import "antd/dist/reset.css"
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
