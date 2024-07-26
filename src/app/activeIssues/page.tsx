"use client";
import { ActiveIssuesDashboard } from "@/components/pages/ActiveIssues";
import React from "react";

export default function WorkList() {
  const displayDashBoard = () => {
    // if (
    //   role === UserRoles.ADMIN ||
    //   role === UserRoles.PLANNER ||
    //   role === UserRoles.OPERATOR_MANAGER
    // ) {
    return <ActiveIssuesDashboard />;
    // }
    // return <>{displayDashBoard()}</>;
  };

  return <>{displayDashBoard()}</>;
}
