import axios from "axios";
import { NextRequest } from "next/server";
import { getTokenFromRequest } from "./auth";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export function backendClient(req?: NextRequest) {
  const instance = axios.create({
    baseURL,
    timeout: 20_000,
  });

  instance.interceptors.request.use(async (config) => {
    const token = req ? await getTokenFromRequest(req) : null;

    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}
