import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import toast from "react-hot-toast";
import { Machine } from "./MachineStore";
import { Technician } from "./TechniciansStore";

export type Issue = {
  issue_id: number;
  machine_id: string;
  issue_detail: string | null;
  tech_detail: string;
  technician_id: number;
  status: string;
  updated_at: string;
  machine_part: {
    name: string;
    address: string;
  };
};

interface IssuesStoreProps {
  issues: Issue[];
  fetchIssues: () => void;
}

const url = process.env.NEXT_PUBLIC_BACKEND_URL;

const useIssuesStore = create<IssuesStoreProps>()(
  devtools((set) => ({
    issues: [],
    fetchIssues: async () => {
      try {
        const res = await axios.get(`${url}/logs`);
        set({ issues: res.data });
      } catch (e: any) {
        toast.error(e?.response?.data?.message);
      }
    },
  }))
);

export { useIssuesStore as useLogsStore };
