import { NextRequest } from "next/server";
import { backendClient } from "@/app/api/_core/backend";
import { errorResponse } from "@/app/api/_core/errors";
import { ok, noContent } from "@/app/api/_core/response";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = backendClient(_req);
    const { data } = await client.get(`/companies/${params.id}`);
    return ok(data);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const client = backendClient(req);
    const { data } = await client.patch(`/companies/${params.id}`, body);
    return ok(data);
  } catch (err) {
    return errorResponse(err);
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const client = backendClient(req);
    await client.delete(`/companies/${params.id}`);
    return noContent();
  } catch (err) {
    return errorResponse(err);
  }
}
