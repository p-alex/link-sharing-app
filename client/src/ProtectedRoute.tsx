import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/sign-in" replace />;
};

export default ProtectedRoutes;
