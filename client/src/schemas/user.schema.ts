import { z } from "zod";

export const emailSchema = z
  .string({ required_error: "Email is required" })
  .email("Email is invalid")
  .max(64, "Email must be at most 64 characters long");

export const passwordSchema = z
  .string({ required_error: "Password is required" })
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/g,
    "Must contain at least 1 uppercase and lowercase letter, and 1 number",
  );

export const confirmPasswordSchema = z.string({ required_error: "Confirm password is required" });

export const signUpSchema = z
  .object({
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: confirmPasswordSchema,
  })
  .refine((current) => current.password === current.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const signInSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Can't be empty"),
});

export const forgetPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string({ required_error: "Confirm password is required" }),
  })
  .refine((current) => current.password === current.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export type SignUpSchemaType = z.TypeOf<typeof signUpSchema>;

export type SignInSchemaType = z.TypeOf<typeof signInSchema>;

export type ForgetPasswordType = z.TypeOf<typeof forgetPasswordSchema>;

export type ResetPasswordType = z.TypeOf<typeof resetPasswordSchema>;
