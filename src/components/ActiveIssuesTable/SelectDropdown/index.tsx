import {
  TechDetailProps,
  useActiveIssuesStore,
} from "@/store/ActiveIssuesStore";
import { MenuItem, Select } from "@mui/material";
import React from "react";

export const StatusDropdown: React.FC<TechDetailProps> = ({
  issueId,
  status,
  techDetail,
}) => {
  const { addTechDetail, fetchActiveIssues } = useActiveIssuesStore();

  const handleStatusChange = (
    issueId: number,
    newStatus: string,
    newTechDetail: string
  ) => {
    const body = {
      id: issueId,
      status: newStatus,
      techDetail: newTechDetail,
    };
    console.log("handleStatusChange", body);
    addTechDetail(body);
    fetchActiveIssues();
  };
  return (
    <Select
      value={status}
      onChange={(e) =>
        handleStatusChange(issueId, e.target.value as string, techDetail)
      }
      displayEmpty
      variant="outlined"
      className="w-full"
    >
      <MenuItem value="PENDING">Pending</MenuItem>
      <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
      <MenuItem value="COMPLETED">Completed</MenuItem>
      <MenuItem value="CANCELED">Canceled</MenuItem>
    </Select>
  );
};
