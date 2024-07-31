import React, { useEffect } from "react";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTechniciansStore } from "@/store/TechniciansStore";
import { useUserStore } from "@/store/UserStore";
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
} from "@mui/material";
import AssigneeChip from "../assigneeChip";
import { AddFixDetailButton } from "../addFixDetailButton";
import StatusChip from "../statusChip";
import { useTranslation } from "react-i18next";
import { formatTimestamp } from "@/utils";

export const ActiveIssuesTable: React.FC = () => {
  const { activeIssues, fetchActiveIssues } = useActiveIssuesStore();
  const { fetchTechnicians } = useTechniciansStore();
  const { user } = useUserStore();
  const { t } = useTranslation();
  const isTechinician = user.role === "TECHNICIAN";

  useEffect(() => {
    fetchActiveIssues();
    fetchTechnicians();
  }, []);

  const sortedActiveIssues = [...activeIssues].sort(
    (a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
  );

  return (
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
            <TableCell width={200} align="center">
              {t("assignee")}
            </TableCell>
            <TableCell width={140} align="center">
              {t("status")}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedActiveIssues.map((Issue) => (
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
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    whiteSpace: "pre-wrap",
                    wordWrap: "break-word",
                    maxWidth: "400px",
                  }}
                >
                  {Issue.issue_detail || "-"}
                </Typography>
              </TableCell>
              <TableCell>
                <AssigneeChip
                  issueId={Issue.issue_id}
                  technicianId={Issue.technician_id}
                  clickable={isTechinician}
                />
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  {isTechinician && (
                    <AddFixDetailButton
                      issueId={Issue.issue_id}
                      techDetail={Issue.tech_detail || ""}
                    />
                  )}
                  <StatusChip
                    issueId={Issue.issue_id}
                    status={Issue.status}
                    techDetail={Issue.tech_detail || ""}
                    clickable
                  />
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
