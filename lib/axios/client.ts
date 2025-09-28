"use client";

import axios, { AxiosInstance } from "axios";
import { getSession } from "next-auth/react";

export async function clientApi(): Promise<AxiosInstance> {
  const session = await getSession();
  const token = (session as any)?.accessToken as string | undefined;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return instance;
}
