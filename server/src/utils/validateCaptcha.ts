import axios from "axios";
import { config } from "../config";

export const validateCaptchaToken = async (captchaToken: string) => {
  const response = await axios.post<{
    success: boolean;
    challenge_ts: string;
    hostname: string;
    "error-codes": string[];
  }>(
    "https://www.google.com/recaptcha/api/siteverify" +
      `?secret=${config.CAPTCHA_SECRET_KEY}` +
      `&response=${captchaToken}`,
  );
  return response.data;
};
