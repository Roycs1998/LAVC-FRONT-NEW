import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const resp = await axios.post(
      `${apiUrl}/auth/forgot-password`,
      { email },
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json({
      success: true,
      message: resp.data?.message || "Email enviado correctamente",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string; errors?: any[] }>;
    return NextResponse.json(
      {
        success: false,
        message: err.response?.data?.message || "Error al enviar el email",
        errors: err.response?.data?.errors || [],
      },
      { status: err.response?.status || 500 }
    );
  }
}
