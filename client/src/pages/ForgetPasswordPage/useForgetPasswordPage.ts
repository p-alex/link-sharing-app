import { useState } from "react";
import { ForgetPasswordType } from "../../schemas/user.schema";
import { forgetPassword } from "../../apiRequests/users";
import useCaptcha from "../../hooks/useCaptcha";

const useForgetPasswordPage = ({ formReset }: { formReset: () => void }) => {
  const [success, setSuccess] = useState(false);

  const { captchaRef, getCaptchaToken } = useCaptcha();

  const submit = async (data: ForgetPasswordType) => {
    const captchaToken = await getCaptchaToken();
    const result = await forgetPassword({ ...data, captchaToken });
    if (result.success) {
      formReset();
      setSuccess(true);
    }
  };

  return { success, submit, captchaRef };
};

export default useForgetPasswordPage;
