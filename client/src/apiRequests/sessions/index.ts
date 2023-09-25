import { IDefaultResponse, axiosPublic } from "..";

export const refreshSessionRequest = async () => {
  const result = await axiosPublic.post<IDefaultResponse<{ access_token: string }>>(
    "/sessions/refresh",
    {},
    { withCredentials: true },
  );
  return result.data;
};
