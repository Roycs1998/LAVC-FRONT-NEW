import { AxiosError } from "axios";
import { NextResponse } from "next/server";

type NormalizedError = {
  status: number;
  message: string;
  details?: unknown;
};

export function normalizeAxiosError(err: unknown): NormalizedError {
  const ax = err as AxiosError<any>;
  if (ax?.isAxiosError) {
    const status = ax.response?.status ?? 500;
    const data = ax.response?.data;
    const message =
      (typeof data === "object" && data?.message) ||
      (typeof data === "string" && data) ||
      ax.message ||
      "Unexpected error";
    return { status, message, details: data };
  }
  return { status: 500, message: "Unexpected error" };
}

export function errorResponse(err: unknown) {
  const n = normalizeAxiosError(err);
  return NextResponse.json(
    { message: n.message, details: n.details ?? null },
    { status: n.status }
  );
}
