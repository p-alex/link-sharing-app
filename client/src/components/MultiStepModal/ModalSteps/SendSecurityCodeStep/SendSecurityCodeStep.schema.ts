import { z } from "zod";

export const securityCodeSchema = z.object({
  securityCode: z.string().length(6).regex(/\d/, "Must contain only numbers"),
});

export type SecurityCodeInput = z.TypeOf<typeof securityCodeSchema>;
