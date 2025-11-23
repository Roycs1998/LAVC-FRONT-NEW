import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import axios, { AxiosError } from "axios";

interface ExtendedSession extends Session {
  user: {
    id: string;
    email: string;
    roles: string[];
    emailVerified: boolean;
    person: {
      firstName: string;
      lastName: string;
      fullName: string;
      phone?: string;
    };
    company?: {
      id: string;
      contactEmail?: string;
      contactPhone?: string;
      name: string;
    };
  };
}

export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email y contraseña son requeridos");
        }

        try {
          const email = credentials.email;
          const apiUrl = process.env.NEXT_PUBLIC_API_URL;
          if (!apiUrl) throw new Error("API URL no configurada");

          const resp = await axios.post(
            `${apiUrl}/auth/login`,
            { email, password: credentials.password },
            { headers: { "Content-Type": "application/json" } }
          );

          const payload = resp.data?.data ?? resp.data;
          const { user, access_token } = payload || {};

          if (!user || !access_token) {
            throw new Error("Respuesta de login inválida");
          }

          return {
            id: user.id,
            email: user.email,
            roles: user.roles,
            companyId: user.companyId,
            emailVerified: user.emailVerified,
            person: user.person,
            company: user.company,
            accessToken: access_token,
          };
        } catch (error) {
          if (axios.isAxiosError(error)) {
            const err = error as AxiosError<{ message?: string }>;
            const msg =
              err.response?.data?.message ||
              (err.response?.status === 401
                ? "Credenciales inválidas"
                : "Error de autenticación");
            throw new Error(msg);
          }
          throw new Error(
            error instanceof Error ? error.message : "Error de autenticación"
          );
        }
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  jwt: {
    maxAge: 24 * 60 * 60,
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.sub = u.id;
        token.email = u.email;
        token.accessToken = u.accessToken;
        token.roles = u.roles;
        token.emailVerified = u.emailVerified;
        token.person = u.person;
        token.company = u.company;
      }
      return token as JWT;
    },

    async session({ session, token }) {
      const email = token.email ?? session.user?.email ?? null;

      session.user = {
        id: (token.sub as string) ?? "",
        email: email!,
        roles: (token as any).roles ?? [],
        emailVerified: (token as any).emailVerified ?? false,
        person: (token as any).person ?? {},
        company: (token as any).company ?? {},
        accessToken: (token as any).accessToken ?? "",
      };

      // También exponer el token directamente si lo necesitas
      (session as any).accessToken = (token as any).accessToken;

      return session as ExtendedSession;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
    authorized({ auth, request: { nextUrl } }) {
      const user = auth?.user;
      const isLoggedIn = Boolean(user);
      const pathname = nextUrl.pathname;

      const protectedRoutes = ["/dashboard"];

      const authRoutes = [
        "/login",
        "/register",
        "/change-password",
        "/forget-password",
        "/resend-verification",
        "/resend-password",
        "/verify-email",
      ];

      const isProtectedRoute = protectedRoutes.some((route) =>
        pathname.includes(route)
      );

      const isAuthRoute = authRoutes.some((route) => pathname.includes(route));

      if (isProtectedRoute && !isLoggedIn) {
        const loginUrl = new URL("/login", nextUrl);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return Response.redirect(loginUrl);
      }

      if (isAuthRoute && isLoggedIn) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }

      return true;
    },
  },
  debug: process.env.NODE_ENV === "development",
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
