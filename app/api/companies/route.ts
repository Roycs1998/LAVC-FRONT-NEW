import { NextRequest } from "next/server";
import { errorResponse } from "@/app/api/_core/errors";
import { created, ok } from "@/app/api/_core/response";
import { toQueryString } from "@/app/api/_core/qs";
import { backendClient } from "@/app/api/_core/backend";

export async function GET(req: NextRequest) {
  try {
    const client = backendClient(req);

    console.log(req.url, "REQ.URL");

    const url = new URL(req.url);
    const qp = Object.fromEntries(url.searchParams.entries());

    const qs = toQueryString(qp);

    console.log(`/companies${qs}`, "USRL");

    const { data } = await client.get(`/companies${qs}`);

    return ok(data);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const client = backendClient(req);
    const { data } = await client.post(`/companies`, body);
    return created(data);
  } catch (err) {
    return errorResponse(err);
  }
}
