import { z } from "zod";
import { emailSchema, passwordSchema } from "./user.schema";
import { tokenSchema } from "./common.schema";

export const emailSignInSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strip();

export const verifyEmailSchema = z.object({ token: tokenSchema }).strip();

export type EmailSignInType = z.TypeOf<typeof emailSignInSchema>;
export type VerifyEmailType = z.TypeOf<typeof verifyEmailSchema>;
