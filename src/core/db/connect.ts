import { config } from "@core/utils/config";
import { logger } from "@core/utils/logger";
import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(config.MONGO_URI);
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    logger.error(err, "❌ MongoDB connection failed");
    process.exit(1);
  }
}