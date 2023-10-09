import { IDefaultResponse, axiosPublic } from "..";
import { IAuthState } from "../../authContext/AuthContextProvider";

export const refreshSessionRequest = async () => {
  const result = await axiosPublic.post<IDefaultResponse<IAuthState>>(
    "/sessions/refresh",
    {},
    { withCredentials: true },
  );
  return result.data;
};
