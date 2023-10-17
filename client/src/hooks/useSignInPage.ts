import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInSchemaType } from "../schemas/user.schema";
import { emailSignInRequest } from "../apiRequests/auth";
import useAuthContext from "../authContext/useAuthContext";
import getParamFromUrl from "../utils/getParamFromUrl";
import useCaptcha from "./useCaptcha";

const useSignInPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();
  const [oauthError, setOAuthError] = useState("");

  const { dispatchAuth } = useAuthContext();

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
