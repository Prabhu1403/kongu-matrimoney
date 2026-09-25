"use client";

import { useState, useEffect, useCallback } from "react";
import { profileService, UserProfile } from "@/services/profileService";

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = useCallback(async () => {
    // Only fetch if a token exists in sessionStorage
    if (typeof window === "undefined") return;
    const token = sessionStorage.getItem("authToken");
    if (!token) return;

    setLoading(true);
    setError(null);
    try {
      const res = await profileService.getMyProfile();
      if (res.success) {
        setProfile(res.data);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userId");
    }
    setProfile(null);
    window.location.replace("/login");
  }, []);

  const isLoggedIn =
    typeof window !== "undefined"
      ? !!sessionStorage.getItem("authToken")
      : false;

  return { profile, loading, error, logout, fetchProfile, isLoggedIn };
}
