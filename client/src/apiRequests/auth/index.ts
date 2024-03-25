import { IDefaultResponse, axiosPublic } from "..";
import { IAuth } from "../../redux/features/auth/authSlice";
import { IProfile } from "../../redux/features/profile/profileSlice";
import { EmailSignInType, VerifyEmailType } from "../../schemas/auth.schema";

export interface IAuthResponse {
  authData: IAuth;
  profileData: IProfile;
}

export const emailSignInRequest = async (
  body: EmailSignInType & { captchaToken: string },
): Promise<IDefaultResponse<IAuthResponse>> => {
  const result = await axiosPublic.post<IDefaultResponse<IAuthResponse>>(
    "/auth/email-sign-in",
    body,
    {
      withCredentials: true,
    },
  );
  return result.data;
};

export const verifyEmailRequest = async (body: VerifyEmailType) => {
  const result = await axiosPublic.post<IDefaultResponse<null>>(
    "/auth/verify-email/" + body.token,
    {},
  );
  return result.data;
};
