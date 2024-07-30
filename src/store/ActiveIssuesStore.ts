import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue } from "./IssuesStore";

export type TechDetailProps = {
  issueId: number;
  techDetail: string;
};

interface ActiveLogsStoreProps {
  activeIssues: Issue[];
  fetchActiveIssues: () => void;
  addIssue: (body: Issue) => void;
  addTechDetail: (body: TechDetailProps) => void;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useActiveIssuesStore = create<ActiveLogsStoreProps>()(
  devtools((set) => ({
    activeIssues: [],
    fetchActiveIssues: async () => {
      try {
        const res = await axios.get(`${url}/active-issues`);
        set({ activeIssues: res.data });
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
    addIssue: async (body) => {
      try {
        const res = await axios.post(`${url}/employee`, body);
        console.log("Add New Issue: ", res.data);
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
    addTechDetail: async (body: TechDetailProps) => {
      try {
        console.log(`Sending patch request with body: ${JSON.stringify(body)}`);
        const res = await axios.patch(`${url}/technician`, body);
        console.log(`Patch request successful: ${JSON.stringify(res.data)}`);
      } catch (e: any) {
        console.error(
          `Patch request failed: ${JSON.stringify(e?.response?.data)}`
        );
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useActiveIssuesStore };
