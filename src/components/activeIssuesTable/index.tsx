import React, { useEffect } from "react";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTranslation } from "react-i18next";
import { CustomTable } from "../customTable";

export const ActiveIssuesTable: React.FC = () => {
  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();

  useEffect(() => {
    fetchActiveIssues();
  }, [activeIssues.length, activeIssues]);

  return <CustomTable data={activeIssues} statusClickable assigneeClickable />;
};
