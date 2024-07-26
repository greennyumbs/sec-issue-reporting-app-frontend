"use client"; // Enable client components for SWR
import { HistoryLogDashboard } from "@/components/pages/historyLog";
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
