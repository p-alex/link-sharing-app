import { useContext } from "react";
import { AuthContext } from "../authContext/AuthContextProvider";

const useAuth = () => {
  const { authState, dispatchAuth } = useContext(AuthContext);
  return { isAuth: authState?.accessToken !== "", authState, dispatchAuth };
};

export default useAuth;
