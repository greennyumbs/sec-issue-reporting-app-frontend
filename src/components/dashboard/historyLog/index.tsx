import { WorkItem } from "@/app/types";
import { Navbar } from "@/components/navbar";
import { WorkTable } from "@/components/workTable";
import { mockWork } from "@/store/mock";
import { useState } from "react";

export const HistoryLogDashboard: React.FC = () => {
  const [workItems, setWorkItems] = useState<WorkItem[]>(mockWork);
  return (
    <div className="container mx-auto p-4">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">History Log</h1>
      <WorkTable workItems={workItems} />
    </div>
  );
};
