import { z } from "zod";
import { idSchema } from "../../commonSchemas";

export const EMAIL_MAX_LENGTH = 64;
export const PASSWORD_MIN_LENGTH = 8;

export const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/g;

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .max(EMAIL_MAX_LENGTH, `Email must be at most ${EMAIL_MAX_LENGTH} characters long`)
  .email("Email is invalid");

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters long`)
  .regex(PASSWORD_REGEX, "Must contain at least 1 uppercase and lowercase letter, and 1 number");

export const createUserSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
  })
  .strip();

export const updateUserSchema = z
  .object({
    id: idSchema,
    email: emailSchema.optional(),
    password: passwordSchema.optional(),
  })
  .strip();

export const deleteUserSchema = z
  .object({
    id: idSchema,
  })
  .strip();

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;
export type UpdateUserInput = z.TypeOf<typeof updateUserSchema>;
export type DeleteUserInput = z.TypeOf<typeof deleteUserSchema>;
