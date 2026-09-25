"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * useGuestGuard — call this at the top of guest-only pages like login/register.
 *
 * What it does:
 *  1. On mount: checks sessionStorage for authToken. If present → replace to /home.
 *  2. On every browser popstate (back / forward button): re-checks the token.
 *     If the user logged in and tries to go back to login, they stay in /home.
 */
export function useGuestGuard() {
  const router = useRouter();

  useEffect(() => {
    function checkToken() {
      const token = sessionStorage.getItem("authToken");
      if (token) {
        // replace = removes this page from history stack
        router.replace("/home");
      }
    }

    // 1. Check immediately
    checkToken();

    // 2. Check whenever user presses back / forward button
    window.addEventListener("popstate", checkToken);

    return () => {
      window.removeEventListener("popstate", checkToken);
    };
  }, [router]);
}
