"use client";
import { WorkListDashboard } from "@/components/dashboard/workList";
import React from "react";

export default function WorkList() {
  const displayDashBoard = () => {
    // if (
    //   role === UserRoles.ADMIN ||
    //   role === UserRoles.PLANNER ||
    //   role === UserRoles.OPERATOR_MANAGER
    // ) {
    return <WorkListDashboard />;
    // }
    // return <>{displayDashBoard()}</>;
  };

  return <>{displayDashBoard()}</>;
}
