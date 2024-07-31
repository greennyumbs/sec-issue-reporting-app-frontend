import { Navbar } from "@/components/navbar";
import { IssueTable } from "@/components/issueTable";
import { Box, Container, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

export const HistoryLogDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <Container sx={{ pt: "84px", px: "0px !important" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            py: "15px",
          }}
        >
          <Typography variant="h4" component="h1">
            {t("history_logs")}
          </Typography>
        </Box>
        <IssueTable />
      </Container>
    </>
  );
};
