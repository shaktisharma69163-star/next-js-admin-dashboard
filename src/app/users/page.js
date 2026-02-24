"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Button,
  Box,
} from "@mui/material";
import Link from "next/link";
import useUserStore from "../store/userStore";

export default function Users() {
  const { users, fetchUsers, skip } = useUserStore();

  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchUsers(0);
  }, []);

  const handleSearch = () => {
    fetchUsers(0, search);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const sortedUsers = useMemo(() => {
    if (!sortField) return users;

    return [...users].sort((a, b) => {
      let valueA =
        sortField === "company"
          ? a.company?.name
          : a[sortField];

      let valueB =
        sortField === "company"
          ? b.company?.name
          : b[sortField];

      valueA = valueA || "";
      valueB = valueB || "";

      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }, [users, sortField, sortOrder]);

  return (
    <Container sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        Users
      </Typography>

      {/* 🔎 SEARCH SECTION */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 4,
          p: 3,
          backgroundColor: "#1e1e1e",
          borderRadius: 2,
        }}
      >
        <TextField
          fullWidth
          label="Search Users"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputLabelProps={{
            style: { color: "#bbb" },
          }}
          InputProps={{
            style: { color: "#fff" },
          }}
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#555",
              },
              "&:hover fieldset": {
                borderColor: "#90caf9",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1976d2",
              },
            },
          }}
        />

        <Button
          variant="contained"
          size="large"
          sx={{
            height: "56px",
            fontWeight: "bold",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>

      {/* 📊 TABLE */}
      <Paper
        sx={{
          backgroundColor: "#1e1e1e",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("firstName")}
                sx={{ cursor: "pointer", color: "#fff" }}
              >
                Name
              </TableCell>

              <TableCell
                onClick={() => handleSort("email")}
                sx={{ cursor: "pointer", color: "#fff" }}
              >
                Email
              </TableCell>

              <TableCell
                onClick={() => handleSort("gender")}
                sx={{ cursor: "pointer", color: "#fff" }}
              >
                Gender
              </TableCell>

              <TableCell sx={{ color: "#fff" }}>
                Phone
              </TableCell>

              <TableCell
                onClick={() => handleSort("company")}
                sx={{ cursor: "pointer", color: "#fff" }}
              >
                Company
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sortedUsers.map((user) => (
              <TableRow
                key={user.id}
                sx={{
                  "&:hover": {
                    backgroundColor: "#2c2c2c",
                  },
                }}
              >
                <TableCell>
                  <Link
                    href={`/users/${user.id}`}
                    style={{
                      color: "#90caf9",
                      textDecoration: "none",
                    }}
                  >
                    {user.firstName}
                  </Link>
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {user.email}
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {user.gender}
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {user.phone}
                </TableCell>

                <TableCell sx={{ color: "#ddd" }}>
                  {user.company?.name}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Pagination */}
        <Box sx={{ p: 3 }}>
          <Button
            onClick={() => fetchUsers(skip - 10)}
            disabled={skip === 0}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Prev
          </Button>

          <Button
            onClick={() => fetchUsers(skip + 10)}
            variant="outlined"
          >
            Next
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}