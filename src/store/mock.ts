import { WorkItem } from "../app/types";

export const mockWork: WorkItem[] = [
  {
    id: 1,
    machineId: "M12345",
    machineName: "Packaging Machine A",
    createdBy: { name: "Alice Johnson", position: "Employee" },
    issueDetailDescription: "Conveyor belt jammed, causing production delays.",
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
