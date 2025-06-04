import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider";
import React from "react";

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
