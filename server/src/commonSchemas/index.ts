import { z } from "zod";

export const idSchema = z.string({ required_error: "Id is required" }).uuid("Id must be a uuid");
