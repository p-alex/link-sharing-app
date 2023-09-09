import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContextProvider";

const useAuth = () => {
  const { authState } = useContext(AuthContext);
  return { isAuth: authState?.access_token !== "", authState };
};

export default useAuth;
