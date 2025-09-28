import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import axios, { AxiosError } from "axios";

interface ExtendedJWT extends JWT {
  role: string;
  companyId?: string;
  emailVerified: boolean;
  person: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  company?: {
    name: string;
    entityStatus: string;
  };
}

interface ExtendedSession extends Session {
  user: {
    id: string;
    email: string;
    role: string;
    companyId?: string;
    emailVerified: boolean;
    person: {
      firstName: string;
      lastName: string;
      phone?: string;
    };
    company?: {
      name: string;
      entityStatus: string;
    };
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
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
          const email = credentials.email.trim().toLowerCase();
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
            role: user.role,
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
        token.accessToken = u.accessToken;
        token.role = u.role;
        token.companyId = u.companyId;
        token.emailVerified = u.emailVerified;
        token.person = u.person;
        token.company = u.company;
      }

      return token as JWT;
    },

    async session({ session, token }) {
      (session as any).accessToken = (token as any).accessToken;

      if (session.user) {
        session.user = {
          ...session.user,
          id: token.sub ?? "",
          email: token.email ?? session.user.email,
          role: (token as any).role,
          companyId: (token as any).companyId,
          emailVerified: (token as any).emailVerified,
          person: (token as any).person,
          company: (token as any).company,
          accessToken: (token as any).accessToken,
        };
      }

      return session as ExtendedSession;
    },

    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  debug: process.env.NODE_ENV === "development",
};
