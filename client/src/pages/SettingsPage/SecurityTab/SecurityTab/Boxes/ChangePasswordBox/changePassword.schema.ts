import { z } from "zod";
import { passwordSchema } from "../../../../../../schemas/user.schema";

const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Can't be empty"),
    newPassword: passwordSchema,
    confirmNewPassword: z.string(),
  })
  .superRefine((current, ctx) => {
    if (current.newPassword.length > 0 && current.newPassword === current.oldPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["newPassword"],
        message: "New password cannot be the same as the old password",
      });
    }
    if (current.newPassword !== current.confirmNewPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["confirmNewPassword"],
        message: "Passwords must match",
      });
    }
  });

export default changePasswordSchema;
