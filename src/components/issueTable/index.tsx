import React, { useEffect } from "react";
import { Issue, useLogsStore } from "@/store/IssuesStore";
import { CustomTable } from "../customTable";

interface WorkTableProps {
  onEdit?: (Issue: Issue) => void;
}

export const IssueTable: React.FC<WorkTableProps> = () => {
  const { issues, fetchIssues } = useLogsStore();

  useEffect(() => {
    if (issues.length === 0) fetchIssues();
  }, [issues.length, fetchIssues]);

  return <CustomTable data={issues} />;
};
