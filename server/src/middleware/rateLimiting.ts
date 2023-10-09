import { rateLimit } from "express-rate-limit";
import { TimeConverter } from "../utils/timeConverter";
import DefaultResponse from "../lib/defaultResponse";

const timeConverter = new TimeConverter();

export const veryHighRateLimit = rateLimit({
  windowMs: timeConverter.toMs(15, "minute"),
  limit: 6,
  message: new DefaultResponse(false, 429, null, [
    "Too many requests. Please try again in 15 minutes.",
  ]),
});

export const highRateLimit = rateLimit({
  windowMs: timeConverter.toMs(15, "minute"),
  limit: 12,
  message: new DefaultResponse(false, 429, null, [
    "Too many requests. Please try again in 15 minutes.",
  ]),
});
export const mediumRateLimit = rateLimit({
  windowMs: timeConverter.toMs(1, "minute"),
  limit: 12,
  message: new DefaultResponse(false, 429, null, [
    "Too many requests. Please try again in 1 minute.",
  ]),
});
export const lowRateLimit = rateLimit({
  windowMs: timeConverter.toMs(1, "second"),
  limit: 12,
  message: new DefaultResponse(false, 429, null, [
    "Too many requests. Please try again in 1 second.",
  ]),
});
