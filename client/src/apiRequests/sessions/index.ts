import { IDefaultResponse, axiosPublic } from "..";
import { IAuth } from "../../redux/features/auth/authSlice";

export const refreshSessionRequest = async () => {
  const result = await axiosPublic.post<IDefaultResponse<IAuth>>(
    "/sessions/refresh",
    {},
    { withCredentials: true },
  );
  return result.data;
};
