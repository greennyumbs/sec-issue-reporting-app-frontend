"use client"; // Enable client components for SWR
import WorkCard from "@/app/components/Workcard";
import { WorkItem } from "@/app/types";
import React from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const HistoryLog: React.FC = () => {
  const { data: workItems, error } = useSWR<WorkItem[]>(
    "/api/work/history",
    fetcher
  );

  if (error) return <div>Failed to load history</div>;
  if (!workItems) return <div>Loading history...</div>;

  const handleDelete = async (workItemId: number) => {};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">History Log</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workItems.map((workItem) => (
          <WorkCard
            key={workItem.id}
            workItem={workItem}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default HistoryLog;
