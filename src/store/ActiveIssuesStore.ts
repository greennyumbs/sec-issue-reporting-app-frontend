import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue } from "./IssuesStore";

export type TechDetailProps = {
  issueId: number;
  status: string;
  techDetail: string;
};

interface ActiveLogsStoreProps {
  activeIssues: Issue[];
  fetchActiveIssues: () => void;
  addIssue: (body: any) => void;
  addTechDetail: (body: any) => void;
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
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
    addTechDetail: async (body) => {
      try {
        const res = await axios.patch(`${url}/technician`, body);
        console.log(res.data);
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useActiveIssuesStore };
