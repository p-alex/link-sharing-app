import { axiosPublic } from "..";
import { SignUpSchemaType } from "../../schemas/user.schema";

interface IDefaultResponse<TData> {
  success: boolean;
  status_code: number;
  errors?: string[];
  data: TData | null;
}

export const createUser = async (
  body: Omit<SignUpSchemaType, "confirmPassword">,
): Promise<IDefaultResponse<{ id: string }>> => {
  const response = await axiosPublic.post<IDefaultResponse<{ id: string }>>("/users", body);
  return response.data;
};
