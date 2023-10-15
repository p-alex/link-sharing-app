import useAuth from "./hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

const RedirectIfSignedIn = () => {
  const { authState } = useAuth();
  return authState.accessToken ? Navigate({ to: "/links" }) : <Outlet />;
};

export default RedirectIfSignedIn;
