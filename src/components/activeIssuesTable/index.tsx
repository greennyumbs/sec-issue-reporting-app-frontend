import React, { useEffect } from "react";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTranslation } from "react-i18next";
import { CustomTable } from "../customTable";
import { useTechniciansStore } from "@/store/TechniciansStore";

export const ActiveIssuesTable: React.FC = () => {
  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();
  const { fetchTechnicians } = useTechniciansStore();

  useEffect(() => {
    fetchActiveIssues();
    fetchTechnicians();
  }, [activeIssues.length, activeIssues]);

  return <CustomTable data={activeIssues} statusClickable assigneeClickable />;
};
