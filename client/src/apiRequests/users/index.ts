import { IDefaultResponse, axiosPublic } from "..";
import { SignUpSchemaType } from "../../schemas/user.schema";

export const createUser = async (
  body: Omit<SignUpSchemaType, "confirmPassword"> & { captchaToken: string },
) => {
  const response = await axiosPublic.post<IDefaultResponse<{ id: string }>>("/users", body);
  return response.data;
};

export const forgetPassword = async (body: { email: string; captchaToken: string }) => {
  const response = await axiosPublic.post<IDefaultResponse<null>>("/users/forget-password", body);
  return response.data;
};

export const resetPasswordConfirmation = async (body: { token: string }) => {
  const response = await axiosPublic.post<IDefaultResponse<null>>(
    "/users/reset-password-confirmation",
    body,
  );
  return response.data;
};

export const resetPassword = async (body: { token: string; password: string }) => {
  const response = await axiosPublic.post<IDefaultResponse<null>>("/users/reset-password", body);
  return response.data;
};
