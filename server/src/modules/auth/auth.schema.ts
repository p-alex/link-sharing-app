import { z } from "zod";
import { emailSchema } from "../user/user.schema";

export const emailSignInSchema = z
  .object({
    email: emailSchema,
    password: z.string({ required_error: "Password is required" }),
  })
  .strip();

export type EmailSignInInput = z.TypeOf<typeof emailSignInSchema>;
