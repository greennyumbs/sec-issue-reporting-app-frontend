import React, { useEffect } from "react";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { CustomTable } from "../customTable";
import { useTechniciansStore } from "@/store/TechniciansStore";
import { useUserStore } from "@/store/UserStore";

export const ActiveIssuesTable: React.FC = () => {
  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();
  const { fetchTechnicians } = useTechniciansStore();
  const { user } = useUserStore();
  const permission = user.role === "TECHNICIAN";

  useEffect(() => {
    fetchActiveIssues();
    fetchTechnicians();
  }, []);

  console.log(user.role);

  return (
    <CustomTable
      data={activeIssues}
      statusClickable
      assigneeClickable={permission}
    />
  );
};
