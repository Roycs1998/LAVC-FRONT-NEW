import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token requerido" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const resp = await axios.get(`${apiUrl}/auth/verify-email`, {
      params: { token },
      headers: { "Content-Type": "application/json" },
    });

    return NextResponse.json({
      success: true,
      message: resp.data?.message || "Email verificado correctamente",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string }>;
    return NextResponse.json(
      {
        success: false,
        message: err.response?.data?.message || "Error al verificar el email",
      },
      { status: err.response?.status || 500 }
    );
  }
}
