"use client";
import { HistoryLogDashboard } from "@/dashboard/historyLog";
export default function HistoryLog() {
  const displayDashBoard = () => {
    return <HistoryLogDashboard />;
  };

  return <>{displayDashBoard()}</>;
}
