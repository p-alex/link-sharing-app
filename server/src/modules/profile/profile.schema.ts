import { z } from "zod";

export const getProfileByUserIdSchema = z.object({
  userId: z.string().uuid(),
});

export const updateProfileDetailsSchema = z.object({
  id: z.string().uuid(),
  profilePicture: z.union([z.literal(""), z.string()]),
  firstName: z
    .string()
    .min(2, "Must be at least 2 characters long")
    .max(18, "Must be at most 18 characters long"),
  lastName: z
    .string()
    .min(2, "Must be at least 2 characters long")
    .max(18, "Must be at most 18 characters long")
    .nullable(),
  publicEmail: z.union([z.literal(""), z.string().email()]),
});

export const removeProfilePictureSchema = z.object({
  profileId: z.string().uuid(),
});

export type GetProfileByUserIdInput = z.TypeOf<typeof getProfileByUserIdSchema>;

export type UpdateProfileDetailsInput = z.TypeOf<typeof updateProfileDetailsSchema>;

export type RemoveProfilePictureInput = z.TypeOf<typeof removeProfilePictureSchema>;
