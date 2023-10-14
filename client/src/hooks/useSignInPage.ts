import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInSchemaType } from "../schemas/user.schema";
import { emailSignInRequest } from "../apiRequests/auth";
import useAuthContext from "../authContext/useAuthContext";
import getParamFromUrl from "../utils/getParamFromUrl";

const useSignInPage = ({ resetForm }: { resetForm: () => void }) => {
  const navigate = useNavigate();
  const [oauthError, setOAuthError] = useState("");

  const { dispatchAuth } = useAuthContext();

  const submit = async (formData: SignInSchemaType) => {
    const { success, data } = await emailSignInRequest(formData);
    if (success && data) {
      resetForm();
      dispatchAuth({ type: "LOGIN", payload: data });
      navigate("/");
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

  return { oauthError, submit };
};

export default useSignInPage;
