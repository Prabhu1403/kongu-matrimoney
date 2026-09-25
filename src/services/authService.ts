import { apiFetch } from "@/lib/api";

export interface SendOtpPayload {
  phone?: string;
  email?: string;
  registerId?: string;
}

export interface VerifyOtpPayload {
  phone?: string;
  email?: string;
  otp: string;
  smsToken?: string;
}

export interface RegisterSendOtpPayload {
  name: string;
  phone: string;
  email?: string;
}

export const authService = {
  // Send login OTP (SMS or Email)
  async sendLoginOtp(payload: SendOtpPayload) {
    return apiFetch("/website/auth/login/send", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Verify login OTP
  async verifyLoginOtp(payload: VerifyOtpPayload) {
    return apiFetch("/website/auth/login/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Send registration OTP
  async sendRegisterOtp(payload: RegisterSendOtpPayload) {
    return apiFetch("/website/auth/register/otp/send", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },

  // Verify registration OTP
  async verifyRegisterOtp(payload: any) {
    return apiFetch("/website/auth/register/otp/verify", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
};
