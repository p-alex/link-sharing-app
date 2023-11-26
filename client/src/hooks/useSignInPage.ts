import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInSchemaType } from "../schemas/user.schema";
import { emailSignInRequest } from "../apiRequests/auth";
import getParamFromUrl from "../utils/getParamFromUrl";
import useCaptcha from "./useCaptcha";
import { useDispatch } from "react-redux";
import { loginAction } from "../redux/features/auth/authSlice";

const useSignInPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();
  const [oauthError, setOAuthError] = useState("");
  const dispatch = useDispatch();

  const { captchaRef, getCaptchaToken } = useCaptcha();

  const submit = async (formData: SignInSchemaType) => {
    const captchaToken = await getCaptchaToken();

    const { success, data } = await emailSignInRequest({
      ...formData,
      captchaToken,
    });

    if (success && data) {
      resetForm();
      dispatch(loginAction({ id: data.id, email: data.email, accessToken: data.accessToken }));
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
