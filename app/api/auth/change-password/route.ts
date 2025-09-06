import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/config";
import axios, { AxiosError } from "axios";

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const accessToken = (session as any)?.accessToken;

    if (!accessToken) {
      return NextResponse.json(
        { success: false, message: "No autorizado" },
        { status: 401 }
      );
    }

    const { currentPassword, newPassword } = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
    const resp = await axios.patch(
      `${apiUrl}/auth/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return NextResponse.json({
      success: true,
      message: resp.data?.message || "Contraseña cambiada correctamente",
    });
  } catch (error) {
    const err = error as AxiosError<{ message?: string; errors?: any[] }>;
    return NextResponse.json(
      {
        success: false,
        message:
          err.response?.data?.message || "Error al cambiar la contraseña",
        errors: err.response?.data?.errors || [],
      },
      { status: err.response?.status || 500 }
    );
  }
}
