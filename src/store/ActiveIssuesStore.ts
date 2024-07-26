import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";
import { Issue } from "./IssuesStore";

interface ActiveLogsStoreProps {
  activeIssues: Issue[];
  fetchActiveIssues: () => void;
  addIssue: (issue: Issue) => void;
  addTechDetail: (issue: Issue) => void;
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
    addTechDetail: async (body) => {
      try {
        const res = await axios.get(`${url}/activ-issues`);
        console.log("Add Technician's Changes: ", res.data);
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useActiveIssuesStore as useActiveLogsStore };
