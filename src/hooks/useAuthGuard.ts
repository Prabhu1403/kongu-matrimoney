"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * useAuthGuard — call this at the top of every protected page.
 *
 * What it does:
 *  1. On mount: checks sessionStorage for authToken. If missing → replace to /login.
 *  2. On every browser popstate (back / forward button): re-checks the token.
 *     If the user logged out and tries to go back, they get sent to /login immediately.
 */
export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    function checkToken() {
      const token = sessionStorage.getItem("authToken");
      if (!token) {
        // replace = removes this page from history stack, so back button cannot return here
        router.replace("/login");
      }
    }

    // 1. Check immediately on page load / navigation
    checkToken();

    // 2. Check whenever user presses back / forward button
    window.addEventListener("popstate", checkToken);

    return () => {
      window.removeEventListener("popstate", checkToken);
    };
  }, [router]);
}
