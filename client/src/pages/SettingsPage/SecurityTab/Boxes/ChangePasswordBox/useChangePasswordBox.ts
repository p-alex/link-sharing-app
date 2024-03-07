import React from "react";
import changePasswordSchema from "./changePassword.schema";
import { useDispatch } from "react-redux";
import useAxiosPrivate from "../../../../../hooks/useAxiosPrivate";
import useForm from "../../../../../hooks/useForm";
import { IDefaultResponse } from "../../../../../apiRequests";
import { addPopupAction } from "../../../../../redux/features/globalPopupsSlice/globalPopupsSlice";

const useChangePasswordBox = () => {
  const dispatch = useDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { register, handleSubmit, formState, reset } = useForm({
    payload: { oldPassword: "", newPassword: "", confirmNewPassword: "" },
    zodSchema: changePasswordSchema,
  });

  const handleChangePassword = async (event: React.FormEvent<HTMLFormElement>) => {
    await handleSubmit(event, async (formData) => {
      const result = await axiosPrivate.patch<IDefaultResponse<null>>(
        "/users/change-password",
        formData,
      );
      if (result.data.success) {
        reset();
        dispatch(addPopupAction({ type: "info", message: "Password changed!" }));
      }
    });
  };

  return { register, handleChangePassword, formState };
};

export default useChangePasswordBox;
