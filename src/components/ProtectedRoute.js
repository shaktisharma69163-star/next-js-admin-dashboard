"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "../store/authStore";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { token, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return token ? children : null;
}