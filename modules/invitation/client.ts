import { clientApi } from "@/lib/axios/client";
import {
  InvitationValidationResponse,
  InvitationAcceptResponse,
} from "./types";

export const InvitationClient = {
  /**
   * Validate an invitation code
   */
  validate: async (code: string) => {
    const api = await clientApi();
    const { data } = await api.get<InvitationValidationResponse>(
      `/invitations/${code}/validate`
    );
    return data;
  },

  /**
   * Accept an invitation (for authenticated users)
   */
  accept: async (code: string) => {
    const api = await clientApi();
    const { data } = await api.post<InvitationAcceptResponse>(
      `/invitations/${code}/accept`
    );
    return data;
  },

  /**
   * Accept an invitation with registration (for new users)
   */
  acceptWithRegistration: async (
    code: string,
    userData: {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      phone?: string;
      dateOfBirth?: string;
    }
  ) => {
    const api = await clientApi();
    const { data } = await api.post<InvitationAcceptResponse>(
      `/invitations/${code}/accept`,
      userData
    );
    return data;
  },
};
