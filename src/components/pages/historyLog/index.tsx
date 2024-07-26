import { Navbar } from "@/components/navbar";
import { IssueTable } from "@/components/issueTable";
import { Container } from "@mui/material";
import { useTranslation } from "react-i18next";

export const HistoryLogDashboard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <Navbar />
      <Container className="pt-[64px]">
        <h1 className="text-2xl font-bold py-[15px]">{t("history_logs")}</h1>
        <IssueTable />
      </Container>
    </>
  );
};
