import type { JSX } from "react";
import { Navigate } from "react-router-dom";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const isLogin = Boolean(localStorage.getItem("token"));
  if (!isLogin) return <Navigate to="/login" replace />;
  return children;
}
