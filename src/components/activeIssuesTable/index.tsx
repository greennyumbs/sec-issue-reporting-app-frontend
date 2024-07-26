import React, { useEffect } from "react";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTranslation } from "react-i18next";
import { CustomTable } from "../customTable";

export const ActiveIssuesTable: React.FC = () => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchActiveIssues();
  }, [activeIssues.length, activeIssues]);

  return <CustomTable data={activeIssues} statusClickable assigneeClickable />;
};
