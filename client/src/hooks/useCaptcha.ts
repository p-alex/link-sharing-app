import { useRef } from "react";
import ReCaptcha from "react-google-recaptcha";

const useCaptcha = () => {
  const captchaRef = useRef<ReCaptcha>(null);

  const getCaptchaToken = async () => {
    captchaRef.current?.reset();
    const result = await captchaRef.current?.executeAsync();
    return result!;
  };

  return { captchaRef, getCaptchaToken };
};

export default useCaptcha;
