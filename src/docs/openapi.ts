import { z } from "zod";
import {
  OpenAPIRegistry,
  OpenApiGeneratorV3,
  extendZodWithOpenApi
} from "@asteasolutions/zod-to-openapi";
import { loginSchema, refreshSchema, registerSchema } from "@modules/auth/auth.schemas";
import { createTenantSchema, inviteSchema } from "@modules/tenants/tenant.schemas";
import { createUserSchema } from "@modules/users/user.schemas";

extendZodWithOpenApi(z);

const registry = new OpenAPIRegistry();

registry.registerComponent(
  "securitySchemes",
  "bearerAuth",
  { type: "http", scheme: "bearer", bearerFormat: "JWT" }
);

// Basit health
registry.registerPath({
  method: "get",
  path: "/health",
  description: "Health check",
  responses: { 200: { description: "OK" } },
  tags: ["Health"]
});

// AUTH
registry.registerPath({
  method: "post",
  path: "/auth/register",
  description: "Register a new user",
  request: {
    body: { required: true, content: { "application/json": { schema: registerSchema } } }
  },
  responses: { 200: { description: "User created" }, 400: { description: "Validation error" } },
  tags: ["Auth"]
});

registry.registerPath({
  method: "post",
  path: "/auth/login",
  description: "Login user and get tokens",
  request: {
    body: { required: true, content: { "application/json": { schema: loginSchema } } }
  },
  responses: { 200: { description: "Tokens" }, 401: { description: "Invalid credentials" } },
  tags: ["Auth"]
});

registry.registerPath({
  method: "post",
  path: "/auth/refresh",
  description: "Refresh access token",
  request: {
    body: { required: true, content: { "application/json": { schema: refreshSchema } } }
  },
  responses: { 200: { description: "New access token" }, 401: { description: "Invalid refresh token" } },
  tags: ["Auth"]
});

registry.registerPath({
  method: "post",
  path: "/auth/logout",
  description: "Logout user (invalidate refresh token)",
  request: {
    body: { required: true, content: { "application/json": { schema: refreshSchema } } }
  },
  responses: { 200: { description: "OK" } },
  tags: ["Auth"]
});

// TENANTS
registry.registerPath({
  method: "get",
  path: "/tenants/me",
  description: "Get current tenant",
  security: [{ bearerAuth: [] }],
  responses: { 200: { description: "Tenant" }, 401: { description: "Unauthorized" } },
  tags: ["Tenants"]
});

registry.registerPath({
  method: "post",
  path: "/tenants",
  description: "Create a new tenant",
  security: [{ bearerAuth: [] }],
  request: {
    body: { required: true, content: { "application/json": { schema: createTenantSchema } } }
  },
  responses: { 200: { description: "Tenant created" }, 401: { description: "Unauthorized" } },
  tags: ["Tenants"]
});

registry.registerPath({
  method: "post",
  path: "/tenants/invite",
  description: "Invite a user to the tenant",
  security: [{ bearerAuth: [] }],
  request: {
    body: { required: true, content: { "application/json": { schema: inviteSchema } } }
  },
  responses: { 200: { description: "Invited" }, 403: { description: "Forbidden" } },
  tags: ["Tenants"]
});

registry.registerPath({
  method: "get",
  path: "/users",
  description: "Get all users in the tenant",
  security: [{ bearerAuth: [] }],
  responses: { 200: { description: "Users list" }, 403: { description: "Forbidden" } },
  tags: ["Users"]
});

registry.registerPath({
  method: "post",
  path: "/users",
  description: "Create a new user",
  security: [{ bearerAuth: [] }],
  request: { body: { required: true, content: { "application/json": { schema: createUserSchema } } } },
  responses: { 201: { description: "Created" }, 403: { description: "Forbidden" } },
  tags: ["Users"]
});

export function buildOpenApiSpec() {
  const generator = new OpenApiGeneratorV3(registry.definitions);
  const doc = generator.generateDocument({
    openapi: "3.0.3",
    info: { title: "SaaSeed API", version: "0.1.0" },
    servers: [{ url: "/api" }],
    security: [{ bearerAuth: [] }]
  }); // <-- cast yok

  (doc as any).components = {
    securitySchemes: {
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
    }
  };

  return doc;
}