import { ConfirmationModal } from "@/components/confirmationModal";
import { IssueTable } from "@/components/IssueTable";
import { Navbar } from "@/components/navbar";
import { NewIssueModal } from "@/components/NewIssueModal";
import { Issue, useLogsStore } from "@/store/logsStore";
import { Container, Box, Typography, Button } from "@mui/material";
import { useState } from "react";

export const WorkListDashboard: React.FC = () => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [IssueToDelete, setIssueToDelete] = useState<Issue | null>(null);

  // const handleEditIssue = (updatedItem: Issue) => {
  //   setIssues(
  //     Issues.map((item) => (item.id === updatedItem.id ? updatedItem : item))
  //   );
  // };

  // const handleDeleteIssue = async () => {
  //   if (IssueToDelete) {
  //     setIssues(Issues.filter((item) => item.id !== IssueToDelete.id));
  //     setIsConfirmModalOpen(false);
  //     setIssueToDelete(null);
  //   }
  // };

  const handleEditClick = (Issue: Issue) => {
    setSelectedIssue(Issue);
    setIsEditModalOpen(true);
  };

  const handleConfirmDeleteClick = (Issue: Issue) => {
    setIssueToDelete(Issue);
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      <Navbar />
      <Container className="pt-[64px]">
        <Box className="flex justify-between items-center py-[15px]">
          <Typography variant="h4" component="h1">
            Work List
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsNewIssueModalOpen(true)}
          >
            Add New Work Item
          </Button>
        </Box>
        <IssueTable onConfirmDelete={handleConfirmDeleteClick} />
        {isNewIssueModalOpen && (
          <NewIssueModal onClose={() => setIsNewIssueModalOpen(false)} />
        )}
        {/* TODO: Edit modal
    {isEditModalOpen && selectedIssue && (
      <NewIssueModal
        open={isEditModalOpen}
        item={selectedIssue}
        onSave={editIssue}
        onClose={() => setIsEditModalOpen(false)}
      />
    )} */}
        {/* TODO: Delete Modal
    <ConfirmationModal
      open={isConfirmModalOpen}
      onConfirm={handleDeleteIssue}
      onCancel={() => setIsConfirmModalOpen(false)}
    /> */}
      </Container>
    </>
  );
};
