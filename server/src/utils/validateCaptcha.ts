import axios from "axios";
import { config } from "../config";
import objectUrlEncode from "./objectUrlEncode";

export const validateCaptchaToken = async (captchaToken: string) => {
  const data = { secret: config.CAPTCHA_SECRET_KEY, response: captchaToken };
  const urlEncodedData = objectUrlEncode(data);
  const response = await axios.post<{
    success: boolean;
    "error-codes": string[];
  }>("https://api.hcaptcha.com/siteverify", urlEncodedData);
  return response.data;
};
