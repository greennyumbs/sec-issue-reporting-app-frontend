import React, { useState } from "react";
import { MenuItem, Chip, Menu, Box, Avatar, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { getStatusColor } from "./utils";
import { Technician, useTechniciansStore } from "@/store/TechniciansStore";

interface AssigneeChipProps extends Technician {
  issueId: number;
  clickable?: boolean;
}

export const AssigneeChip: React.FC<AssigneeChipProps> = ({
  issueId,
  technicianId,
  technicianName,
  clickable = false,
}) => {
  const { fetchActiveIssues } = useActiveIssuesStore();
  const { technicians, assignTechnician } = useTechniciansStore();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleAssigneeChange = (e: React.MouseEvent<HTMLElement>) => {
    const newTechnicianId = (e.target as HTMLElement).getAttribute("value");
    const body = {
      issueId: issueId,
      technicianId: Number(newTechnicianId),
    };
    assignTechnician(body);
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
        avatar={
          <Avatar sx={{ backgroundColor: "blue" }}>
            <Typography sx={{ color: "white", fontSize: "0.75rem" }}>
              {technicianName.charAt(0) || "A"}
            </Typography>
          </Avatar>
        }
        label={
          <span>
            {technicianId}
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
            key={technician.technicianId}
            value={technician.technicianId}
            onClick={(e) => handleAssigneeChange(e)}
          >
            {technician.technicianName}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

export default AssigneeChip;
