import { Navbar } from "@/components/navbar";
import { IssueTable } from "@/components/IssueTable";
import { Container } from "@mui/material";

export const HistoryLogDashboard: React.FC = () => {
  return (
    <>
      <Navbar />
      <Container className="mt-[64px]">
        <h1 className="text-2xl font-bold py-[15px]">History Log</h1>
        <IssueTable />
      </Container>
    </>
  );
};
