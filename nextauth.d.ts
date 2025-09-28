// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
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
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
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
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
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
}
