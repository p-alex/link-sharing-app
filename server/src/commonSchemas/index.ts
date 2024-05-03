import { z } from "zod";

export const jwtSchema = z
  .string({ required_error: "Jwt token is required" })
  .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/gm, "Jwt token is not valid");

export const captchaTokenSchema = z
  .string({ required_error: "Captcha token is required" })
  .min(1000);

export const idSchema = z.string({ required_error: "Id is required" }).uuid("Id must be a uuid");

export const userIdParamSchema = z.object({
  userId: z.string().uuid(),
});

export type UserIdParamInput = z.TypeOf<typeof userIdParamSchema>;
