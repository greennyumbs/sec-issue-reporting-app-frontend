import React from "react";
import { WorkItem } from "@/app/types";

interface WorkTableProps {
  workItems: WorkItem[];
  onEdit?: (workItem: WorkItem) => void;
  onConfirmDelete?: (workItem: WorkItem) => void;
}

export const WorkTable: React.FC<WorkTableProps> = ({
  workItems,
  onEdit,
  onConfirmDelete,
}) => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  return (
    <div className="overflow-scroll">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Machine
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created By
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Issue Details
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Fix Details
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Assignee
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Completed
            </th>
            <th scope="col" className="relative px-6 py-3 text-gray-500 ">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {workItems.map((workItem) => (
            <tr key={workItem.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {workItem.machineName}
                    </div>
                    <div className="text-sm text-gray-500">
                      #{workItem.machineId}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <p>{workItem.creatorName}</p>
                <p>({workItem.creatorPosition})</p>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {workItem.issueDetailDescription}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {workItem.fixDetailDescription || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                {workItem.assigneeName || "Unassigned"}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    workItem.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : workItem.status === "IN PROGRESS"
                      ? "bg-blue-100 text-blue-800"
                      : workItem.status === "COMPLETED"
                      ? "bg-green-100 text-green-800"
                      : workItem.status === "CANCELED"
                      ? "bg-red-100 text-red-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {workItem.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatTimestamp(workItem.createdTimestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {formatTimestamp(workItem.completedTimestamp)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                {onEdit && (
                  <button
                    onClick={() => onEdit(workItem)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                  >
                    Edit
                  </button>
                )}
                {onConfirmDelete && (
                  <button
                    onClick={() => onConfirmDelete(workItem)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
