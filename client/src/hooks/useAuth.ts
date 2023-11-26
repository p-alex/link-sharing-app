import { useSelector } from "react-redux";
import { RootState } from "../redux/app/store";

const useAuth = () => {
  const authState = useSelector((state: RootState) => state.auth);
  return { isAuth: authState.accessToken !== "", authState };
};

export default useAuth;
