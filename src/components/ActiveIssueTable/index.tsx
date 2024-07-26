import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useActiveLogsStore } from "@/store/ActiveIssuesStore";
import { Issue } from "@/store/IssuesStore";

interface WorkTableProps {
  onEdit?: (issue: Issue) => void;
  onConfirmDelete?: (issue: Issue) => void;
}

export const ActiveIssueTable: React.FC<WorkTableProps> = ({
  onEdit,
  onConfirmDelete,
}) => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const { activeIssues, fetchActiveIssues } = useActiveLogsStore();

  useEffect(() => {
    if (activeIssues.length === 0) fetchActiveIssues();
  }, [activeIssues.length, fetchActiveIssues]);

  return (
    <Box className="overflow-scroll max-w-full mb-[15px]">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[150px]">Machine</TableCell>
              <TableCell className="w-[300px]">Issue Details</TableCell>
              <TableCell className="w-[300px]">Fix Details</TableCell>
              <TableCell>Assignee</TableCell>
              <TableCell className="w-[150px] text-center">Status</TableCell>
              <TableCell className="w-[120px]">Updated At</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {activeIssues.map((Issue) => (
              <TableRow key={Issue.issue_id}>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {Issue.machine_part.name || "N/A"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    #{Issue.machine_id || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.issue_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.tech_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.technician_id || "Unassigned"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={Issue.status}
                    color={
                      Issue.status === "PENDING"
                        ? "warning"
                        : Issue.status === "IN PROGRESS"
                        ? "primary"
                        : Issue.status === "COMPLETED"
                        ? "success"
                        : Issue.status === "CANCELED"
                        ? "error"
                        : "default"
                    }
                    variant="outlined"
                    className="w-[120px]"
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {formatTimestamp(Issue.updated_at)}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  {onEdit && (
                    <Button
                      onClick={() => onEdit(Issue)}
                      color="primary"
                      size="small"
                      className="mr-2"
                    >
                      Edit
                    </Button>
                  )}
                  {onConfirmDelete && (
                    <Button
                      onClick={() => onConfirmDelete(Issue)}
                      color="secondary"
                      size="small"
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
