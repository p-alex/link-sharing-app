import { IDefaultResponse, axiosPublic } from "..";
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
  const result = await axiosPublic.post<IDefaultResponse<null>>(
    "/auth/verify-email/" + body.token,
    {},
  );
  return result.data;
};
