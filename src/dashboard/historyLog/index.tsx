import { Navbar } from "@/components/navbar";
import { IssueTable } from "@/components/issueTable";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const HistoryLogDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <Container className="pt-[64px]">
        <Box className="flex justify-between items-center py-[15px]">
          <Typography variant="h4" component="h1">
            {t("history_logs")}
          </Typography>
        </Box>
        <IssueTable />
      </Container>
    </>
  );
};
