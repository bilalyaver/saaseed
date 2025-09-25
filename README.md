# SaaSeed · Node.js SaaS Boilerplate

SaaSeed is a **Node.js (Express + TypeScript + MongoDB + Zod + Swagger)** boilerplate,  
built to quickly bootstrap multi-tenant SaaS applications.  
It now also includes an **Admin UI** (Next.js + Tailwind + shadcn/ui) under `apps/admin`.

## 🚀 Features
- 🪪 **Authentication**: JWT + Refresh (argon2)
- 🧑‍🤝‍🧑 **Multi-tenancy**: tenantId, owner/admin/member RBAC
- 📜 **Validation** with Zod
- 📖 **Swagger UI** generated via zod-openapi
- 🪵 **Pino** structured logging
- 🗄️ **MongoDB** integration with Mongoose
- 🧪 Ready-to-use testing setup (Vitest + Supertest)
- 🖥️ **Admin UI**: Next.js + TailwindCSS + shadcn/ui (under `apps/admin`)

## 🔧 Quick Start
```bash
git clone https://github.com/bilalyaver/saaseed.git saaseed
cd saaseed
npm install
cp .env.example .env
npm run dev
# API available at: http://localhost:3000
# Admin UI available at: http://localhost:3000 (Next.js app)
# Swagger available at: http://localhost:3000/api/docs
```

## 📦 Scripts
```bash
npm run dev:api    # Run API only
npm run dev:admin  # Run Admin UI only
npm run dev        # Run both API + Admin UI concurrently
npm run build      # Build API (tsc + tsc-alias)
npm start          # Run compiled API (dist/server.js)
npm test           # Run tests with Vitest
```

## 📂 Project Structure
- `src/core`: config, logger, error handling, db, middlewares (auth/tenant/rbac)
- `src/modules`: core modules (`auth`, `tenants`, `users`)
- `src/docs`: Swagger generation with zod-openapi
- `apps/admin`: Admin UI (Next.js + Tailwind + shadcn/ui)

## 🛣 Roadmap
- [x] Auth + Tenant + RBAC
- [x] Swagger + Zod integration
- [x] Admin UI (Next.js base + shadcn/ui)
- [ ] File upload (Multer, 5MB limit)
- [ ] Mailer (MailHog for dev, provider for prod)
- [ ] Queue support (BullMQ) + cron jobs
- [ ] Optional billing (Stripe / iyzico integration)
- [ ] CLI (`npx create-saaseed`)

## 🤝 Contributing
Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on the process.  
See [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md) for behavior guidelines.

## 📄 License
[MIT](./LICENSE)