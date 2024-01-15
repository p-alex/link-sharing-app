import { Navigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { useLocation } from "react-router-dom";

const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { isAuth } = useAuth();
  return isAuth ? children : <Navigate to="/sign-in" state={{ path: location.pathname }} replace />;
};

export default ProtectedRoutes;
