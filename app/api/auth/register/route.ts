import { RegisterRequest } from "@/modules/auth";
import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json();

    const resp = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      body,
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json({
      success: true,
      data: resp.data?.data,
      message: "Registro exitoso",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string; errors?: any }>;

    return NextResponse.json(
      {
        success: false,
        message: err.response?.data?.message || "Error en el registro",
        errors: err.response?.data?.errors || [],
      },
      { status: err.response?.status || 500 }
    );
  }
}
