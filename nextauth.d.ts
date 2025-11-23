// src/types/next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken?: string;
    user: {
      id: string;
      email: string;
      roles: string[];
      emailVerified: boolean;
      person: {
        firstName: string;
        lastName: string;
        phone?: string;
        fullName: string;
      };
      company?: {
        id: string;
        contactEmail?: string;
        contactPhone?: string;
        name: string;
      };
      accessToken?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email: string;
    roles: string[];
    emailVerified: boolean;
    person: {
      firstName: string;
      lastName: string;
      phone?: string;
      fullName: string;
    };
    company?: {
      id: string;
      contactEmail?: string;
      contactPhone?: string;
      name: string;
    };
    accessToken?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    roles: string[];
    companyId?: string;
    emailVerified: boolean;
    person: {
      firstName: string;
      lastName: string;
      phone?: string;
      fullName: string;
    };
    company?: {
      id: string;
      contactEmail?: string;
      contactPhone?: string;
      name: string;
    };
  }
}
