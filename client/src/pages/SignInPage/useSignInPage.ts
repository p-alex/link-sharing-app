import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInSchemaType } from "../../schemas/user.schema";
import { emailSignInRequest } from "../../apiRequests/auth";
import getParamFromUrl from "../../utils/getParamFromUrl";
import useCaptcha from "../../hooks/useCaptcha";
import { useDispatch } from "react-redux";
import { auth_loginAction } from "../../redux/features/auth/authSlice";
import { addPopupAction } from "../../redux/features/globalPopupsSlice/globalPopupsSlice";
import { setProfileAction } from "../../redux/features/profile/profileSlice";

const useSignInPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();
  const [oauthError, setOAuthError] = useState("");
  const dispatch = useDispatch();

  const { captchaRef, getCaptchaToken } = useCaptcha();

  const submit = async (formData: SignInSchemaType) => {
    const captchaToken = await getCaptchaToken();
    const { success, data, errors } = await emailSignInRequest({
      ...formData,
      email: formData.email.toLowerCase().trim(),
      captchaToken,
    });

    if (errors) {
      dispatch(addPopupAction({ message: errors[0], type: "error" }));
      return;
    }

    if (success && data) {
      resetForm();
      dispatch(auth_loginAction(data.authData));
      dispatch(setProfileAction(data.profileData));
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
