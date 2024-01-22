import { useState } from "react";
import { SignUpSchemaType } from "../../schemas/user.schema";
import { createUser } from "../../apiRequests/users";
import useCaptcha from "../../hooks/useCaptcha";
import { useDispatch } from "react-redux";
import { addPopupAction } from "../../redux/features/globalPopupsSlice/globalPopupsSlice";

const useSignUpPage = ({ formReset }: { formReset: () => void }) => {
  const dispatch = useDispatch();
  const [successMessage, setSuccessMessage] = useState("");

  const { captchaRef, getCaptchaToken } = useCaptcha();

  const submit = async (formData: SignUpSchemaType) => {
    const captchaToken = await getCaptchaToken();
    const { success, errors } = await createUser({ ...formData, captchaToken });

    if (errors) {
      dispatch(addPopupAction({ message: errors[0], type: "error" }));
      return;
    }

    if (success) {
      formReset();
      setSuccessMessage(
        "We've sent you an email to verify your email address and activate your account. The link in the email will expire in 24 hours.",
      );
    }
  };

  return { successMessage, submit, captchaRef };
};

export default useSignUpPage;
