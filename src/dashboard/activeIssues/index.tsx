import { ActiveIssuesTable } from "@/components/activeIssuesTable";
import { Navbar } from "@/components/navbar";
import { NewIssueModal } from "@/components/newIssueModal";
import { Container, Box, Typography, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const ActiveIssuesDashboard: React.FC = () => {
  const [isNewIssueModalOpen, setIsNewIssueModalOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Navbar />
      <Container sx={{ pt: "64px" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            py: "15px",
          }}
        >
          <Typography variant="h4" component="h1">
            {t("active_issues")}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsNewIssueModalOpen(true)}
          >
            {t("add_new_issue")}
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
