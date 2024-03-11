import { z } from "zod";
import { captchaTokenSchema } from "../../commonSchemas";

export const sendSecurityCodeSchema = z.object({
  captchaToken: captchaTokenSchema,
});

export const verifySecurityCodeSchema = z
  .object({
    securityCode: z.string().length(6).regex(/\d/, "Security code must contain only numbers"),
  })
  .strip();

export type SendSecurityCodeInput = z.TypeOf<typeof sendSecurityCodeSchema>;

export type VerifitySecurityCodeInput = z.TypeOf<typeof verifySecurityCodeSchema>;
