import { Issue } from "@/store/IssuesStore";
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
import axios from "axios";

interface Machine {
  id: string;
  name: string;
}

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

  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const { addIssue } = useActiveIssuesStore();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchMachines = async () => {
      try {
        const response = await axios.get("http://localhost/machine");
        console.log(response.data.data); // Debug: log response data
        setMachines(response.data.data);
      } catch (error) {
        toast.error(`Error fetching machines: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchMachines();
  }, []);

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

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedMachine = machines.find((machine) => machine.id === e.target.value);
    setIssue((prevIssue) => ({
      ...prevIssue,
      machine_id: selectedMachine ? selectedMachine.id : "",
      machine_part: {
        ...prevIssue.machine_part,
        name: selectedMachine ? selectedMachine.name : "",
      },
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
      <DialogTitle>{t("add_new_item")}</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box component="form" noValidate autoComplete="off">
            <FormControl fullWidth margin="normal">
              <InputLabel>{t("Machine Name")}</InputLabel>
              <Select
                value={issue.machine_id}
                onChange={handleSelectChange}
                fullWidth
                label={t("Machine Name")}
              >
                {machines.map((machine) => (
                  <MenuItem key={machine.id} value={machine.id}>
                    {machine.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
        )}
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