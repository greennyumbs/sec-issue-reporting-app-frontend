import React, { useState } from "react";
import { MenuItem, Chip, Menu, Box, Avatar, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTechniciansStore } from "@/store/TechniciansStore";
import { useTranslation } from "react-i18next";

interface AssigneeChipProps {
  issueId: number;
  technicianId: number;
  clickable?: boolean;
}

export const AssigneeChip: React.FC<AssigneeChipProps> = ({
  issueId,
  technicianId,
  clickable = false,
}) => {
  const { fetchActiveIssues } = useActiveIssuesStore();
  const { technicians, assignTechnician } = useTechniciansStore();
  const technicianName =
    technicians.find((technician) => technician.technician_id === technicianId)
      ?.tech_name || "";
  const { t } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAssigneeChange = async (e: React.MouseEvent<HTMLElement>) => {
    const newTechnicianId = (e.target as HTMLElement).getAttribute("value");
    const body = {
      issueId: issueId,
      technicianId: Number(newTechnicianId),
    };
    await assignTechnician(body);
    await fetchActiveIssues();
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
        avatar={
          <Avatar sx={{ backgroundColor: "blue" }}>
            <Typography sx={{ color: "white", fontSize: "0.75rem" }}>
              {technicianName.charAt(0) || "X"}
            </Typography>
          </Avatar>
        }
        label={
          <span>
            {technicianName.length > 0 ? technicianName : t("unassigned")}
            {clickable &&
              (anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />)}
          </span>
        }
        onClick={handleClick}
        variant="filled"
        clickable={clickable}
        className="w-[140px]"
      />
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {technicians.map((technician) => (
          <MenuItem
            key={technician.technician_id}
            value={technician.technician_id}
            onClick={(e) => handleAssigneeChange(e)}
          >
            {technician.tech_name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AssigneeChip;
