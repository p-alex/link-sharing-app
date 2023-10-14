import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword, resetPasswordConfirmation } from "../apiRequests/users";
import { AxiosError } from "axios";
import { tokenSchema } from "../schemas/common.schema";
import getParamFromUrl from "../utils/getParamFromUrl";
import { ResetPasswordType } from "../schemas/user.schema";

const useResetPasswordPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState<
    | "token-confirmation-step"
    | "reset-password-step"
    | "token-confirmation-error-step"
    | "success-step"
  >("token-confirmation-step");

  const [confirmationError, setConfirmationError] = useState("");

  const submit = async (data: ResetPasswordType) => {
    const result = await resetPassword({
      password: data.password,
      token: getParamFromUrl("token") as string,
    });
    if (result.success) {
      resetForm();
      setStep("success-step");
    }
  };

  const handleConfirmToken = async (token: string) => {
    try {
      const result = await resetPasswordConfirmation({ token });
      if (result.success) {
        setStep("reset-password-step");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setStep("token-confirmation-error-step");
        setConfirmationError(error.response?.data.errors[0]);
      }
    }
  };

  const validateToken = useCallback((token: string) => {
    if (!tokenSchema.safeParse(token).success) return null;
    return token;
  }, []);

  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (!effectRan.current) {
      const token = getParamFromUrl("token");
      if (!token) return navigate("/sign-in");
      const validToken = validateToken(token);
      if (!validToken) return navigate("/sign-in");
      handleConfirmToken(validToken);
    }
    return () => {
      effectRan.current = true;
    };
  }, [navigate, validateToken]);

  return { step, confirmationError, submit };
};

export default useResetPasswordPage;
