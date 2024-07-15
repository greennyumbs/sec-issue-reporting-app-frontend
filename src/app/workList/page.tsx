"use client"; // Enable client components for SWR

import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useRouter } from "next/navigation";

import WorkCard from "@/components/Workcard";
import NewWorkItemForm from "@/components/NewWorkItemForm";
import Navbar from "@/components/Navbar";
import { WorkItem } from "../types";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const WorkListPage: React.FC = () => {
  const router = useRouter();
  // const {
  //   data: workItems,
  //   error,
  //   mutate,
  // } = useSWR<WorkItem[]>("/api/work", fetcher);
  const [filter, setFilter] = useState<
    "ALL" | "PENDING" | "IN PROGRESS" | "COMPLETED"
  >("ALL");
  const mockData: WorkItem[] = [
    {
      id: 1,
      machineId: "M12345",
      machineName: "Packaging Machine A",
      createdBy: { name: "Alice Johnson", position: "Employee" },
      issueDetailDescription:
        "Conveyor belt jammed, causing production delays.",
      status: "PENDING",
      createdTimestamp: "2023-11-25T10:30:00Z",
    },
    {
      id: 2,
      machineId: "M54321",
      machineName: "Labeling Machine B",
      createdBy: { name: "Bob Smith", position: "Employee" },
      issueDetailDescription: "Labels misaligned, need recalibration.",
      assignee: { name: "Eva Williams", id: 101 },
      status: "IN PROGRESS",
      createdTimestamp: "2023-11-24T14:15:00Z",
    },
    {
      id: 3,
      machineId: "M98765",
      machineName: "Filling Machine C",
      createdBy: { name: "Charlie Brown", position: "Technician" },
      issueDetailDescription: "Routine maintenance required.",
      fixDetailDescription: "Replaced worn-out gasket and refilled lubricant.",
      assignee: { name: "David Lee", id: 102 },
      status: "COMPLETED",
      createdTimestamp: "2023-11-20T09:45:00Z",
      completedTimestamp: "2023-11-22T16:00:00Z",
    },
    {
      id: 4,
      machineId: "M11111",
      machineName: "Sorting Machine D",
      createdBy: { name: "Emma Davis", position: "Employee" },
      issueDetailDescription: "Software error causing incorrect sorting.",
      status: "CANCELED",
      createdTimestamp: "2023-11-18T11:22:00Z",
    },
  ];

  // useEffect(() => {
  //   // const updateWorkItems = (updatedWorkItem: WorkItem) => {
  //   //   mutate((prevWorkItems) =>
  //   //     prevWorkItems?.map((item) =>
  //   //       item.id === updatedWorkItem.id ? updatedWorkItem : item
  //   //     )
  //   //   );
  //   // };

  //   // Subscribe to real-time updates (e.g., WebSockets, SSE)
  //   // ... and call updateWorkItems when a work item changes

  //   return () => {
  //     // Unsubscribe from real-time updates
  //   };
  // }, [mutate]);

  const handleNewWorkItem = async (newWorkItem: WorkItem) => {
    const response = await fetch("/api/work", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newWorkItem),
    });

    if (response.ok) {
      const createdWorkItem = await response.json();
      // mutate((prevWorkItems) => [createdWorkItem, ...(prevWorkItems || [])]);
    } else {
      // Handle error
    }
  };

  const handleDeleteWorkItem = async (workItemId: number) => {
    const response = await fetch(`/api/work/${workItemId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      // mutate((prevWorkItems) =>
      //   prevWorkItems?.filter((item) => item.id !== workItemId)
      // );
    } else {
      // Handle error
    }
  };

  const filteredWorkItems = mockData?.filter((item) =>
    filter === "ALL" ? true : item.status === filter
  );

  // if (error) return <div>Failed to load work items</div>;
  // if (!workItems) return <div>Loading work items...</div>;

  return (
    <div className="container mx-auto p-4 ">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Work List</h1>

      {/* Optional Filter Component */}
      {/* <WorkFilter filter={filter} setFilter={setFilter} /> */}

      <NewWorkItemForm onNewWorkItem={handleNewWorkItem} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredWorkItems?.map((workItem) => (
          <WorkCard
            key={workItem.id}
            workItem={workItem}
            onDelete={handleDeleteWorkItem}
          />
        ))}
      </div>
    </div>
  );
};

export default WorkListPage;
