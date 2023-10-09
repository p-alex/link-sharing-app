import { z } from "zod";

export const idSchema = z.string({ required_error: "Id is required" }).uuid("Id must be a uuid");

export const tokenSchema = z
  .string({ required_error: "Token is required" })
  .regex(/^([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/gm, "Token must be a jwt");
