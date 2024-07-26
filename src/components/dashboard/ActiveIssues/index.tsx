import { ActiveIssuesTable } from "@/components/ActiveIssuesTable";
import { Navbar } from "@/components/navbar";
import { NewIssueModal } from "@/components/NewIssueModal";
import { Container, Box, Typography, Button } from "@mui/material";
import { useState } from "react";

export const ActiveIssuesDashboard: React.FC = () => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);

  return (
    <>
      <Navbar />
      <Container className="pt-[64px]">
        <Box className="flex justify-between items-center py-[15px]">
          <Typography variant="h4" component="h1">
            Active Issues
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsNewIssueModalOpen(true)}
          >
            Add New Work Item
          </Button>
        </Box>
        <ActiveIssuesTable />
        {isNewIssueModalOpen && (
          <NewIssueModal onClose={() => setIsNewIssueModalOpen(false)} />
        )}
      </Container>
    </>
  );
};
