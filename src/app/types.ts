export interface WorkItem {
  id: number; // Unique identifier for the work item
  machineId: string; // ID of the machine involved
  machineName: string; // Name of the machine
  createdBy: {
    name: string; // Name of the person who created the item (employee or technician)
    position: "Employee" | "Technician"; // Position of the creator
  };
  issueDetailDescription: string; // Description of the issue/enhancement
  fixDetailDescription?: string; // Description of the fix (optional)
  assignee?: {
    name: string; // Name of the assigned technician (optional)
    id: number; // ID of the assigned technician
  };
  status: "PENDING" | "IN PROGRESS" | "COMPLETED" | "CANCELED"; // Status of the work item
  createdTimestamp: string; // Timestamp of creation (ISO 8601 format is recommended)
  completedTimestamp?: string; // Timestamp of completion (optional)
}
