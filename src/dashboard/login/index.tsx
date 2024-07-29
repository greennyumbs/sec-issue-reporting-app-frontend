"use client";
import React, { useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Alert,
  Box,
  Button,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/navbar";
import { useUserStore } from "@/store/UserStore";

export const LoginDashboard: React.FC = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const { assignRole } = useUserStore();

  const handleRoleClick = (selectedRole: string) => {
    assignRole(selectedRole);
    setError(""); // Clear any previous errors
    router.push("/activeIssues");
  };

  return (
    <>
      <Navbar />
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            {t("select_role")}
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2, display: "flex", gap: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={() => handleRoleClick("EMPLOYEE")}
            >
              {t("employee")}
            </Button>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              onClick={() => handleRoleClick("TECHNICIAN")}
            >
              {t("technician")}
            </Button>
          </Box>
        </Paper>
      </Container>
    </>
  );
};
