import { ReactNode } from "react";
import { useAuth } from "../providers/AuthProvider.jsx";
import { Navigate } from "react-router-dom";

export default function AuthRoute({ children }) {
  const auth = useAuth();
  if (auth.user) {
    return <Navigate to="/" replace />;
  }
  return children;
}
