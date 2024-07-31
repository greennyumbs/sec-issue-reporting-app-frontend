import React, { useState } from "react";
import { MenuItem, Chip, Menu, Box, Avatar, Typography } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTechniciansStore } from "@/store/TechniciansStore";
import { useTranslation } from "react-i18next";
import PersonOffIcon from "@mui/icons-material/PersonOff";

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
  const technician = technicians.find(
    (tech) => tech.technician_id === technicianId
  );
  const technicianName = technician?.tech_name || "";
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

  const splitName = technicianName.split(" ");
  const firstName = splitName[0] || t("unassigned");
  const lastName = splitName[1] || "";

  return (
    <Box>
      <Chip
        avatar={
          firstName !== t("unassigned") ? (
            <Avatar
              sx={{
                backgroundColor: "blue",
                width: "40px !important",
                height: "40px !important",
              }}
            >
              <Typography
                sx={{
                  color: "white",

                  fontSize: "1.2rem",
                }}
              >
                {firstName.charAt(0) || "X"}
              </Typography>
            </Avatar>
          ) : (
            <Avatar
              sx={{
                width: "40px !important",
                height: "40px !important",
              }}
            >
              <PersonOffIcon />
            </Avatar>
          )
        }
        label={
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <Box width={100}>
              <Typography variant="body2" textAlign={"center"}>
                {firstName}
              </Typography>
              <Typography variant="body2" textAlign={"center"}>
                {lastName}
              </Typography>
            </Box>
            {clickable ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </Box>
            ) : (
              <Box width={24} height={24}></Box>
            )}
          </Box>
        }
        onClick={handleClick}
        variant="filled"
        clickable={clickable}
        sx={{
          height: 50,
          width: 200,
          justifyContent: "space-around",
          borderRadius: 100,
        }}
        // Set height to 48px, remove fixed width
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
