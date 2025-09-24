# Contributing to SaaSeed

First off, thank you for taking the time to contribute! 🚀

This document explains how to set up the project locally and how to make contributions in a consistent way.

## 🛠 Getting Started
1. **Fork** the repository
2. **Clone** your fork:
   ```bash
   git clone https://github.com/<your-username>/saaseed.git
   cd saaseed
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a new branch:
   ```bash
   git checkout -b feat/your-feature
   ```

## 📐 Coding Guidelines
- Use **TypeScript** (strict mode).
- Always validate inputs with **Zod**.
- Follow the structure: **Controller → Service → (Provider)**.
- Keep logs structured with **Pino**.

## ✅ Testing
- Run all tests before opening a PR:
  ```bash
  npm test
  ```
- Write tests for new features or bug fixes (Vitest + Supertest).

## 📦 Commit Message Format
We follow **Conventional Commits**:
- `feat: add tenant invite endpoint`
- `fix: refresh token validation`
- `docs: update README`
- `test: add user service tests`
- `chore: update dependencies`

## 🔀 Pull Requests
- Provide a clear description: *what*, *why*, *how*.
- Reference related issues: `Closes #123`.
- Ensure CI checks pass.

---

Thanks again for contributing! 🎉  
Your help makes SaaSeed better for everyone.