import { type ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@contexts/UserContext";

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, token } = useUser();
  const location = useLocation();

  // Check: Nếu chưa login thì redirect về login, lưu lại path để sau login redirect lại
  if (!user || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}
