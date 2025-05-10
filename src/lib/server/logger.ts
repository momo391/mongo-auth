import { MongoDBTransport } from "$lib/mongo-transort";
import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, ...rest }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message} ${Object.entries(
        rest
      )
        .map(([key, value]) => `${key}=${value}`)
        .join(" ")}`;
    })
  ),
  transports: [new winston.transports.Console(), new MongoDBTransport({})],
});
