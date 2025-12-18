import { clientApi } from "@/lib/axios/client";
import {
  EventStats,
  QRGenerateRequest,
  QRGenerateResponse,
  QRValidateRequest,
  QRValidationResult,
} from "./types";

export const QRClient = {
  /**
   * Generate QR code for a ticket
   */
  generateQR: async (payload: QRGenerateRequest) => {
    const api = await clientApi();
    const { data } = await api.post<QRGenerateResponse>("/qr/generate", payload);
    return data;
  },

  /**
   * Validate a QR code for check-in
   */
  validateQR: async (payload: QRValidateRequest) => {
    const api = await clientApi();
    const { data } = await api.post<QRValidationResult>("/qr/validate", payload);
    return data;
  },

  /**
   * Get event check-in statistics
   */
  getEventStats: async (eventId: string) => {
    const api = await clientApi();
    const { data } = await api.get<EventStats>(`/qr/event/${eventId}/stats`);
    return data;
  },
};
