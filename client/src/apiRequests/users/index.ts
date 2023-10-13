import { axiosPublic } from "..";
import { SignUpSchemaType } from "../../schemas/user.schema";

interface IDefaultResponse<TData> {
  success: boolean;
  status_code: number;
  errors?: string[];
  data: TData | null;
}

export const createUser = async (body: Omit<SignUpSchemaType, "confirmPassword">) => {
  const response = await axiosPublic.post<IDefaultResponse<{ id: string }>>("/users", body);
  return response.data;
};

export const forgetPassword = async (body: { email: string }) => {
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
