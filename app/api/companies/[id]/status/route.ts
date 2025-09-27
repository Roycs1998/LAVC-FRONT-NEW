import { NextRequest } from "next/server";
import { backendClient } from "@/app/api/_core/backend";
import { errorResponse } from "@/app/api/_core/errors";
import { ok } from "@/app/api/_core/response";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const client = backendClient(req);
    const { data } = await client.patch(`/companies/${params.id}/status`, body);
    return ok(data);
  } catch (err) {
    return errorResponse(err);
  }
}
