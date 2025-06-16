import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProjectsProvider } from "./contexts/ProjectsProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProjectsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ProjectsProvider>
    </AuthProvider>
  </StrictMode>
);
