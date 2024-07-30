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
  clickable?: boolean;
}

export const FixDetailBox: React.FC<FixDetailBoxProps> = ({
  issueId,
  techDetail,
  clickable = false,
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
      console.log("done");
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
      <Box sx={clickable ? styles.fixDetailBox : styles.fixDetailBoxHistory}>
        {!clickable && (
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              maxWidth: "218px",
            }}
            variant="body2"
            color="textSecondary"
          >
            {techDetail || "-"}
          </Typography>
        )}
        {clickable && (
          // <Button
          //   onClick={(e) => handleEditClick(e)}
          //   variant="contained"
          //   sx={{ borderRadius: "100%" }}
          // >
          //   {t("add_fix_detail")}
          // </Button>
          <Chip
            label={t("add_fix_detail")}
            onClick={(e) => handleEditClick(e)}
            variant="filled"
            color="primary"
            className="w-[140px]"
          />
        )}
      </Box>
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
          <Box display="flex" flexDirection="column" width="300px">
            <TextField
              value={newTechDetail}
              onChange={(e) => setNewTechDetail(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              fullWidth
            />
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button onClick={handleSaveClick}>{t("save")}</Button>
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
