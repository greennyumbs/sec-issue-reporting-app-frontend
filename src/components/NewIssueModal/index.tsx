import { Issue, useLogsStore } from "@/store/logsStore";
import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";

interface IssueFormProps {
  onClose: () => void;
}

export const NewIssueModal: React.FC<IssueFormProps> = ({ onClose }) => {
  const [issue, setIssue] = useState<Issue>({
    issue_id: 0,
    machine_id: "",
    issue_detail: "",
    tech_detail: null,
    technician_id: null,
    status: "PENDING",
    updated_at: "",
    machine_part: {
      name: "",
      address: "",
    },
  });
  const { addIssue } = useLogsStore();

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = e.target;

    setIssue((prevIssue) => ({
      ...prevIssue,
      [name as string]: value,
    }));
  };

  const handleSave = () => {
    try {
      addIssue(issue);
      onClose();
    } catch (e: any) {
      toast.error(`Cannot Save: ${e.message}`);
    }
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Add New Work Item</DialogTitle>
      <DialogContent>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            type="text"
            name="machine_id"
            label="Machine ID"
            value={issue.machine_id}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            type="text"
            name="machine_part.name"
            label="Machine Name"
            value={issue.machine_part.name}
            onChange={(e) =>
              setIssue((prevIssue) => ({
                ...prevIssue,
                machine_part: {
                  ...prevIssue.machine_part,
                  name: e.target.value,
                },
              }))
            }
            fullWidth
            margin="normal"
          />
          <Select
            name="status"
            value={issue.status}
            onChange={
              handleChange as (event: SelectChangeEvent<string>) => void
            }
            fullWidth
          >
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN PROGRESS">In Progress</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
            <MenuItem value="CANCELED">Canceled</MenuItem>
          </Select>
          <TextField
            name="issue_detail"
            label="Issue Detail Description"
            value={issue.issue_detail}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
