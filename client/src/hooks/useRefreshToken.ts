import { useDispatch } from "react-redux";
import { refreshSessionRequest } from "../apiRequests/sessions";
import { auth_refreshSessionAction } from "../redux/features/auth/authSlice";
import { setProfileAction } from "../redux/features/profile/profileSlice";
import { useCallback } from "react";

const useRefreshToken = () => {
  const dispatch = useDispatch();

  const handleRefreshToken = useCallback(async () => {
    try {
      const result = await refreshSessionRequest();
      if (result.success && result.data) {
        dispatch(auth_refreshSessionAction(result.data.authData));
        dispatch(setProfileAction(result.data.profileData));
        return result.data.authData.accessToken;
      }
    } catch (error) {
      return "";
    }
    return "";
  }, [dispatch]);

  return handleRefreshToken;
};

export default useRefreshToken;
