import React, { useEffect } from "react";
import { Issue, useLogsStore } from "@/store/IssuesStore";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  Divider,
  Chip,
} from "@mui/material";
import AssigneeChip from "../assigneeChip";
import StatusChip from "../statusChip";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "@/utils";

interface WorkTableProps {
  onEdit?: (Issue: Issue) => void;
}

export const IssueTable: React.FC<WorkTableProps> = () => {
  const { issues, fetchIssues } = useLogsStore();
  const { t } = useTranslation();

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const sortedIssues = [...issues].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "divider",
          width: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={120} align="center">
                {t("updated_at")}
              </TableCell>
              <TableCell width={250} sx={{ textAlign: "center" }}>
                {t("machine")}
              </TableCell>
              <TableCell align="center">{t("detail")}</TableCell>
              <TableCell align="center" sx={{ width: 200 }}>
                {t("assignee")}
              </TableCell>
              <TableCell align="center" sx={{ width: 140 }}>
                {t("status")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedIssues.map((Issue) => (
              <TableRow key={Issue.issue_id}>
                <TableCell>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    textAlign={"center"}
                  >
                    {formatTimestamp(Issue.updated_at)}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body1" color="textPrimary">
                    {Issue.machine_part.name || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    #{Issue.machine_id || "N/A"}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {Issue.machine_part.address || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={
                      <Typography variant="body1">
                        {t("issue_detail")}
                      </Typography>
                    }
                  />
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      maxWidth: "400px",
                      mt: 1,
                    }}
                  >
                    {Issue.issue_detail || "-"}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Chip
                    label={
                      <Typography variant="body1">{t("fix_detail")}</Typography>
                    }
                  />
                  <Typography
                    sx={{
                      whiteSpace: "pre-wrap",
                      wordWrap: "break-word",
                      maxWidth: "400px",
                      mt: 1,
                    }}
                    variant="body2"
                    color="textSecondary"
                  >
                    {Issue.tech_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <AssigneeChip
                    issueId={Issue.issue_id}
                    technicianId={Issue.technician_id}
                  />
                </TableCell>

                <TableCell>
                  <StatusChip
                    issueId={Issue.issue_id}
                    status={Issue.status}
                    techDetail={Issue.tech_detail || ""}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
