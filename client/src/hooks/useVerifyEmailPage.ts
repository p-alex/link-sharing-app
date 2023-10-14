import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VerifyEmailType } from "../schemas/auth.schema";
import { verifyEmailRequest } from "../apiRequests/auth";
import { AxiosError } from "axios";
import { tokenSchema } from "../schemas/common.schema";
import getParamFromUrl from "../utils/getParamFromUrl";

const useVerifyEmailPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [step, setStep] = useState<"confirm-token-step" | "error-step" | "success-step">(
    "confirm-token-step",
  );

  const handleVerify = useCallback(async (data: VerifyEmailType) => {
    try {
      const { success } = await verifyEmailRequest({ token: data.token });
      if (success) {
        setStep("success-step");
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error.response?.data.errors[0]);
        setStep("error-step");
      }
    }
  }, []);

  const validateToken = useCallback((token: string) => {
    if (!tokenSchema.safeParse(token).success) return null;
    return token;
  }, []);

  const effectRan = useRef<boolean>(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const token = getParamFromUrl("token");
      if (!token) return navigate("/sign-in");
      const validToken = validateToken(token);
      if (!validToken) return navigate("/sign-in");
      handleVerify({ token });
    }

    return () => {
      effectRan.current = true;
    };
  }, [handleVerify, navigate, validateToken]);

  return { error, step };
};

export default useVerifyEmailPage;
