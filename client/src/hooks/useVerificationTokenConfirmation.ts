import { useCallback, useEffect, useRef, useState } from "react";
import getParamFromUrl from "../utils/getParamFromUrl";
import { useNavigate } from "react-router-dom";
import { tokenSchema } from "../schemas/common.schema";
import { IDefaultResponse } from "../apiRequests";
import { AxiosError } from "axios";

const useVerificationTokenConfirmation = ({
  tokenParamName,
  validationFunc,
}: {
  tokenParamName: string;
  validationFunc: (body: { token: string }) => Promise<IDefaultResponse<null>>;
}) => {
  const navigate = useNavigate();
  const [isTokenValid, setTokenIsValid] = useState(false);
  const [isTokenConfirmationLoading, setIsTokenConfirmationLoading] = useState(true);
  const [tokenConfirmationError, setTokenConfirmationError] = useState("");

  const effectRan = useRef<boolean>(false);

  const validateToken = (token: string) => {
    if (!tokenSchema.safeParse(token).success) return null;
    return token;
  };

  const handleTokenValidation = useCallback(async (token: string) => {
    try {
      const result = await validationFunc({ token });
      if (result.success) {
        setTokenIsValid(true);
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error instanceof AxiosError) {
        setTokenConfirmationError(error.response?.data.errors[0]);
      }
    } finally {
      setIsTokenConfirmationLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!effectRan.current) {
      const token = getParamFromUrl(tokenParamName);
      if (!token) return navigate("/sign-in");
      const validToken = validateToken(token);
      if (!validToken) return navigate("/sign-in");
      handleTokenValidation(validToken);
    }

    return () => {
      effectRan.current = true;
    };
  }, [tokenParamName, handleTokenValidation, navigate]);

  return { isTokenValid, isTokenConfirmationLoading, tokenConfirmationError };
};

export default useVerificationTokenConfirmation;
