# SaaSeed · Node.js SaaS Boilerplate

SaaSeed is a **Node.js (Express + TypeScript + MongoDB + Zod + Swagger)** boilerplate,  
built to quickly bootstrap multi-tenant SaaS applications.

## 🚀 Features
- 🪪 **Authentication**: JWT + Refresh (argon2)
- 🧑‍🤝‍🧑 **Multi-tenancy**: tenantId, owner/admin/member RBAC
- 📜 **Validation** with Zod
- 📖 **Swagger UI** generated via zod-openapi
- 🪵 **Pino** structured logging
- 🗄️ **MongoDB** integration with Mongoose
- 🧪 Ready-to-use testing setup (Vitest + Supertest)

## 🔧 Quick Start
```bash
git clone https://github.com/bilalyaver/saaseed.git saaseed
cd saaseed
npm install
cp .env.example .env
npm run dev
# Swagger available at: http://localhost:3000/api/docs
```

## 📦 Scripts
```bash
npm run dev     # ts-node-dev + tsconfig-paths
npm run build   # tsc + tsc-alias
npm start       # runs dist/server.js
npm test        # vitest
```

## 📂 Project Structure
- `src/core`: config, logger, error handling, db, middlewares (auth/tenant/rbac)
- `src/modules`: core modules (`auth`, `tenants`, `users`)
- `src/docs`: Swagger generation with zod-openapi

## 🛣 Roadmap
- [x] Auth + Tenant + RBAC
- [x] Swagger + Zod integration
- [o] File upload (Multer, 5MB limit)
- [ ] Mailer (MailHog for dev, provider for prod)
- [ ] Queue support (BullMQ) + cron jobs
- [ ] Optional billing (Stripe / iyzico integration)
- [ ] CLI (`npx create-saaseed`)

## 🤝 Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on the process.  
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for behavior guidelines.

## 📄 License
[MIT](./LICENSE)