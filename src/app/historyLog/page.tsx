"use client"; // Enable client components for SWR
import { WorkItem } from "@/app/types";
import { Navbar } from "@/components/navbar";
import { HistoryLogDashboard } from "@/components/dashboard/historyLog";
export default function HistoryLog() {
  const displayDashBoard = () => {
    // if (
    //   role === UserRoles.ADMIN ||
    //   role === UserRoles.PLANNER ||
    //   role === UserRoles.OPERATOR_MANAGER
    // ) {
    return <HistoryLogDashboard />;
    // }
    // return <>{displayDashBoard()}</>;
  };

  return <>{displayDashBoard()}</>;
}
