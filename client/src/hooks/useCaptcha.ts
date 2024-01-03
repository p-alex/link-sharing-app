import { useRef } from "react";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const useCaptcha = () => {
  const captchaRef = useRef<HCaptcha>(null);

  const getCaptchaToken = async () => {
    const result = await captchaRef.current?.execute({ async: true });

    return result!.response;
  };

  return { captchaRef, getCaptchaToken };
};

export default useCaptcha;
