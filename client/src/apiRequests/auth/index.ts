import { IDefaultResponse, axiosPrivate, axiosPublic } from "..";
import { EmailSignInInput } from "../../schemas/auth.schema";

export const emailSignInRequest = async (
  body: EmailSignInInput,
): Promise<IDefaultResponse<{ id: string; email: string; access_token: string }>> => {
  const result = await axiosPublic.post<
    IDefaultResponse<{ id: string; email: string; access_token: string }>
  >("/auth/email-sign-in", body, { withCredentials: true });
  return result.data;
};

export const logoutRequest = async (access_token: string): Promise<null> => {
  await axiosPrivate.post(
    "/auth/logout",
    {},
    { headers: { Authorization: `Bearer ${access_token}` } },
  );
  return null;
};
