import React, { useEffect } from "react";
import { Issue, useLogsStore } from "@/store/IssuesStore";
import { useTranslation } from "react-i18next";
import { CustomTable } from "../customTable";

interface WorkTableProps {
  onEdit?: (Issue: Issue) => void;
}

export const IssueTable: React.FC<WorkTableProps> = () => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const { t } = useTranslation();
  const { issues, fetchIssues } = useLogsStore();

  useEffect(() => {
    if (issues.length === 0) fetchIssues();
  }, [issues.length, fetchIssues]);

  return <CustomTable data={issues} />;
};
