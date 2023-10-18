import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInSchemaType } from "../schemas/user.schema";
import { emailSignInRequest } from "../apiRequests/auth";
import getParamFromUrl from "../utils/getParamFromUrl";
import useCaptcha from "./useCaptcha";
import useAuth from "./useAuth";

const useSignInPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();
  const [oauthError, setOAuthError] = useState("");

  const { dispatchAuth } = useAuth();

  const { captchaRef, getCaptchaToken } = useCaptcha();

  const submit = async (formData: SignInSchemaType) => {
    const captchaToken = await getCaptchaToken();

    const { success, data } = await emailSignInRequest({
      ...formData,
      captchaToken,
    });

    if (success && data) {
      resetForm();
      dispatchAuth({ type: "LOGIN", payload: data });
      navigate("/links");
    }
  };

  useEffect(() => {
    const oauthError = getParamFromUrl("error");
    if (oauthError) {
      setOAuthError(oauthError);
      setTimeout(() => {
        setOAuthError("");
      }, 5000);
    }
  }, []);

  return { oauthError, submit, captchaRef };
};

export default useSignInPage;
