import { IDefaultResponse, axiosPrivate, axiosPublic } from "..";
import { EmailSignInType, VerifyEmailType } from "../../schemas/auth.schema";

export const emailSignInRequest = async (
  body: EmailSignInType,
): Promise<IDefaultResponse<{ id: string; email: string; accessToken: string }>> => {
  const result = await axiosPublic.post<
    IDefaultResponse<{ id: string; email: string; accessToken: string }>
  >("/auth/email-sign-in", body, { withCredentials: true });
  return result.data;
};

export const verifyEmailRequest = async (body: VerifyEmailType) => {
  await axiosPublic.post("/auth/verify-email/" + body.token, {});
  return { success: true };
};

export const logoutRequest = async (access_token: string): Promise<null> => {
  await axiosPrivate.post(
    "/auth/logout",
    {},
    { headers: { Authorization: `Bearer ${access_token}` } },
  );
  return null;
};
