"use client";
import { ActiveIssuesDashboard } from "@/dashboard/activeIssues";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation"; // Import useRouter from next/navigation
import React from "react";

export default function ActiveIssues() {
  const router = useRouter(); // Move useRouter here
  const { user } = useUserStore();

  const displayDashBoard = () => {
    if (user.role === "") {
      router.push("/"); // Now you can use the router within handleLogout
    }
    return <ActiveIssuesDashboard />;
  };
  return <>{displayDashBoard()}</>;
}
