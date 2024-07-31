import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import {
  Typography,
  Button,
  Box,
  Popover,
  TextField,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { getThemedStyles } from "./styles";

interface FixDetailBoxProps {
  issueId: number;
  techDetail: string;
}

export const AddFixDetailButton: React.FC<FixDetailBoxProps> = ({
  issueId,
  techDetail,
}) => {
  const [newTechDetail, setNewTechDetail] = useState<string>(techDetail);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { addTechDetail, fetchActiveIssues } = useActiveIssuesStore();

  const handleSaveClick = async () => {
    try {
      const newTechDetailBody = {
        id: issueId,
        status: "COMPLETED",
        techDetail: newTechDetail,
      };
      await addTechDetail(newTechDetailBody);
      await fetchActiveIssues();
    } catch (error) {
      console.error("Failed to save tech detail:", error);
    }

    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleEditClick = (event: React.MouseEvent<HTMLElement>) => {
    setNewTechDetail(techDetail);
    setAnchorEl(event.currentTarget);
  };
  const styles = getThemedStyles();

  const { t } = useTranslation();
  return (
    <>
      <Box>
        <Chip
          label={
            <Typography
              variant="body2"
              sx={{
                whiteSpace: "pre-wrap",
                wordWrap: "break-word",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >
              {t("add_fix_detail")}
            </Typography>
          }
          sx={{
            py: 1,
            height: "auto",
            "& .MuiChip-label": {
              display: "block",
              whiteSpace: "normal",
            },
          }}
          onClick={(e) => handleEditClick(e)}
          variant="outlined"
          color="primary"
          className="w-[140px]"
        />
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box p={2}>
          <Box display="flex" flexDirection="column" width="500px">
            <TextField
              value={newTechDetail}
              onChange={(e) => setNewTechDetail(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              fullWidth
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Typography
                textAlign={"right"}
                mr={1}
                fontSize={14}
                color={"gray"}
              >
                {t("save_fix_detail_warning")}
              </Typography>
              <Button onClick={handleSaveClick}>{t("save")}</Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
