export interface WorkItem {
  id: string;
  machineId: string;
  machineName: string;
  creatorName: string;
  creatorPosition: "Employee" | "Technician" | "";
  issueDetailDescription: string;
  fixDetailDescription: string;
  assigneeName: string;
  assigneeId: string;
  status: "PENDING" | "IN PROGRESS" | "COMPLETED" | "CANCELED" | "NONE";
  createdTimestamp: string;
  completedTimestamp: string;
}
