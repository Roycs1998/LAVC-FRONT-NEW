import { clientApi } from "@/lib/axios/client";
import { StaffRolesResponse, User } from "./types";

export const UserClient = {
  /**
   * Get current user profile
   */
  getMe: async () => {
    const api = await clientApi();
    const { data } = await api.get<User>("/users/me");
    return data;
  },

  /**
   * Get staff roles for current user
   * Returns operational staff and sponsor staff roles
   */
  getStaffRoles: async () => {
    const api = await clientApi();
    const { data } = await api.get<StaffRolesResponse>("/users/me/staff-roles");
    return data;
  },
};
