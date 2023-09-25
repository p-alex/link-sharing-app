import { z } from "zod";
import { email_schema, password_schema } from "./user.schema";

export const emailSignInSchema = z
  .object({
    email: email_schema,
    password: password_schema,
  })
  .strip();

export type EmailSignInInput = z.TypeOf<typeof emailSignInSchema>;
