import { z } from "zod";
import { jwtSchema } from "../../commonSchemas";

export const deleteAllOtherSessionsSchema = z.object({
  securityToken: jwtSchema,
});

export type DeleteAllOtherSessionsInput = z.TypeOf<typeof deleteAllOtherSessionsSchema>;
