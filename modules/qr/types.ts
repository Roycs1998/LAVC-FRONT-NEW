export interface QRGenerateRequest {
  ticketId: string;
}

export interface QRGenerateResponse {
  qrCode: string; // base64 image
  ticketNumber: string;
}

export interface QRValidateRequest {
  qrCode: string;
  eventId: string;
}

export interface QRValidationResult {
  success: boolean;
  message: string;
  ticket?: {
    ticketNumber: string;
    attendee: {
      firstName: string;
      lastName: string;
    };
    ticketType: string;
  };
  validatedAt?: string;
}

export interface EventStats {
  totalTickets: number;
  checkedIn: number;
  pending: number;
  checkInRate: number;
  byTicketType: Array<{
    name: string;
    total: number;
    checkedIn: number;
  }>;
  byHour: Array<{
    hour: string;
    count: number;
  }>;
}
