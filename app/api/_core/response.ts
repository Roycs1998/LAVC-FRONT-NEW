import { NextResponse } from "next/server";

export const ok = <T>(data: T, init?: ResponseInit) =>
  NextResponse.json(data, { status: 200, ...init });

export const created = <T>(data: T, init?: ResponseInit) =>
  NextResponse.json(data, { status: 201, ...init });

export const noContent = (init?: ResponseInit) =>
  new NextResponse(null, { status: 204, ...init });

export const badRequest = (message = "Bad Request", init?: ResponseInit) =>
  NextResponse.json({ message }, { status: 400, ...init });

export const unauthorized = (message = "Unauthorized", init?: ResponseInit) =>
  NextResponse.json({ message }, { status: 401, ...init });

export const forbidden = (message = "Forbidden", init?: ResponseInit) =>
  NextResponse.json({ message }, { status: 403, ...init });

export const notFound = (message = "Not Found", init?: ResponseInit) =>
  NextResponse.json({ message }, { status: 404, ...init });
