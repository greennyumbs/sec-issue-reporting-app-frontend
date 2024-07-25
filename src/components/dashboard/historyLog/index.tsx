import { Navbar } from "@/components/navbar";
import { IssueTable } from "@/components/IssueTable";

export const HistoryLogDashboard: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">History Log</h1>
      <IssueTable />
    </div>
  );
};
