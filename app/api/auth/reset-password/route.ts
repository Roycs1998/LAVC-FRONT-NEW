import { NextRequest, NextResponse } from "next/server";
import axios, { AxiosError } from "axios";

export async function POST(request: NextRequest) {
  try {
    const { token, password } = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const resp = await axios.post(
      `${apiUrl}/auth/reset-password`,
      { token, password },
      { headers: { "Content-Type": "application/json" } }
    );

    return NextResponse.json({
      success: true,
      message: resp.data?.message || "Contraseña restablecida correctamente",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string; errors?: any[] }>;
    return NextResponse.json(
      {
        success: false,
        message:
          err.response?.data?.message || "Error al restablecer la contraseña",
        errors: err.response?.data?.errors || [],
      },
      { status: err.response?.status || 500 }
    );
  }
}
