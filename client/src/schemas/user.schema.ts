import { z } from "zod";

export const email_schema = z
  .string({ required_error: "Email is required" })
  .nonempty("Email is required")
  .email("Email is invalid")
  .max(64, "Email must be at most 64 characters long");

export const password_schema = z
  .string({ required_error: "Password is required" })
  .nonempty("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .regex(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*/g,
    "Must contain at least 1 uppercase and lowercase letter, and 1 number",
  );

export const confirmPassword_schema = z
  .string({ required_error: "Confirm password is required" })
  .nonempty("Confirm password is required");

export const signUpSchema = z
  .object({
    email: email_schema,
    password: password_schema,
    confirmPassword: confirmPassword_schema,
  })
  .refine((current) => current.password === current.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords must match",
  });

export const signInSchema = z.object({
  email: email_schema,
  password: z.string().nonempty("Password is required"),
});

export type SignUpSchemaType = z.TypeOf<typeof signUpSchema>;

export type SignInSchemaType = z.TypeOf<typeof signInSchema>;
