import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "SaaSeed",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
          {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              email: creds.email,
              password: creds.password,
            }),
          }
        );


        if (!res.ok) return null;
        const data = await res.json(); // { accessToken, refreshToken, user? }

        // JWT payload'ı decode edip role/tenantId çekelim (imza doğrulaması backend'de)
        try {
          const payload = JSON.parse(
            Buffer.from(data.accessToken.split(".")[1], "base64url").toString(
              "utf8"
            )
          );
          interface AuthUser {
            id: string;
            email: string;
            role: string;
            tenantId: string;
            accessToken: string;
            refreshToken: string;
          }
          const user: AuthUser = {
            id: payload.sub,
            email: creds.email,
            role: payload.role,
            tenantId: payload.tenantId,
            accessToken: data.accessToken,
            refreshToken: data.refreshToken,
          };
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // login anında user bilgilerini token'a koy
      interface AuthUser {
        id: string;
        email: string;
        role: string;
        tenantId: string;
        accessToken: string;
        refreshToken: string;
      }
      if (user) {
        const authUser = user as AuthUser;
        token.userId = authUser.id;
        token.role = authUser.role;
        token.tenantId = authUser.tenantId;
        token.accessToken = authUser.accessToken;
        token.refreshToken = authUser.refreshToken;
      }
      return token;
    },
    async session({ session, token }) {
      // session.user alanlarına yansıt
      type CustomSession = typeof session & {
        userId?: string;
        role?: string;
        tenantId?: string;
        accessToken?: string;
      };
      const customSession = session as CustomSession;
      customSession.userId = token.userId as string | undefined;
      customSession.role = token.role as string | undefined;
      customSession.tenantId = token.tenantId as string | undefined;
      customSession.accessToken = token.accessToken as string | undefined; // API çağrılarında kullanacağız
      return customSession;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST, authOptions };

export default handler;