import { z } from "zod";
import { nameSchema } from "../../schemas/profile.schema";

export const updateProfileDetailsSchema = z.object({
  id: z.string().uuid(),
  profilePicture: z.union([z.literal(""), z.string().trim()]),
  firstName: nameSchema,
  lastName: nameSchema,
  publicEmail: z.union([z.literal(""), z.string().email().trim()]),
});

export type UpdateProfileDetailsInputType = z.TypeOf<typeof updateProfileDetailsSchema>;
