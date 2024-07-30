"use client";
import { ActiveIssuesDashboard } from "@/dashboard/activeIssues";
import { useUserStore } from "@/store/UserStore";
import React from "react";

export default function ActiveIssues() {
  const displayDashBoard = () => {
    return <ActiveIssuesDashboard />;
  };
  return <>{displayDashBoard()}</>;
}
