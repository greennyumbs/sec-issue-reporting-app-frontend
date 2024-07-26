import React, { useEffect } from "react";
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
  Select,
  MenuItem,
} from "@mui/material";
import {
  TechDetailProps,
  useActiveIssuesStore,
} from "@/store/ActiveIssuesStore";
import { useTranslation } from "react-i18next";

export const ActiveIssuesTable: React.FC = () => {
  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchActiveIssues();
  }, [activeIssues.length, activeIssues]);

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
                  <StatusDropdown
                    issueId={Issue.issue_id}
                    status={Issue.status}
                    techDetail={Issue.tech_detail || ""}
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
