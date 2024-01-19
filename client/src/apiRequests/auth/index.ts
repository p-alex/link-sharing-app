import { IDefaultResponse, axiosPublic } from "..";
import { IAuth } from "../../redux/features/auth/authSlice";
import { EmailSignInType, VerifyEmailType } from "../../schemas/auth.schema";

export const emailSignInRequest = async (
  body: EmailSignInType & { captchaToken: string },
): Promise<IDefaultResponse<IAuth>> => {
  const result = await axiosPublic.post<IDefaultResponse<IAuth>>("/auth/email-sign-in", body, {
    withCredentials: true,
  });
  return result.data;
};

export const verifyEmailRequest = async (body: VerifyEmailType) => {
  const result = await axiosPublic.post<IDefaultResponse<null>>(
    "/auth/verify-email/" + body.token,
    {},
  );
  return result.data;
};
