import React from "react";
import ReactDOM from "react-dom/client";  // Ensure this is correct
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";  // Ensure this file exists

const rootElement = document.getElementById("root");
if (!rootElement) {
  console.error('Root element with id="root" not found.');
} else {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
}
