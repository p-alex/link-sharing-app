import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContextProvider";

const useAuth = () => {
  const { authState } = useContext(AuthContext);
  return { isAuth: authState?.accessToken !== "", authState };
};

export default useAuth;
