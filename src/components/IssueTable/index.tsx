import React, { useEffect } from "react";
import { Issue, useLogsStore } from "@/store/IssuesStore";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
  Box,
} from "@mui/material";
import { useTranslation } from "react-i18next";

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

  console.log(issues);

  return (
    <Box className="overflow-scroll max-w-full mb-[15px]">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[150px]">{t("machine")}</TableCell>
              <TableCell className="w-[300px]">{t("issue_detail")}</TableCell>
              <TableCell className="w-[300px]">{t("fix_detail")}</TableCell>
              <TableCell>{t("assignee")}</TableCell>
              <TableCell className="w-[150px] text-center">
                {t("status")}
              </TableCell>
              <TableCell className="w-[120px]">{t("updated_at")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {issues.map((Issue) => (
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
                    {Issue.technician_id || t("unassigned")}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
