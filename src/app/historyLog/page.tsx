"use client";
import { HistoryLogDashboard } from "@/dashboard/historyLog";
import { useUserStore } from "@/store/UserStore";
import { useRouter } from "next/navigation";
export default function HistoryLog() {
  const router = useRouter(); // Move useRouter here
  const { user } = useUserStore();

  const displayDashBoard = () => {
    if (user.role === "") {
      router.push("/"); // Now you can use the router within handleLogout
    }
    return <HistoryLogDashboard />;
  };

  return <>{displayDashBoard()}</>;
}
