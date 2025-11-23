import axios from "axios";
import { auth } from "../auth/config";

export async function serverApi() {
  const session = await auth();

  const token = session?.accessToken;

  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  return instance;
}
