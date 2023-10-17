import { z } from "zod";
import { emailSchema } from "../user/user.schema";
import { captchaTokenSchema, jwtSchema } from "../../commonSchemas";

export const emailSignInSchema = z
  .object({
    email: emailSchema,
    password: z.string({ required_error: "Password is required" }),
    captchaToken: captchaTokenSchema,
  })
  .strip();

export const oauthSignInSchema = z
  .object({
    code: z.string({ required_error: "Authorization code required" }),
  })
  .strip();

export const verifyEmailSchema = z.object({
  token: jwtSchema,
});

export type EmailSignInInput = z.TypeOf<typeof emailSignInSchema>;
export type OAuthSignInput = z.TypeOf<typeof oauthSignInSchema>;
export type VerifyEmailInput = z.TypeOf<typeof verifyEmailSchema>;
