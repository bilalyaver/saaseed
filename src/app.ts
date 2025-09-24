import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import swaggerUi from "swagger-ui-express";
import { logger } from "@core/utils/logger";
import { buildOpenApiSpec } from "./docs/openapi";
import { errorHandler } from "@core/utils/error";
const app = express();

// Orta katmanlar
app.use(express.json());
app.use(cors());
app.use(helmet());

// Request loglama (her isteği logla)
app.use((req, _res, next) => {
  logger.info({ method: req.method, url: req.url }, "Incoming request");
  next();
});

// Swagger UI
const openapiSpec = buildOpenApiSpec();
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(openapiSpec));
app.get("/api/docs.json", (_req, res) => res.json(openapiSpec));

// Ana API rotaları
app.use("/api", routes);

// Hata yakalama
app.use(errorHandler);

export default app;