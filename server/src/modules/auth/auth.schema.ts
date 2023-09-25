import { z } from "zod";
import { emailSchema } from "../user/user.schema";

export const emailSignInSchema = z
  .object({
    email: emailSchema,
    password: z.string({ required_error: "Password is required" }),
  })
  .strip();

export const oauthSignInSchema = z
  .object({
    code: z.string({ required_error: "Authorization code required" }),
  })
  .strip();

export type EmailSignInInput = z.TypeOf<typeof emailSignInSchema>;
export type OAuthSignInput = z.TypeOf<typeof oauthSignInSchema>;
