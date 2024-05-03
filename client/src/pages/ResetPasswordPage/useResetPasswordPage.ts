import { useEffect, useState } from "react";
import getParamFromUrl from "../../utils/getParamFromUrl";
import { ResetPasswordType } from "../../schemas/user.schema";
import useVerificationTokenConfirmation from "../../hooks/useVerificationTokenConfirmation";
import { resetPassword, resetPasswordConfirmation } from "../../apiRequests/users";

const useResetPasswordPage = ({ resetForm }: { resetForm: () => void }) => {
  const [step, setStep] = useState<
    | "token_confirmation_step"
    | "reset_password_step"
    | "token_confirmation_error_step"
    | "success_step"
  >("token_confirmation_step");

  const [confirmationError, setConfirmationError] = useState("");

  const { isTokenValid, isTokenConfirmationLoading, tokenConfirmationError } =
    useVerificationTokenConfirmation({
      tokenParamName: "token",
      validationFunc: resetPasswordConfirmation,
    });

  const submit = async (data: ResetPasswordType) => {
    const result = await resetPassword({
      password: data.password,
      token: getParamFromUrl("token") as string,
    });
    if (result.success) {
      resetForm();
      setStep("success_step");
    }
  };

  useEffect(() => {
    if (isTokenConfirmationLoading) setStep("token_confirmation_step");
  }, [isTokenConfirmationLoading]);

  useEffect(() => {
    if (tokenConfirmationError) {
      setConfirmationError(tokenConfirmationError);
      setStep("token_confirmation_error_step");
    }
  }, [tokenConfirmationError]);

  useEffect(() => {
    if (isTokenValid) setStep("reset_password_step");
  }, [isTokenValid]);

  return { step, confirmationError, submit };
};

export default useResetPasswordPage;
