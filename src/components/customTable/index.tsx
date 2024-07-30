import React, { useState } from "react";
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
  Button,
  TextField,
  Popover,
} from "@mui/material";
import { t } from "i18next";
import StatusChip from "../statusChip";
import { Issue } from "@/store/IssuesStore";
import AssigneeChip from "../assigneeChip";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore"; // Import the store

interface CustomTableProps {
  data: Issue[];
  statusClickable?: boolean;
  assigneeClickable?: boolean;
}

export const CustomTable: React.FC<CustomTableProps> = ({
  data,
  statusClickable = false,
  assigneeClickable = false,
}) => {
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [fixDetails, setFixDetails] = useState<{ [key: number]: string }>({});
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const { addTechDetail, fetchActiveIssues } = useActiveIssuesStore(); // Get the store methods

  const formatTimestamp = (timestamp: string | undefined) => {
    return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
  };

  const handleEditClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number,
    detail: string
  ) => {
    setEditIndex(index);
    setFixDetails((prev) => ({ ...prev, [index]: detail }));
    setAnchorEl(event.currentTarget);
  };

  const handleSaveClick = async () => {
    if (editIndex !== null) {
      const techDetail = fixDetails[editIndex];
      const issueId = data[editIndex].issue_id;

      try {
        // Send update request
        await addTechDetail({ issueId, techDetail });

        // Optimistically update the local state
        setFixDetails((prev) => ({ ...prev, [editIndex]: techDetail }));

        // Fetch the latest data
        fetchActiveIssues();
      } catch (error) {
        console.error("Failed to save tech detail:", error);
        // Optionally revert optimistic update here if necessary
      }

      setEditIndex(null);
      setAnchorEl(null);
    }
  };

  const handleInputChange = (index: number, value: string) => {
    setFixDetails((prev) => ({ ...prev, [index]: value }));
  };

  const handleClose = () => {
    setEditIndex(null);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box className="overflow-scroll max-w-full pb-[15px]">
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          border: "1px solid",
          borderColor: "divider",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="w-[150px]">{t("machine")}</TableCell>
              <TableCell className="min-w-[300px]">
                {t("issue_detail")}
              </TableCell>
              <TableCell className="min-w-[300px]">{t("fix_detail")}</TableCell>
              <TableCell className="w-[150px]">{t("assignee")}</TableCell>
              <TableCell className="w-[150px]">{t("status")}</TableCell>
              <TableCell className="w-[120px]">{t("updated_at")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((issue, index) => (
              <TableRow key={issue.issue_id}>
                <TableCell>
                  <Typography variant="body2" color="textPrimary">
                    {issue.machine_part.name || "N/A"}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    #{issue.machine_id || "N/A"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {issue.issue_detail || "-"}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {issue.tech_detail || "-"}
                    <Button
                      aria-describedby={id}
                      onClick={(event) =>
                        handleEditClick(event, index, issue.tech_detail || "")
                      }
                    >
                      {t("edit")}
                    </Button>
                  </Typography>
                </TableCell>
                <TableCell>
                  <AssigneeChip
                    issueId={issue.issue_id}
                    technicianId={issue.technician_id || -1}
                    technicianName={issue.technician?.tech_name || "Not Assigned"}
                    clickable={assigneeClickable}
                  />
                </TableCell>
                <TableCell>
                  <StatusChip
                    issueId={issue.issue_id}
                    status={issue.status}
                    techDetail={issue.tech_detail || ""}
                    clickable={statusClickable}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="textSecondary">
                    {formatTimestamp(issue.updated_at)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          {editIndex !== null && (
            <Box display="flex" flexDirection="column" width="300px">
              <TextField
                value={fixDetails[editIndex] || ""}
                onChange={(e) => handleInputChange(editIndex, e.target.value)}
                variant="outlined"
                size="small"
                multiline
                fullWidth
              />
              <Box mt={2} display="flex" justifyContent="flex-end">
                <Button onClick={handleSaveClick}>{t("save")}</Button>
              </Box>
            </Box>
          )}
        </Box>
      </Popover>
    </Box>
  );
};


// import React, { useState } from "react";
// import {
//   Box,
//   TableContainer,
//   Paper,
//   Table,
//   TableHead,
//   TableRow,
//   TableCell,
//   TableBody,
//   Typography,
//   Button,
//   TextField,
//   Popover,
// } from "@mui/material";
// import { t } from "i18next";
// import StatusChip from "../statusChip";
// import { Issue } from "@/store/IssuesStore";
// import AssigneeChip from "../assigneeChip";
// import { useActiveIssuesStore } from "@/store/ActiveIssuesStore"; // Import the store

// interface CustomTableProps {
//   data: Issue[];
//   statusClickable?: boolean;
//   assigneeClickable?: boolean;
// }

// export const CustomTable: React.FC<CustomTableProps> = ({
//   data,
//   statusClickable = false,
//   assigneeClickable = false,
// }) => {
//   const [editIndex, setEditIndex] = useState<number | null>(null);
//   const [fixDetails, setFixDetails] = useState<{ [key: number]: string }>({});
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const addTechDetail = useActiveIssuesStore((state) => state.addTechDetail); // Get the addTechDetail method from the store

//   const formatTimestamp = (timestamp: string | undefined) => {
//     return timestamp ? new Date(timestamp).toLocaleString() : "N/A";
//   };

//   const handleEditClick = (
//     event: React.MouseEvent<HTMLElement>,
//     index: number,
//     detail: string
//   ) => {
//     setEditIndex(index);
//     setFixDetails((prev) => ({ ...prev, [index]: detail }));
//     setAnchorEl(event.currentTarget);
//   };

//   const handleSaveClick = async () => {
//     if (editIndex !== null) {
//       const techDetail = fixDetails[editIndex];
//       const issueId = data[editIndex]?.issue_id;

//       console.log("Saving tech detail for issue:", { issueId, techDetail });

//       if (issueId !== undefined) {
//         try {
//           await addTechDetail({ issueId, techDetail });
//           // Optionally refresh data or show success message
//           console.log("Tech detail saved successfully");
//         } catch (error) {
//           console.error("Failed to save tech detail:", error);
//         }
//       } else {
//         console.error("Issue ID is undefined");
//       }

//       setEditIndex(null);
//       setAnchorEl(null);
//     }
//   };

//   const handleInputChange = (index: number, value: string) => {
//     setFixDetails((prev) => ({ ...prev, [index]: value }));
//   };

//   const handleClose = () => {
//     setEditIndex(null);
//     setAnchorEl(null);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? "simple-popover" : undefined;

//   return (
//     <Box className="overflow-scroll max-w-full pb-[15px]">
//       <TableContainer
//         component={Paper}
//         elevation={0}
//         sx={{
//           borderRadius: 2,
//           overflow: "hidden",
//           border: "1px solid",
//           borderColor: "divider",
//         }}
//       >
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell className="w-[150px]">{t("machine")}</TableCell>
//               <TableCell className="min-w-[300px]">
//                 {t("issue_detail")}
//               </TableCell>
//               <TableCell className="min-w-[300px]">{t("fix_detail")}</TableCell>
//               <TableCell className="w-[150px]">{t("assignee")}</TableCell>
//               <TableCell className="w-[150px]">{t("status")}</TableCell>
//               <TableCell className="w-[120px]">{t("updated_at")}</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {data?.map((Issue, index) => (
//               <TableRow key={Issue.issue_id}>
//                 <TableCell>
//                   <Typography variant="body2" color="textPrimary">
//                     {Issue.machine_part.name || "N/A"}
//                   </Typography>
//                   <Typography variant="caption" color="textSecondary">
//                     #{Issue.machine_id || "N/A"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" color="textSecondary">
//                     {Issue.issue_detail || "-"}
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" color="textSecondary">
//                     {Issue.tech_detail || "-"}
//                     <Button
//                       aria-describedby={id}
//                       onClick={(event) =>
//                         handleEditClick(event, index, Issue.tech_detail || "")
//                       }
//                     >
//                       {t("edit")}
//                     </Button>
//                   </Typography>
//                 </TableCell>
//                 <TableCell>
//                   <AssigneeChip
//                     issueId={Issue.issue_id}
//                     technicianId={Issue.technician_id || -1}
//                     technicianName={Issue.technician?.tech_name || "Not Assigned"}
//                     clickable={assigneeClickable}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <StatusChip
//                     issueId={Issue.issue_id}
//                     status={Issue.status}
//                     techDetail={Issue.tech_detail || ""}
//                     clickable={statusClickable}
//                   />
//                 </TableCell>
//                 <TableCell>
//                   <Typography variant="body2" color="textSecondary">
//                     {formatTimestamp(Issue.updated_at)}
//                   </Typography>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Popover
//         id={id}
//         open={open}
//         anchorEl={anchorEl}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//       >
//         <Box p={2}>
//           {editIndex !== null && (
//             <Box display="flex" flexDirection="column" width="300px">
//               <TextField
//                 value={fixDetails[editIndex] || ""}
//                 onChange={(e) => handleInputChange(editIndex, e.target.value)}
//                 variant="outlined"
//                 size="small"
//                 multiline
//                 fullWidth
//               />
//               <Box mt={2} display="flex" justifyContent="flex-end">
//                 <Button onClick={handleSaveClick}>{t("save")}</Button>
//               </Box>
//             </Box>
//           )}
//         </Box>
//       </Popover>
//     </Box>
//   );
// };

