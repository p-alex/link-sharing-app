import { z } from "zod";

export const jwtSchema = z
  .string({ required_error: "Jwt token is required" })
  .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/gm, "Jwt token is not valid");

export const idSchema = z.string({ required_error: "Id is required" }).uuid("Id must be a uuid");
