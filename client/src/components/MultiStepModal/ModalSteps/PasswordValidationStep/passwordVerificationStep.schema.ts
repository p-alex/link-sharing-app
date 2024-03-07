import { z } from "zod";
import { passwordSchema } from "../../../../schemas/user.schema";

export const passwordVerificationFormSchema = z.object({ password: passwordSchema });

export type PasswordVerificationFormType = z.TypeOf<typeof passwordVerificationFormSchema>;
