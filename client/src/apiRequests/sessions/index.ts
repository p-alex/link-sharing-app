import { IDefaultResponse, axiosPublic } from "..";
import { IAuthResponse } from "../auth";

export const refreshSessionRequest = async () => {
  const result = await axiosPublic.post<IDefaultResponse<IAuthResponse>>(
    "/sessions/refresh",
    {},
    { withCredentials: true },
  );
  return result.data;
};
