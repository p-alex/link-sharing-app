import { refreshSessionRequest } from "../apiRequests/sessions";
import useAuth from "./useAuth";

const useRefreshToken = () => {
  const { dispatchAuth } = useAuth();
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
