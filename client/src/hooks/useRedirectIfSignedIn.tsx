import { useEffect } from "react";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";

const useRedirectIfSignedIn = ({ path = "/links" }: { path?: string }) => {
  const { authState } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authState.accessToken) return;
    navigate(path);
  }, []);

  return null;
};

export default useRedirectIfSignedIn;
