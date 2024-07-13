import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { WorkItem } from "../types";

interface WorkCardProps {
  workItem: WorkItem;
  onDelete: (workItemId: number) => Promise<void>; // Assuming an async delete function
}

const WorkCard: React.FC<WorkCardProps> = ({ workItem, onDelete }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(workItem.id);
    setIsDeleting(false);
    router.refresh();
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString(); // Adjust formatting as needed
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold mb-2">{workItem.machineName}</h3>
          <p className="text-gray-600 text-sm">#{workItem.machineId}</p>
          {/* Add any other relevant machine details */}
        </div>
        <span
          className={`px-2 py-1 rounded-full text-xs font-semibold ${
            workItem.status === "PENDING"
              ? "bg-yellow-200 text-yellow-800"
              : workItem.status === "IN PROGRESS"
              ? "bg-blue-200 text-blue-800"
              : workItem.status === "COMPLETED"
              ? "bg-green-200 text-green-800"
              : "bg-red-200 text-red-800"
          }`}
        >
          {workItem.status}
        </span>
      </div>

      <p className="text-gray-700 mt-2">{workItem.issueDetailDescription}</p>

      {workItem.fixDetailDescription && (
        <div className="mt-2">
          <h4 className="text-sm font-semibold">Fix Details:</h4>
          <p className="text-gray-600">{workItem.fixDetailDescription}</p>
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="text-gray-500 text-xs mr-2">
            Created by: {workItem.createdBy.name} ({workItem.createdBy.position}
            )
          </span>
          <span className="text-gray-500 text-xs">
            {formatTimestamp(workItem.createdTimestamp)}
          </span>
        </div>
        {/* ... assignee details (if applicable) ... */}
        <button
          className={`text-red-500 hover:text-red-700 ${
            isDeleting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
};

export default WorkCard;
