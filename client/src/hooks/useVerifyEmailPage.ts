import { useEffect, useState } from "react";
import { verifyEmailRequest } from "../apiRequests/auth";
import useVerificationTokenConfirmation from "./useVerificationTokenConfirmation";

const useVerifyEmailPage = () => {
  const [error, setError] = useState("");

  const { isTokenValid, isTokenConfirmationLoading, tokenConfirmationError } =
    useVerificationTokenConfirmation({
      tokenParamName: "token",
      validationFunc: verifyEmailRequest,
    });

  const [step, setStep] = useState<"confirm_token_step" | "error_step" | "success_step">(
    "confirm_token_step",
  );

  useEffect(() => {
    if (isTokenConfirmationLoading) setStep("confirm_token_step");
  }, [isTokenConfirmationLoading]);

  useEffect(() => {
    if (tokenConfirmationError) {
      setError(tokenConfirmationError);
      setStep("error_step");
    }
  }, [tokenConfirmationError]);

  useEffect(() => {
    if (isTokenValid) setStep("success_step");
  }, [isTokenValid]);

  return { error, step };
};

export default useVerifyEmailPage;
