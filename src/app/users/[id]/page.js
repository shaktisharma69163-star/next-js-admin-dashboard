"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Typography,
  Button,
  Paper,
} from "@mui/material";

export default function UserDetails() {
  const { id } = useParams();   // ✅ correct way
  const router = useRouter();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch(`https://dummyjson.com/users/${id}`);
      const data = await res.json();
      setUser(data);
    };

    fetchUser();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          {user.firstName} {user.lastName}
        </Typography>

        <Typography>Email: {user.email}</Typography>
        <Typography>Phone: {user.phone}</Typography>
        <Typography>Gender: {user.gender}</Typography>
        <Typography>Company: {user.company?.name}</Typography>
      </Paper>

      <Button
        sx={{ mt: 2 }}
        variant="contained"
        onClick={() => router.back()}
      >
        Back
      </Button>
    </Container>
  );
}