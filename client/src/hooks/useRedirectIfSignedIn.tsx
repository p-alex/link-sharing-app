import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from "react-router-dom";

const useRedirectIfSignedIn = ({
  defaultRedirectPath = "/links",
}: {
  defaultRedirectPath?: string;
}) => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || defaultRedirectPath;

  useEffect(() => {
    if (!authState.accessToken) return;
    navigate({ pathname: redirectPath });
  }, []);

  return null;
};

export default useRedirectIfSignedIn;
