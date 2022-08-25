import React from "react";
import { Navigate } from "react-router";
import { useGlobalContext } from "../hooks/useGlobalContext";
function ProtectedRoutes({ children }) {
  const { user, token } = useGlobalContext();
  if (!user || !token) {
    // if when trying to ge home the state does not have user or token, we move to landing
    return <Navigate to="/landing" />;
  } else {
    return children;
  }
}

export default ProtectedRoutes;
