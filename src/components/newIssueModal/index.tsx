import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import { useActiveIssuesStore } from "@/store/ActiveIssuesStore";
import { useTranslation } from "react-i18next";
import { Machine, useMachineStore } from "@/store/MachineStore";

interface NewIssueModalProps {
  onClose: () => void;
}

export const NewIssueModal: React.FC<NewIssueModalProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [machineId, setMachineId] = useState<string>();
  const [issueDetail, setIssueDetail] = useState<string>();
  const { machines, fetchMachines } = useMachineStore();
  const { addIssue } = useActiveIssuesStore();
  const { fetchActiveIssues } = useActiveIssuesStore();

  useEffect(() => {
    fetchMachines();
  }, []);

  const handleSave = async () => {
    try {
      const newIssue = {
        machine_id: machineId,
        issue_detail: issueDetail,
        status: "PENDING",
      };
      await addIssue(newIssue);
      await fetchActiveIssues();
      onClose();
    } catch (e: any) {
      toast.error(`Cannot Save: ${e.message}`);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{t("add_new_issue")}</DialogTitle>
      <DialogContent datatest-id="DialogContent">
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth margin="normal">
            <InputLabel>{t("Machine Name")}</InputLabel>
            <Select
              value={machineId}
              onChange={(e) => setMachineId(e.target.value as string)}
              fullWidth
              label={t("Machine Name")}
            >
              {(machines || []).map((machine) => (
                <MenuItem key={machine.id} value={machine.id}>
                  {machine.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            name="issue_detail"
            label="Issue Detail"
            value={issueDetail}
            onChange={(e) => setIssueDetail(e.target.value)}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          {t("cancel")}
        </Button>
        <Button onClick={handleSave} color="primary">
          {t("save")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
