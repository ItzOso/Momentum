import React from "react";
import Navbar from "./components/layout/Navbar";
import SigninPage from "./pages/SigninPage";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import { Toaster } from "react-hot-toast";
import ProjectDetailsPage from "./pages/ProjectDetailsPage";

function App() {
  const location = useLocation();
  const hideNavbar = location.pathname.includes("/project");
  return (
    <div className="h-screen w-screen ">
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/project/:id"
          element={
            <PrivateRoute>
              <ProjectDetailsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <SigninPage />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <SignupPage />
            </PublicRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
