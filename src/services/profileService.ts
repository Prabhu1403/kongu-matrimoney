import { apiFetch } from "@/lib/api";

export interface UserProfile {
  registerId: string;
  name: string;
  phone?: string;
  email?: string;
  education?: string;
  qualification?: string;
  occupation?: string;
  gender?: string;
  dob?: string;
  profilePhotoUrl?: string;
}

export const profileService = {
  /** GET /website/me/profile — fetch my profile (requires auth token) */
  async getMyProfile(): Promise<{ success: boolean; data: UserProfile; message: string }> {
    return apiFetch("/website/me/profile", { method: "GET" });
  },
};
