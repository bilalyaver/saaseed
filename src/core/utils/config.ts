import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: process.env.PORT || 8080,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/saaseed",
  JWT_SECRET: process.env.JWT_SECRET || "change_me",
  ACCESS_TTL: process.env.ACCESS_TTL || "1d",
  REFRESH_TTL: process.env.REFRESH_TTL || "7d",
  EMAIL: process.env.EMAIL || "owner@example.com",
  EMAIL_PASS: process.env.EMAIL_PASS || "password",
};