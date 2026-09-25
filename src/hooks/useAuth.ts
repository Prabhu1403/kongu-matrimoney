"use client";

import { useState } from "react";
import { authService, SendOtpPayload, VerifyOtpPayload, RegisterSendOtpPayload } from "@/services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendLoginOtp = async (payload: SendOtpPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.sendLoginOtp(payload);
      return res;
    } catch (err: any) {
      const msg = err.message || "Failed to send OTP";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyLoginOtp = async (payload: VerifyOtpPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.verifyLoginOtp(payload);
      return res;
    } catch (err: any) {
      const msg = err.message || "Failed to verify OTP";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const sendRegisterOtp = async (payload: RegisterSendOtpPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.sendRegisterOtp(payload);
      return res;
    } catch (err: any) {
      const msg = err.message || "Registration OTP request failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyRegisterOtp = async (payload: any) => {
    setLoading(true);
    setError(null);
    try {
      const res = await authService.verifyRegisterOtp(payload);
      return res;
    } catch (err: any) {
      const msg = err.message || "Registration verification failed";
      setError(msg);
      throw new Error(msg);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    sendLoginOtp,
    verifyLoginOtp,
    sendRegisterOtp,
    verifyRegisterOtp,
  };
}
