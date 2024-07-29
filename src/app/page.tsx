"use client";
import { LoginDashboard } from "@/dashboard/login";
import React from "react";

export default function LoginPage() {
  const displayDashBoard = () => {
    return <LoginDashboard />;
  };
  return <>{displayDashBoard()}</>;
}
