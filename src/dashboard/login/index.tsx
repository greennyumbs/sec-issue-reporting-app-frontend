"use client";

import React from "react";
import { Box, Container, Paper, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Navbar } from "@/components/navbar";
import { RoleButtons } from "@/components/roleButtons";

export const LoginDashboard: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();

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
          <Box sx={{ mt: 2 }}>
            <RoleButtons onClick={() => router.push("/activeIssues")} />
          </Box>
        </Paper>
      </Container>
    </>
  );
};
