"use client";

import {
  Container,
  Typography,
  Button,
  Box,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../store/authStore";

export default function Dashboard() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>

      <Box sx={{ mb: 3 }}>
        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => router.push("/users")}
        >
          Users
        </Button>

        <Button
          variant="contained"
          sx={{ mr: 2 }}
          onClick={() => router.push("/products")}
        >
          Products
        </Button>

        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            logout();
            router.push("/login");
          }}
        >
          Logout
        </Button>
      </Box>
    </Container>
  );
}