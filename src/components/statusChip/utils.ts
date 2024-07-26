const statusColor: Record<
  string,
  "default" | "primary" | "secondary" | "error" | "info" | "success" | "warning"
> = {
  PENDING: "warning",
  IN_PROGRESS: "primary",
  COMPLETED: "success",
  CANCELED: "error",
};

export const getStatusColor = (status: string) => {
  return statusColor[status] || "default";
};
