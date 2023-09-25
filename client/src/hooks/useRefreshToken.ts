import { refreshSessionRequest } from "../apiRequests/sessions";
import useAuthContext from "../authContext/useAuthContext";

const useRefreshToken = () => {
  const { setAuthState } = useAuthContext();
  const handleRefreshToken = async () => {
    try {
      const result = await refreshSessionRequest();
      if (result.success && result.data) {
        setAuthState((prevState) => ({ ...prevState, ...result.data }));
        return result.data.access_token;
      }
    } catch (error) {
      return "";
    }
    return "";
  };
  return handleRefreshToken;
};

export default useRefreshToken;
