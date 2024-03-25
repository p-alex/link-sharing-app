import { useAuthSlice } from "../redux/features/auth/authSlice";

const useAuth = () => {
  const authState = useAuthSlice();
  return { isAuth: authState.accessToken !== "", authState };
};

export default useAuth;
