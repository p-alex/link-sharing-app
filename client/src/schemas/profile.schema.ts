import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, "Must be at least 2 characters long")
  .max(18, "Must be at most 18 characters long")
  .trim();
