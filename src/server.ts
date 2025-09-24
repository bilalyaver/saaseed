import { config } from "@core/utils/config";
import app from "./app";
import { connectDB } from "@core/db/connect";
import { logger } from "@core/utils/logger";

const PORT = config.PORT || 3000;

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      logger.info(`🚀 SaaSeed API running on http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error(err, "❌ Failed to start server");
    process.exit(1);
  }
}

start();