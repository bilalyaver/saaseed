// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session {
    accessToken?: string
    expires?: string
    role: string
    tenantId?: string
    user?: {
      email?: string | null
    } & DefaultSession["user"]
    userId?: string
  }

  interface User extends DefaultUser {
    email: string
  }
}