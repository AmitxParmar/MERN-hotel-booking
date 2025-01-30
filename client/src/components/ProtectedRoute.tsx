import { useAuth } from "@/common/auth.store";
import { Navigate } from "react-router-dom";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const user = useAuth((state) => state.user);

  if (!user) return <Navigate to="/login" />;

  return <>{children}</>; // Wrap children inside a React fragment
};

export default ProtectedRoute;
