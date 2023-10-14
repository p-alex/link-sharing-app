import { useState } from "react";
import { ForgetPasswordType } from "../schemas/user.schema";
import { forgetPassword } from "../apiRequests/users";

const useForgetPasswordPage = ({ formReset }: { formReset: () => void }) => {
  const [success, setSuccess] = useState(false);

  const submit = async (data: ForgetPasswordType) => {
    const result = await forgetPassword(data);
    if (result.success) {
      formReset();
      setSuccess(true);
    }
  };

  return { success, submit };
};

export default useForgetPasswordPage;
