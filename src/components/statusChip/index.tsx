import React, { useState } from "react";
import { MenuItem, Chip, Menu, Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  TechDetailProps,
  useActiveIssuesStore,
} from "@/store/ActiveIssuesStore";
import { getStatusColor } from "./utils";

interface StatusChipProps extends TechDetailProps {
  clickable?: boolean;
}

export const StatusChip: React.FC<StatusChipProps> = ({
  issueId,
  status,
  techDetail,
  clickable = false,
}) => {
  const { addTechDetail, fetchActiveIssues } = useActiveIssuesStore();
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    addTechDetail(body);
    fetchActiveIssues();
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (clickable) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
      <Chip
        label={
          <span>
            {t(`${status.toLowerCase()}`)}{" "}
            {clickable &&
              (anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
          </span>
        }
        onClick={handleClick}
        variant="filled"
        color={getStatusColor(status)}
        clickable={clickable}
        className="w-[140px]"
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => handleStatusChange(issueId, "PENDING", techDetail)}
        >
          {t("pending")}
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(issueId, "IN_PROGRESS", techDetail)}
        >
          {t("in_progress")}
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(issueId, "COMPLETED", techDetail)}
        >
          {t("completed")}
        </MenuItem>
        <MenuItem
          onClick={() => handleStatusChange(issueId, "CANCELED", techDetail)}
        >
          {t("canceled")}
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StatusChip;
