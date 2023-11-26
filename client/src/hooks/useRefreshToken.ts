import { useDispatch } from "react-redux";
import { refreshSessionRequest } from "../apiRequests/sessions";
import { refreshSessionAction } from "../redux/features/auth/authSlice";

const useRefreshToken = () => {
  const dispatch = useDispatch();
  const handleRefreshToken = async () => {
    try {
      const result = await refreshSessionRequest();
      if (result.success && result.data) {
        dispatch(refreshSessionAction(result.data));
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
