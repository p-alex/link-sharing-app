import { refreshSessionRequest } from "../apiRequests/sessions";
import useAuthContext from "../authContext/useAuthContext";

const useRefreshToken = () => {
  const { dispatchAuth } = useAuthContext();
  const handleRefreshToken = async () => {
    try {
      const result = await refreshSessionRequest();
      if (result.success && result.data) {
        dispatchAuth({ type: "REFRESH_SESSION", payload: result.data });
        return result.data.accessToken;
      }
    } catch (error) {
      return "";
    }
    return "";
  };
  return handleRefreshToken;
};

export default useRefreshToken;
